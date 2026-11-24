import { useSelector } from 'react-redux';
import Button, { ButtonProps } from '@mui/material/Button';
import { FORM_ID } from '../Contacts/Contacts';
import { AppState } from '../store/reducer';
import { useT } from '../i18n/useT';

type Props = { short?: boolean } & Omit<ButtonProps, 'type' | 'form'>;

// Lives outside the <form> (in the preview column and the mobile bar), so it
// points at it with the `form` attribute to keep native validation.
const SendButton = ({ short, ...props }: Props) => {
  const count = useSelector((state: AppState) => state.contacts.all.length);
  const t = useT();
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      form={FORM_ID}
      {...props}
    >
      🎁&nbsp; {short ? t.send.short : t.send.full(count)}
    </Button>
  );
};

export default SendButton;
