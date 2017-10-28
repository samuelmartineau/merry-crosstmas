// @flow
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import CustomToolbar from "Editor/Toolbar";
import { withStyles } from "material-ui/styles";
import "react-quill/dist/quill.snow.css";
const BackgroundClass = Quill.import("attributors/style/background");
const ColorClass = Quill.import("attributors/style/color");
const SizeStyle = Quill.import("attributors/style/size");
const AlignStyle = Quill.import("attributors/style/align");
SizeStyle.whitelist.push("50px");
Quill.register(BackgroundClass, true);
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);
Quill.register(AlignStyle, true);

const modules = {
  toolbar: "#toolbar"
};

const defaultMessage = `<div style="text-align: center;"><span style="font-size: 32px;">Hello!!!</span></div>
<div style="text-align: center;"><br></div>
<div>Do you remember our conversation? We decided to set up a Santa gift exchange between friends with a budget of <b>20$</b></div>
<div><br></div>
<div>You have to find a gift for @friend, good luck :)</div>
<div><br></div>
<div>See you at the end of the year</div>`;

const formats = [
  "size",
  "header",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "list",
  "bullet",
  "align"
];

const style = {
  testEditor: {
    background: "white"
  }
};

class MerryEditor extends React.Component {
  state = { text: defaultMessage };
  handleChange = value => {
    this.setState({ text: value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.testEditor}>
        <CustomToolbar />
        <ReactQuill
          modules={modules}
          formats={formats}
          value={this.state.text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withStyles(style)(MerryEditor);
