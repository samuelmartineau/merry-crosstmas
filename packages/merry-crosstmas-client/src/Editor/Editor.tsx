import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CustomToolbar from '../Editor/Toolbar';
import { edit } from '../store';
import 'react-quill/dist/quill.snow.css';
import { WithStyles, createStyles } from '@material-ui/styles';
import { Dispatch } from 'redux';
import { AppState } from '../store/reducer';

const BackgroundClass = Quill.import('attributors/style/background');
const ColorClass = Quill.import('attributors/style/color');
const SizeStyle = Quill.import('attributors/style/size');
const AlignStyle = Quill.import('attributors/style/align');
SizeStyle.whitelist.push('50px');
Quill.register(BackgroundClass, true);
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);
Quill.register(AlignStyle, true);

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
  'bullet',
  'align',
];

const styles = () =>
  createStyles({
    testEditor: {
      background: 'white',
    },
  });

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

const MerryEditor = ({ classes, message, onEdit }: Props) => (
  <div className={classes.testEditor}>
    <CustomToolbar />
    <ReactQuill
      modules={modules}
      formats={formats}
      value={message}
      onChange={onEdit}
    />
  </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MerryEditor));
