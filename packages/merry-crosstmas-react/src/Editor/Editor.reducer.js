import { RESET } from 'Contacts/Contacts.types';
import { EDIT_MESSAGE } from './Editor.types';

const defaultMessage = `<div style="text-align: center;"><span style="font-size: 32px;">Hello @you!!!</span></div>
<div style="text-align: center;"><br></div>
<div>Do you remember our conversation? We decided to set up a Santa gift exchange between friends with a budget of <b>20$</b></div>
<div><br></div>
<div>You have to find a gift for @friend, good luck :)</div>
<div><br></div>
<div>See you at the end of the year</div>`;

export const reducer = (state = defaultMessage, action) => {
  switch (action.type) {
    case EDIT_MESSAGE: {
      return action.message;
    }
    case RESET: {
      return defaultMessage;
    }
    default:
      return state;
  }
};

export default reducer;
