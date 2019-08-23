import * as React from "react";
import { storiesOf } from "@storybook/react";
import ResourceMock from "../../resource/ResourceMock";
import { recipesDescriptor } from "../../entities/recipes";
import { ResourceProvider } from "../../resource";
import mapResources from "../../resource/mapResources";
import Recipe from "./Recipe";
import { MemoryRouter } from "react-router";

const resourceMap = mapResources(
  new ResourceMock(recipesDescriptor, [
    {
      id: "1",
      title: "Борщ",
      description: "Борщ любят в России"
    }
  ])
);

const history: any = {};
const match: any = {
  params: {
    id: "1"
  }
};
const location: any = {};

storiesOf("Recipe", module).add("Страница рецепта", () => (
  <MemoryRouter initialEntries={["/"]}>
    <ResourceProvider map={resourceMap}>
      <Recipe history={history} location={location} match={match} />
    </ResourceProvider>
  </MemoryRouter>
));
