import { RESET } from 'Contacts/Contacts.types';
import { EDIT_MESSAGE } from './Editor.types';

const defaultMessage = `
<p style="text-align: center;"><span style="font-size: 32px;">Hello </span><strong style="font-size: 50px; color: rgb(230, 0, 0);">@you</strong><span style="font-size: 32px;">!!!</span></p><p style="text-align: center;"><br></p><p>Do you remember when we decided to set up a <span style="font-size: 32px; color: rgb(0, 138, 0);">S</span><span style="font-size: 32px; color: rgb(230, 0, 0);">e</span><span style="font-size: 32px; color: rgb(0, 138, 0);">c</span><span style="font-size: 32px; color: rgb(230, 0, 0);">r</span><span style="font-size: 32px; color: rgb(0, 138, 0);">e</span><span style="font-size: 32px; color: rgb(230, 0, 0);">t</span><span style="font-size: 32px;"> </span><span style="font-size: 32px; color: rgb(0, 138, 0);">S</span><span style="font-size: 32px; color: rgb(230, 0, 0);">a</span><span style="font-size: 32px; color: rgb(0, 138, 0);">n</span><span style="font-size: 32px; color: rgb(230, 0, 0);">t</span><span style="font-size: 32px; color: rgb(0, 138, 0);">a</span> with a budget of <strong>20$</strong> ?</p><p>You have to find a gift for <u style="color: rgb(0, 138, 0); font-size: 32px;">@friend</u><span style="color: rgb(0, 138, 0); font-size: 32px;"> </span></p><p><br></p><p>See you at the end of the year:</p><p><br></p><p style="text-align: center;"><span style="font-size: 50px;">😘🎄🎅🎉🍰🍾</span></p>
`;

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
