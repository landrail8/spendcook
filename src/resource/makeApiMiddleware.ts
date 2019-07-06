import * as express from "express";
import { ResourceDriver } from "./types";
import descriptorRegistry from "./descriptorRegistry";
import makeResource from "./makeResource";

export default function makeApiMiddleware(driver: ResourceDriver) {
  const router = express.Router();
  router.use(express.json())

  router.get("/:resource", (req, res) => {
    const name = req.params.resource;
    const descriptor = descriptorRegistry[name];
    const resource = makeResource(driver, descriptor);

    resource.search(req.query).subscribe(recipes => {
      res.json(recipes);
    });
  });

  router.post("/:resource", (req, res) => {
    const name = req.params.resource;
    const descriptor = descriptorRegistry[name];
    const resource = makeResource(driver, descriptor);

    debugger;

    resource.post(req.body).subscribe(recipes => {
      res.json(recipes)
    });
  });

  return router;
}
