import { configure, addDecorator } from "@storybook/react";
import * as React from "react";
import GlobalStyle from "../src/ui/GlobalStyle";

const req = require.context("../src", true, /stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
));

configure(loadStories, module);
