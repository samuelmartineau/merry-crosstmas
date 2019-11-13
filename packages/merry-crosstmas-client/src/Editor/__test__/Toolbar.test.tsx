import React from "react";
import renderer from "react-test-renderer";
import Toolbar from "../Toolbar";

xtest("Toolbar renders correctly", () => {
  const tree = renderer.create(<Toolbar />).toJSON();
  expect(tree).toMatchSnapshot();
});
