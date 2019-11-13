import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CustomToolbar from '../Editor/Toolbar';
import { edit } from '../store';
import 'react-quill/dist/quill.snow.css';

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

const styles = {
  testEditor: {
    background: 'white',
  },
};

const MerryEditor = ({ classes, message, onEdit }) => (
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
export default compose(
  connect(
    state => ({
      message: state.editor,
    }),
    dispatch => ({
      onEdit(value) {
        dispatch(edit(value));
      },
    }),
  ),
  withStyles(styles),
)(MerryEditor);
