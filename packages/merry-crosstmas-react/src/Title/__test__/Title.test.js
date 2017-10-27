import React from "react";
import renderer from "react-test-renderer";
import Title from "../Title";

test("Title renders correctly", () => {
  const tree = renderer.create(<Title />).toJSON();
  expect(tree).toMatchSnapshot();
});
test("Title renders correctly whith content", () => {
  const tree = renderer.create(<Title>Children test</Title>).toJSON();
  expect(tree).toMatchSnapshot();
});
