// All the copy of the app, in English and French. The email strings mirror
// the server's mail/locales.js so the live preview matches the real email.

const en = {
  langName: 'English',
  switchLabel: 'Language',
  header: {
    eyebrow: 'Free · no sign-up · emails in one click',
    titleLine1: 'Draw names.',
    titleLine2: 'Send surprises.',
    tagline:
      "Everyone gets an email with their secret match. Even you won't know who has who.",
  },
  contacts: {
    title: "Who's playing?",
    exclusions: 'Exclusions',
    hint: 'Add at least 3 friends. Turn on exclusions to stop couples drawing each other.',
    name: 'Name',
    namePlaceholder: 'Alice',
    email: 'Email',
    emailPlaceholder: 'alice@example.com',
    delete: 'Delete',
    add: 'Add a friend',
    count: (count: number, max: number) => `${count} of ${max}`,
    friendN: (n: number) => `Friend ${n}`,
    thisFriend: 'This friend',
    canDraw: (name: string) => `${name} can draw`,
    allow: (name: string) => `Allow drawing ${name}`,
    never: (name: string) => `Never draw ${name}`,
  },
  editor: {
    title: 'Your message',
    hintBefore: 'Type',
    hintAnd: 'and',
    hintAfter: '; we swap in the real names for each email.',
    sizes: { small: 'Small', normal: 'Normal', big: 'Big', huge: 'Huge' },
  },
  preview: {
    label: 'Live preview',
    selectLabel: 'Preview the email received by',
    seenBy: (name: string) => `As seen by ${name}`,
    note: 'Sample match only. Names are drawn randomly when you send, and nobody sees the result.',
  },
  email: {
    revealLabel: 'Your secret friend is',
    cta: 'Organize your own Secret Santa',
  },
  send: {
    full: (count: number) => `Draw & send ${count} emails`,
    short: 'Draw & send',
    preview: 'Preview',
    sending: 'Drawing names and sending emails…',
  },
  success: {
    title: 'Emails sent!',
    body: "Everyone just received their secret match. If someone can't find theirs, ask them to check their spam folder.",
    again: 'Organize another Secret Santa',
  },
  errors: {
    duplicateEmails: 'Each friend needs a different email address.',
    tooManyRequests:
      'Too many draws in a short time. Please try again in a few minutes.',
    invalid:
      'Some information is missing or invalid. Please check the names and emails.',
    failed: 'The emails could not be sent. Please try again.',
  },
  close: 'Close',
  footer: { madeBy: 'Made with ❤️ by' },
  defaultMessage: `
<p style="text-align: center;"><span style="font-size: 32px;">Hello </span><strong style="font-size: 50px; color: rgb(230, 0, 0);">@you</strong><span style="font-size: 32px;">!!!</span></p><p style="text-align: center;"><br></p><p>Do you remember when we decided to set up a</p><p style="text-align: center;"><span style="font-size: 32px; color: rgb(0, 138, 0);">S</span><span style="font-size: 32px; color: rgb(230, 0, 0);">e</span><span style="font-size: 32px; color: rgb(0, 138, 0);">c</span><span style="font-size: 32px; color: rgb(230, 0, 0);">r</span><span style="font-size: 32px; color: rgb(0, 138, 0);">e</span><span style="font-size: 32px; color: rgb(230, 0, 0);">t</span><span style="font-size: 32px;"> </span><span style="font-size: 32px; color: rgb(0, 138, 0);">S</span><span style="font-size: 32px; color: rgb(230, 0, 0);">a</span><span style="font-size: 32px; color: rgb(0, 138, 0);">n</span><span style="font-size: 32px; color: rgb(230, 0, 0);">t</span><span style="font-size: 32px; color: rgb(0, 138, 0);">a</span></p><p>with a budget of <strong>20$</strong> ?</p><p>You have to find a gift for <u style="color: rgb(0, 138, 0); font-size: 32px;">@friend</u><span style="color: rgb(0, 138, 0); font-size: 32px;"> </span></p><p><br></p><p>See you at the end of the year:</p><p><br></p><p style="text-align: center;"><span style="font-size: 32px;">😘🎄🎅🎉🍰🍾</span></p>
`,
};

export type Messages = typeof en;

const fr: Messages = {
  langName: 'Français',
  switchLabel: 'Langue',
  header: {
    eyebrow: 'Gratuit · sans inscription · emails en un clic',
    titleLine1: 'Tirez au sort.',
    titleLine2: 'Offrez des surprises.',
    tagline:
      'Chacun reçoit un email avec son ami secret. Même toi, tu ne sauras pas qui offre à qui.',
  },
  contacts: {
    title: 'Qui participe ?',
    exclusions: 'Exclusions',
    hint: 'Ajoute au moins 3 amis. Active les exclusions pour éviter que les couples se tirent entre eux.',
    name: 'Prénom',
    namePlaceholder: 'Alice',
    email: 'Email',
    emailPlaceholder: 'alice@exemple.fr',
    delete: 'Supprimer',
    add: 'Ajouter un ami',
    count: (count: number, max: number) => `${count} sur ${max}`,
    friendN: (n: number) => `Ami ${n}`,
    thisFriend: 'Cet ami',
    canDraw: (name: string) => `${name} peut tirer`,
    allow: (name: string) => `Autoriser à tirer ${name}`,
    never: (name: string) => `Ne jamais tirer ${name}`,
  },
  editor: {
    title: 'Ton message',
    hintBefore: 'Écris',
    hintAnd: 'et',
    hintAfter: ' : on les remplace par les vrais prénoms dans chaque email.',
    sizes: { small: 'Petit', normal: 'Normal', big: 'Grand', huge: 'Énorme' },
  },
  preview: {
    label: 'Aperçu en direct',
    selectLabel: "Voir l'email reçu par",
    seenBy: (name: string) => `Vu par ${name}`,
    note: "Exemple de tirage seulement. Les noms sont tirés au sort à l'envoi, et personne ne voit le résultat.",
  },
  email: {
    revealLabel: 'Ton ami secret est',
    cta: 'Organise ton propre Secret Santa',
  },
  send: {
    full: (count: number) => `Tirer au sort et envoyer ${count} emails`,
    short: 'Tirer et envoyer',
    preview: 'Aperçu',
    sending: 'Tirage au sort et envoi des emails…',
  },
  success: {
    title: 'Emails envoyés !',
    body: "Tout le monde vient de recevoir son ami secret. Si quelqu'un ne trouve pas le sien, dis-lui de regarder dans ses spams.",
    again: 'Organiser un autre Secret Santa',
  },
  errors: {
    duplicateEmails: 'Chaque ami doit avoir une adresse email différente.',
    tooManyRequests:
      'Trop de tirages en peu de temps. Réessaie dans quelques minutes.',
    invalid:
      'Des informations manquent ou sont invalides. Vérifie les prénoms et les emails.',
    failed: "Les emails n'ont pas pu être envoyés. Réessaie.",
  },
  close: 'Fermer',
  footer: { madeBy: 'Fait avec ❤️ par' },
  defaultMessage: `
<p style="text-align: center;"><span style="font-size: 32px;">Coucou </span><strong style="font-size: 50px; color: rgb(230, 0, 0);">@you</strong><span style="font-size: 32px;"> !!!</span></p><p style="text-align: center;"><br></p><p>Tu te souviens, on a décidé d'organiser un</p><p style="text-align: center;"><span style="font-size: 32px; color: rgb(0, 138, 0);">S</span><span style="font-size: 32px; color: rgb(230, 0, 0);">e</span><span style="font-size: 32px; color: rgb(0, 138, 0);">c</span><span style="font-size: 32px; color: rgb(230, 0, 0);">r</span><span style="font-size: 32px; color: rgb(0, 138, 0);">e</span><span style="font-size: 32px; color: rgb(230, 0, 0);">t</span><span style="font-size: 32px;"> </span><span style="font-size: 32px; color: rgb(0, 138, 0);">S</span><span style="font-size: 32px; color: rgb(230, 0, 0);">a</span><span style="font-size: 32px; color: rgb(0, 138, 0);">n</span><span style="font-size: 32px; color: rgb(230, 0, 0);">t</span><span style="font-size: 32px; color: rgb(0, 138, 0);">a</span></p><p>avec un budget de <strong>20 €</strong> !</p><p>Tu dois trouver un cadeau pour <u style="color: rgb(0, 138, 0); font-size: 32px;">@friend</u><span style="color: rgb(0, 138, 0); font-size: 32px;"> </span></p><p><br></p><p>Rendez-vous à la fin de l'année :</p><p><br></p><p style="text-align: center;"><span style="font-size: 32px;">😘🎄🎅🎉🍰🍾</span></p>
`,
};

export const messages = { en, fr };
