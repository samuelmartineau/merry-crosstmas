# merry-crosstmas-server

## Draw log and resending lost emails

Every draw is written as one JSON line to a draw log, with the locale, the
message, and for each person their email, who they got, and whether Mailgun
accepted the email. If an email gets lost, it can be sent again from that line.

- Default file: `logs/draws.jsonl` next to `server.js` (git-ignored, never served).
- `MERRY_CROSSTMAS_DRAW_LOG=/var/lib/merry-crosstmas/draws.jsonl` to put it elsewhere, or `off` to disable it.
- The file is created with `600` permissions: it reveals who gives to whom.
- Each draw is purged on the 1st of February that follows it (checked at startup
  and on every new draw). `MERRY_CROSSTMAS_DRAW_LOG_RETENTION_DAYS=30` keeps draws
  for a fixed number of days instead.

Resending (run on the server, with the same `MERRY_CROSSTMAS_*` variables as the app):

```sh
node scripts/resend.js list                                  # draws + delivery status, never who got whom
node scripts/resend.js send <drawId> friend@mail.com         # resend one person's email
node scripts/resend.js send <drawId> friend@mail.com --to fixed@mail.com  # to a corrected address
node scripts/resend.js send-failed <drawId>                  # resend everything Mailgun refused
```

Resends are appended to the log too, so `list` shows the latest status.
