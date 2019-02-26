import * as express from "express";
import { descriptorRegistry } from "./resource";
import { ResourceRegistry } from "./makeResourceRegistry";

export default function makeApiMiddleware(registry: ResourceRegistry) {
  const router = express.Router();

  router.get("/:resource", (req, res) => {
    const name = req.params.resource;
    const descriptor = descriptorRegistry[name];
    const resource = registry.access(descriptor);

    resource.search(req.query).subscribe(recipes => {
      res.send(recipes);
    });
  });

  return router;
}
