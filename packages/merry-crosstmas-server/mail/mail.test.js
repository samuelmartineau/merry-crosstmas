const fs = require('fs');
const os = require('os');
const path = require('path');
// sanitize-html ships ESM only, which jest cannot load here.
jest.mock('sanitize-html', () => html => html.replace(/<script>.*?<\/script>/g, ''));

const { createMailRoute } = require('./mail');
const { createDrawLog } = require('./drawLog');

const body = {
  locale: 'fr-FR',
  content: '<p>Salut @you</p><script>x</script>',
  contacts: [
    { id: 1, name: 'Sam', email: 'sam@x.com' },
    { id: 2, name: 'Aline', email: 'aline@x.com' },
    { id: 3, name: 'Paul', email: 'paul@x.com' },
  ],
};

function run(route) {
  return new Promise(resolve => {
    const res = {
      statusCode: 200,
      status(code) { this.statusCode = code; return this; },
      send(payload) { resolve({ status: this.statusCode, payload }); },
    };
    route({ body }, res);
  });
}

let dir;
let drawLog;
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mailroute-'));
  drawLog = createDrawLog({ file: path.join(dir, 'draws.jsonl') });
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
  jest.restoreAllMocks();
});

it('logs every assignment with its delivery status', async () => {
  const send = jest.fn(({ email }) =>
    (email === 'paul@x.com' ? Promise.reject(new Error('mailgun down')) : Promise.resolve(`<${email}>`)));
  const { status } = await run(createMailRoute({ send, drawLog }));
  expect(status).toBe(500);
  expect(send).toHaveBeenCalledTimes(3);

  const [draw] = drawLog.listDraws();
  expect(draw.locale).toBe('fr');
  expect(draw.content).toBe('<p>Salut @you</p>');
  expect(draw.assignments).toHaveLength(3);
  const paul = draw.assignments.find(a => a.fromEmail === 'paul@x.com');
  expect(paul).toMatchObject({ status: 'failed', error: 'mailgun down' });
  const sam = draw.assignments.find(a => a.fromEmail === 'sam@x.com');
  expect(sam).toMatchObject({ status: 'accepted', messageId: '<sam@x.com>' });
  // everyone gives to someone else, and everyone receives once
  expect(new Set(draw.assignments.map(a => a.toEmail)).size).toBe(3);
  draw.assignments.forEach(a => expect(a.toEmail).not.toBe(a.fromEmail));
});

it('still answers when the log cannot be written', async () => {
  const brokenLog = { logDraw: () => { throw new Error('disk full'); } };
  const send = () => Promise.resolve('<id>');
  const { status } = await run(createMailRoute({ send, drawLog: brokenLog }));
  expect(status).toBe(200);
});
