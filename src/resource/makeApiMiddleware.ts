import * as express from "express";
import { ResourceMap } from "./mapResources";

export default function makeApiMiddleware(map: ResourceMap) {
  const router = express.Router();
  router.use(express.json());

  for (const [{ name }, resource] of map) {
    const path = `/${name}`;

    router.get(path, (req, res) => {
      resource.search(req.query).subscribe(recipes => {
        res.json(recipes);
      });
    });

    router.post(path, (req, res) => {
      resource.post(req.body).subscribe(recipes => {
        res.json(recipes);
      });
    });

    router.delete(path, (req, res) => {
      resource.delete(req.query).subscribe(() => {
        res.end();
      });
    });
  }

  return router;
}
