import ReactQuill, { Quill } from 'react-quill-new';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import { Dispatch } from 'redux';
import 'react-quill-new/dist/quill.snow.css';
import { edit } from '../store';
import { AppState } from '../store/reducer';
import CustomToolbar from './CustomToolbar';

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

type Props = StateProps & DispatchProps;

const MerryEditor = ({ message, onEdit }: Props) => (
  <Box sx={{ background: 'white' }}>
    <CustomToolbar />
    <ReactQuill
      modules={modules}
      formats={formats}
      value={message}
      onChange={onEdit}
    />
  </Box>
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
