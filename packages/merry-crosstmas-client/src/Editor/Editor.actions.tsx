import { EDIT_MESSAGE } from './Editor.types';

// byUser is false when Quill re-serializes the value it was given.
export const edit = (message: string, byUser = true) =>
  ({
    type: EDIT_MESSAGE,
    message,
    byUser,
  }) as const;

export default edit;

export type EditorActions = ReturnType<typeof edit>;
