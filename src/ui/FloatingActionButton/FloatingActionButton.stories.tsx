import * as React from "react";
import { storiesOf } from "@storybook/react";
import { FloatingActionButton } from "./index";
import { Add } from "@material-ui/icons";

storiesOf("FloatingActionButton", module).add("Обычное состояние", () => (
  <FloatingActionButton>
    <Add/>
  </FloatingActionButton>
));
