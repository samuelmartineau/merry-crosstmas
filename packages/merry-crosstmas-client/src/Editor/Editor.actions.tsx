import { EDIT_MESSAGE } from './Editor.types';

export const edit = (message: string) => ({
  type: EDIT_MESSAGE,
  message,
});

export default edit;

export type EditorActions = ReturnType<typeof edit>;
