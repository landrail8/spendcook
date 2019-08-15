import * as React from "react";
import { storiesOf } from "@storybook/react";
import imageExample from "../__storyAssets__/example.jpg";
import { Card, CardImage, CardTitle } from "./index";

storiesOf("Card", module).add("Обычное состояние", () => (
  <Card href="#">
    <CardImage src={imageExample} alt="example" />
    <CardTitle>Title</CardTitle>
  </Card>
));
