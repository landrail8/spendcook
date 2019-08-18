import * as React from "react";
import { storiesOf } from "@storybook/react";
import ResourceMock from "../../resource/ResourceMock";
import { recipesDescriptor } from "../../entities/recipes";
import { ResourceProvider } from "../../resource";
import mapResources from "../../resource/mapResources";
import RecipeForm from "./RecipeForm";
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

storiesOf("RecipeForm", module).add("Добавление рецпта", () => (
  <MemoryRouter initialEntries={["/recipes/1"]}>
    <ResourceProvider map={resourceMap}>
      <RecipeForm history={history} location={location} match={match} />
    </ResourceProvider>
  </MemoryRouter>
));
