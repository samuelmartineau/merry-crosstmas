import { EDIT_MESSAGE } from './Editor.types';

export const edit = message => ({
  type: EDIT_MESSAGE,
  message,
});
export default edit;
