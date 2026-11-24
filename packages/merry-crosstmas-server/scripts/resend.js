#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Resend Secret Santa emails from the draw log.
 *
 *   node scripts/resend.js list
 *       Draws still in the log, with who received their email.
 *       Never prints who got whom.
 *   node scripts/resend.js send <drawId> <email> [--to <other address>]
 *       Send that person's email again (optionally to a corrected address).
 *   node scripts/resend.js send-failed <drawId>
 *       Send again every email of the draw that Mailgun did not accept.
 *
 * Uses the same MERRY_CROSSTMAS_* environment variables as the server.
 */
const { createDrawLog } = require('../mail/drawLog');
const { sendDrawMail } = require('../mail/send');

function usage() {
  console.log(`Usage:
  node scripts/resend.js list
  node scripts/resend.js send <drawId> <email> [--to <other address>]
  node scripts/resend.js send-failed <drawId>`);
  process.exit(1);
}

async function resendOne(drawLog, draw, assignment, sentTo) {
  try {
    const messageId = await sendDrawMail({
      locale: draw.locale,
      fromName: assignment.fromName,
      toName: assignment.toName,
      content: draw.content,
      email: sentTo,
    });
    drawLog.logResend({
      drawId: draw.id, fromEmail: assignment.fromEmail, sentTo, status: 'accepted', messageId,
    });
    console.log(`✔ ${assignment.fromEmail} → sent to ${sentTo} (${messageId || 'no id'})`);
    return true;
  } catch (err) {
    drawLog.logResend({
      drawId: draw.id, fromEmail: assignment.fromEmail, sentTo, status: 'failed', error: String(err.message || err),
    });
    console.error(`✘ ${assignment.fromEmail}: ${err.message || err}`);
    return false;
  }
}

async function main(argv) {
  const [command, drawId, email] = argv;
  const drawLog = createDrawLog();
  if (!drawLog.enabled) {
    console.error('Draw log is disabled (MERRY_CROSSTMAS_DRAW_LOG=off).');
    return 1;
  }
  const draws = drawLog.listDraws();

  if (command === 'list') {
    console.log(`Log file: ${drawLog.file}`);
    if (!draws.length) console.log('No draws logged.');
    draws.forEach(d => {
      const failed = d.assignments.filter(a => a.status !== 'accepted');
      console.log(`\n${d.id}  ${d.at}  locale=${d.locale}  ${d.assignments.length} people, ${failed.length} not delivered  (purged after ${d.expiresAt.slice(0, 10)})`);
      d.assignments.forEach(a => {
        const resends = a.resends ? `, resent ×${a.resends}` : '';
        console.log(`  ${a.status === 'accepted' ? '✔' : '✘'} ${a.fromEmail} (${a.status}${resends})`);
      });
    });
    return 0;
  }

  if (command !== 'send' && command !== 'send-failed') usage();
  if (!drawId) usage();
  const draw = draws.find(d => d.id === drawId);
  if (!draw) {
    console.error(`Draw ${drawId} not found. Run "list" to see the logged draws.`);
    return 1;
  }

  if (command === 'send') {
    if (!email) usage();
    const wanted = email.toLowerCase();
    const assignment = draw.assignments.find(a => a.fromEmail.toLowerCase() === wanted);
    if (!assignment) {
      console.error(`${email} is not part of draw ${drawId}.`);
      return 1;
    }
    const toIndex = argv.indexOf('--to');
    const sentTo = toIndex > -1 && argv[toIndex + 1] ? argv[toIndex + 1] : assignment.fromEmail;
    return (await resendOne(drawLog, draw, assignment, sentTo)) ? 0 : 1;
  }

  const pending = draw.assignments.filter(a => a.status !== 'accepted');
  if (!pending.length) {
    console.log('Every email of this draw was already accepted by Mailgun.');
    return 0;
  }
  let ok = true;
  // eslint-disable-next-line no-restricted-syntax
  for (const a of pending) {
    // eslint-disable-next-line no-await-in-loop
    ok = (await resendOne(drawLog, draw, a, a.fromEmail)) && ok;
  }
  return ok ? 0 : 1;
}

if (require.main === module) {
  main(process.argv.slice(2)).then(code => process.exit(code));
}

module.exports = { main };
