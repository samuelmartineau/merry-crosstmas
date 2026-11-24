/**
 * Draw log: one JSON line per draw, so a lost email can be sent again.
 *
 * Line types:
 *  - {type:'draw', id, at, locale, content, expiresAt, assignments:[
 *      {fromName, fromEmail, toName, toEmail, status, messageId?, error?}]}
 *  - {type:'resend', drawId, at, fromEmail, sentTo, status, messageId?, error?}
 *
 * The file holds who-gives-to-whom, so it is created with 0600 permissions and
 * expired draws (and their resend lines) are purged on every write.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// A draw is kept until the 1st of February that follows it, so January
// deliveries can still be recovered. A retention in days overrides that.
function expiryFor(date, retentionDays) {
  if (retentionDays > 0) {
    return new Date(date.getTime() + retentionDays * 24 * 3600 * 1000);
  }
  const year = date.getUTCMonth() === 0 ? date.getUTCFullYear() : date.getUTCFullYear() + 1;
  return new Date(Date.UTC(year, 1, 1));
}

function readLines(file) {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
  return raw
    .split('\n')
    .filter(Boolean)
    .map(line => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null; // skip a torn line rather than losing the whole file
      }
    })
    .filter(Boolean);
}

function keepUnexpired(entries, now) {
  const alive = new Set(
    entries
      .filter(e => e.type === 'draw' && new Date(e.expiresAt) > now)
      .map(e => e.id),
  );
  return entries.filter(e =>
    (e.type === 'draw' ? alive.has(e.id) : alive.has(e.drawId)));
}

function writeAll(file, entries) {
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const tmp = `${file}.${process.pid}.tmp`;
  const body = entries.map(e => `${JSON.stringify(e)}\n`).join('');
  fs.writeFileSync(tmp, body, { mode: 0o600 });
  fs.renameSync(tmp, file);
}

function createDrawLog({
  file = config.drawLog.file,
  retentionDays = config.drawLog.retentionDays,
  now = () => new Date(),
} = {}) {
  const enabled = Boolean(file);

  // Read, drop expired entries, append, rewrite. Writes are synchronous so
  // concurrent requests in this process cannot interleave.
  function append(entry) {
    if (!enabled) return;
    const entries = keepUnexpired(readLines(file), now());
    entries.push(entry);
    writeAll(file, entries);
  }

  function purge() {
    if (!enabled || !fs.existsSync(file)) return 0;
    const entries = readLines(file);
    const kept = keepUnexpired(entries, now());
    if (kept.length !== entries.length) writeAll(file, kept);
    return entries.length - kept.length;
  }

  function logDraw({ locale, content, assignments }) {
    if (!enabled) return undefined;
    const at = now();
    const entry = {
      type: 'draw',
      id: `${at.toISOString().slice(0, 10)}-${crypto.randomBytes(4).toString('hex')}`,
      at: at.toISOString(),
      expiresAt: expiryFor(at, retentionDays).toISOString(),
      locale,
      content,
      assignments,
    };
    append(entry);
    return entry;
  }

  function logResend(resend) {
    append({ type: 'resend', at: now().toISOString(), ...resend });
  }

  // Draws with the latest status of each person (resend lines applied).
  function listDraws() {
    const entries = keepUnexpired(readLines(file), now());
    const draws = new Map();
    entries.forEach(e => {
      if (e.type === 'draw') {
        draws.set(e.id, { ...e, assignments: e.assignments.map(a => ({ ...a })) });
      } else if (e.type === 'resend' && draws.has(e.drawId)) {
        const a = draws.get(e.drawId).assignments.find(x => x.fromEmail === e.fromEmail);
        if (a) {
          a.status = e.status === 'accepted' || a.status !== 'accepted' ? e.status : a.status;
          a.resends = (a.resends || 0) + 1;
        }
      }
    });
    return [...draws.values()];
  }

  return {
    enabled, file, logDraw, logResend, listDraws, purge,
  };
}

module.exports = { createDrawLog, expiryFor };
