import ReactQuill, { Quill } from 'react-quill-new';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import { Dispatch } from 'redux';
import 'react-quill-new/dist/quill.snow.css';
import { edit } from '../store';
import { AppState } from '../store/reducer';
import CustomToolbar from './CustomToolbar';
import Panel, { Tag } from '../Panel/Panel';
import { colors, sans } from '../theme';

type StyleAttributor = { whitelist: string[] | undefined };

// Use inline styles (not classes) so the formatting survives in the email.
const BackgroundClass = Quill.import('attributors/style/background');
const ColorClass = Quill.import('attributors/style/color');
const SizeStyle = Quill.import('attributors/style/size') as StyleAttributor;
const AlignStyle = Quill.import('attributors/style/align');
SizeStyle.whitelist = ['10px', '18px', '32px', '50px'];
Quill.register('formats/background', BackgroundClass, true);
Quill.register('formats/color', ColorClass, true);
Quill.register('formats/size', SizeStyle, true);
Quill.register('formats/align', AlignStyle, true);

const modules = {
  toolbar: '#toolbar',
};

const formats = [
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'color',
  'background',
  'list',
  'align',
  'link',
];

// Restyle Quill's "snow" theme to match the rest of the app. No overflow:hidden
// on the wrapper so the pickers and the link tooltip are never clipped.
const editorSx = {
  border: `1.5px solid ${colors.line2}`,
  borderRadius: '16px',
  background: '#fff',
  '&:focus-within': {
    borderColor: colors.green,
    boxShadow: `0 0 0 3px ${colors.greenSoft}`,
  },
  '& .ql-toolbar.ql-snow': {
    border: 0,
    borderBottom: `1px solid ${colors.line}`,
    background: colors.paper,
    borderRadius: '14px 14px 0 0',
    padding: '8px 10px',
    fontFamily: sans,
  },
  '& .ql-toolbar.ql-snow .ql-formats': { mr: 1 },
  '& .ql-snow .ql-picker-options': { borderRadius: '10px', zIndex: 2 },
  '& .ql-container.ql-snow': {
    border: 0,
    fontFamily: sans,
    fontSize: 16,
  },
  '& .ql-editor': {
    minHeight: 200,
    padding: { xs: '16px', md: '20px 22px' },
    lineHeight: 1.6,
    color: colors.ink,
  },
  '& .ql-snow .ql-tooltip': { zIndex: 3, borderRadius: '10px' },
} as const;

type Props = StateProps & DispatchProps;

const MerryEditor = ({ message, onEdit }: Props) => (
  <Panel
    icon="✉️"
    title="Your message"
    hint={
      <>
        Type <Tag kind="you">@you</Tag> and <Tag kind="friend">@friend</Tag>; we
        swap in the real names for each email.
      </>
    }
  >
    <Box sx={editorSx}>
      <CustomToolbar />
      <ReactQuill
        modules={modules}
        formats={formats}
        value={message}
        onChange={onEdit}
      />
    </Box>
  </Panel>
);

const mapStateToProps = (state: AppState) => ({
  message: state.editor,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onEdit(value: string) {
    dispatch(edit(value));
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MerryEditor);
