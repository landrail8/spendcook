import * as React from "react";
import { storiesOf } from "@storybook/react";
import imageExample from "../__storyAssets__/example.jpg";
import {
  Card,
  CardImage,
  CardTitle,
  Collection,
  CollectionItem
} from "../index";

storiesOf("Collection", module).add("Коллекция карточек", () => (
  <Collection>
    <CollectionItem>
      <Card href="#">
        <CardImage src={imageExample} alt="example" />
        <CardTitle>Title</CardTitle>
      </Card>
    </CollectionItem>
    <CollectionItem>
      <Card href="#">
        <CardImage src={imageExample} alt="example" />
        <CardTitle>Title</CardTitle>
      </Card>
    </CollectionItem>
  </Collection>
));
