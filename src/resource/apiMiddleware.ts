import * as express from "express";
import { descriptorRegistry, makeResource, ResourceDriver } from "./resource";

export default function makeApiMiddleware(driver: ResourceDriver) {
  const router = express.Router();

  router.get("/:resource", (req, res) => {
    const name = req.params.resource;
    const descriptor = descriptorRegistry[name];
    const resource = makeResource(driver, descriptor);

    resource.search(req.query).subscribe(recipes => {
      res.send(recipes);
    });
  });

  return router;
}
