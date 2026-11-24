const fs = require('fs');
const os = require('os');
const path = require('path');
const { createDrawLog, expiryFor } = require('./drawLog');

let dir;
let file;
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'drawlog-'));
  file = path.join(dir, 'nested', 'draws.jsonl');
});
afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

const assignments = [
  {
    fromName: 'Sam', fromEmail: 'sam@x.com', toName: 'Aline', toEmail: 'aline@x.com', status: 'accepted', messageId: '<1>',
  },
  {
    fromName: 'Aline', fromEmail: 'aline@x.com', toName: 'Sam', toEmail: 'sam@x.com', status: 'failed', error: 'boom',
  },
];

describe('expiryFor', () => {
  it('keeps a December draw until next February 1st', () => {
    expect(expiryFor(new Date('2026-12-01T10:00:00Z')).toISOString()).toBe('2027-02-01T00:00:00.000Z');
  });
  it('keeps a January draw until February 1st of the same year', () => {
    expect(expiryFor(new Date('2027-01-10T10:00:00Z')).toISOString()).toBe('2027-02-01T00:00:00.000Z');
  });
  it('uses a retention in days when given', () => {
    expect(expiryFor(new Date('2026-12-01T00:00:00Z'), 10).toISOString()).toBe('2026-12-11T00:00:00.000Z');
  });
});

describe('drawLog', () => {
  it('writes one private JSON line per draw', () => {
    const log = createDrawLog({ file, now: () => new Date('2026-12-01T10:00:00Z') });
    const entry = log.logDraw({ locale: 'fr', content: '<p>hi</p>', assignments });
    const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0])).toEqual(entry);
    expect(entry.id).toMatch(/^2026-12-01-[0-9a-f]{8}$/);
    expect(entry.locale).toBe('fr');
    expect((fs.statSync(file).mode % 0o1000).toString(8)).toBe('600');
  });

  it('applies resends to the listed status', () => {
    const log = createDrawLog({ file, now: () => new Date('2026-12-01T10:00:00Z') });
    const { id } = log.logDraw({ locale: 'en', content: 'c', assignments });
    log.logResend({
      drawId: id, fromEmail: 'aline@x.com', sentTo: 'aline@x.com', status: 'accepted',
    });
    const [draw] = log.listDraws();
    expect(draw.assignments.map(a => a.status)).toEqual(['accepted', 'accepted']);
    expect(draw.assignments[1].resends).toBe(1);
  });

  it('does not downgrade a delivered email after a failed resend', () => {
    const log = createDrawLog({ file, now: () => new Date('2026-12-01T10:00:00Z') });
    const { id } = log.logDraw({ locale: 'en', content: 'c', assignments });
    log.logResend({
      drawId: id, fromEmail: 'sam@x.com', sentTo: 'sam@x.com', status: 'failed',
    });
    expect(log.listDraws()[0].assignments[0].status).toBe('accepted');
  });

  it('purges expired draws and their resends', () => {
    let now = new Date('2026-12-01T10:00:00Z');
    const log = createDrawLog({ file, now: () => now });
    const old = log.logDraw({ locale: 'en', content: 'c', assignments });
    log.logResend({ drawId: old.id, fromEmail: 'aline@x.com', status: 'accepted' });
    now = new Date('2027-02-02T00:00:00Z');
    const recent = log.logDraw({ locale: 'en', content: 'c', assignments });
    const ids = fs.readFileSync(file, 'utf8').trim().split('\n').map(l => JSON.parse(l));
    expect(ids).toHaveLength(1);
    expect(ids[0].id).toBe(recent.id);
    now = new Date('2028-03-01T00:00:00Z');
    expect(log.purge()).toBe(1);
    expect(fs.readFileSync(file, 'utf8')).toBe('');
  });

  it('skips a corrupted line instead of failing', () => {
    const log = createDrawLog({ file, now: () => new Date('2026-12-01T10:00:00Z') });
    log.logDraw({ locale: 'en', content: 'c', assignments });
    fs.appendFileSync(file, '{"type":"draw",');
    expect(log.listDraws()).toHaveLength(1);
  });

  it('does nothing when disabled', () => {
    const log = createDrawLog({ file: null });
    expect(log.enabled).toBe(false);
    expect(log.logDraw({ locale: 'en', content: 'c', assignments })).toBeUndefined();
    expect(log.purge()).toBe(0);
  });
});
