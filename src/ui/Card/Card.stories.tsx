import * as React from "react";
import { storiesOf } from "@storybook/react";
import imageExample from "./__storyAssets__/example.jpg";
import { Card, CardImage, CardTitle } from "./index";

storiesOf("Card", module).add("Обычное состояние", () => (
  <Card>
    <CardImage>
      <img src={imageExample} />
    </CardImage>
    <CardTitle>Title</CardTitle>
  </Card>
));
