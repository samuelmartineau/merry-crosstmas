import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { AppState } from '../store/reducer';
import { candyStripe, colors, eyebrow, sans, serif } from '../theme';
import { useT } from '../i18n/useT';

export const PREVIEW_ID = 'email-preview';

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );

// Same substitution the server does in mail/mail.js.
export const personalize = (html: string, you: string, friend: string) =>
  html
    .replace(/@friend/gi, escapeHtml(friend))
    .replace(/@you/gi, escapeHtml(you));

const selectPeople = (state: AppState) => state.contacts;

const EmailPreview = () => {
  const { all, map } = useSelector(selectPeople);
  const message = useSelector((state: AppState) => state.editor.message);
  const [giverId, setGiverId] = useState<number | null>(null);
  const t = useT();

  const people = all.map((id, index) => ({
    ...map[id],
    label: map[id].name.trim() || t.contacts.friendN(index + 1),
  }));
  const giverIndex = Math.max(
    0,
    people.findIndex((p) => p.id === giverId),
  );
  const giver = people[giverIndex];
  // An illustrative match: the next allowed person in the list. The real draw
  // happens on the server when the emails are sent.
  const others = [
    ...people.slice(giverIndex + 1),
    ...people.slice(0, giverIndex),
  ];
  const friend =
    others.find((p) => !giver.forbidden.includes(p.id)) ?? others[0] ?? giver;

  return (
    <Box id={PREVIEW_ID} sx={{ scrollMarginTop: 16 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          mx: 0.5,
          mb: 1.25,
        }}
      >
        <Box component="span" sx={eyebrow}>
          {t.preview.label}
        </Box>
        <Box
          component="select"
          aria-label={t.preview.selectLabel}
          value={giver.id}
          onChange={(e) => setGiverId(Number(e.target.value))}
          sx={{
            font: `600 13px ${sans}`,
            border: `1px solid ${colors.line2}`,
            borderRadius: 999,
            p: '6px 10px',
            background: '#fff',
            color: colors.ink,
            maxWidth: '60%',
          }}
        >
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {t.preview.seenBy(p.label)}
            </option>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          background: '#fff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 14px 40px rgba(90,60,30,.14)',
        }}
      >
        <Box sx={{ height: 10, background: candyStripe }} />
        <Box
          sx={{
            background: colors.red,
            color: '#fff',
            textAlign: 'center',
            p: 2,
          }}
        >
          <Box sx={{ fontFamily: serif, fontWeight: 700, fontSize: 22 }}>
            🎅 Secret Santa 🎄
          </Box>
          <Box
            sx={{ ...eyebrow, fontSize: 10, color: colors.redSoft, mt: 0.25 }}
          >
            Merry Crosstmas
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', p: '22px 20px 4px' }}>
          <Box sx={{ ...eyebrow, fontSize: 10, letterSpacing: '2px' }}>
            {t.email.revealLabel}
          </Box>
          <Box
            sx={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: 32,
              lineHeight: '38px',
              color: colors.green,
              mt: 0.5,
              overflowWrap: 'anywhere',
            }}
          >
            {friend.label}
          </Box>
          <Box sx={{ color: colors.red, mt: 0.75, fontSize: 12 }} aria-hidden>
            — ❄ —
          </Box>
        </Box>
        <Box
          sx={{
            p: '12px 24px 20px',
            fontSize: 16,
            lineHeight: '26px',
            zoom: 0.8,
            overflowWrap: 'break-word',
            '& p': { m: '0 0 12px' },
            '& img': { maxWidth: '100%', height: 'auto' },
          }}
          dangerouslySetInnerHTML={{
            __html: personalize(message, giver.label, friend.label),
          }}
        />
        <Box
          sx={{
            background: colors.paper,
            borderTop: `1px solid ${colors.line}`,
            textAlign: 'center',
            p: 1.75,
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              background: colors.green,
              color: '#fff',
              borderRadius: 999,
              p: '7px 14px',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            🎁 {t.email.cta}
          </Box>
        </Box>
        <Box sx={{ height: 6, background: candyStripe }} />
      </Box>
      <Box
        component="p"
        sx={{
          textAlign: 'center',
          color: colors.faint,
          fontSize: 12,
          mt: 1.25,
          mb: 0,
        }}
      >
        {t.preview.note}
      </Box>
    </Box>
  );
};

export default EmailPreview;
