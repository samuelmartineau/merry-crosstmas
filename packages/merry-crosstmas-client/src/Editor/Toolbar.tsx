import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar } from 'react-quill';
import { WithStyles, createStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    toolbar: {
      background: '#00e4ff',
    },
  });

type Props = WithStyles<typeof styles>;

const CustomToolbar = ({ classes }: Props) => (
  <div id="toolbar" className={classes.toolbar}>
    <select className="ql-size" defaultValue="">
      <option value="10px">Small</option>
      <option value="">Normal</option>
      <option value="32px">Big</option>
      <option value="50px">Huge</option>
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-list" value="bullet" />
    <select className="ql-align" defaultValue="">
      <option value="center" />
      <option value="left" />
      <option value="right" />
      <option value="justify" />
    </select>
    <select className="ql-color" defaultValue="">
      {Toolbar.defaultColors.map(color => (
        <option value={color.value} key={color.value} />
      ))}
    </select>
    <select className="ql-background" defaultValue="">
      {Toolbar.defaultColors.map(color => (
        <option value={color.value} key={color.value} />
      ))}
    </select>
    <button className="ql-clean" />
  </div>
);

export default withStyles(styles)(CustomToolbar);
