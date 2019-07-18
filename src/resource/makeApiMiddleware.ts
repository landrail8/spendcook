import * as express from "express";
import { ResourceMap } from "./mapResources";

export default function makeApiMiddleware(map: ResourceMap) {
  const router = express.Router();
  router.use(express.json());

  for (const [{ name }, resource] of map) {
    router.get(`/${name}`, (req, res) => {
      resource.search(req.query).subscribe(recipes => {
        res.json(recipes);
      });
    });

    router.post(`/${name}`, (req, res) => {
      resource.post(req.body).subscribe(recipes => {
        res.json(recipes);
      });
    });
  }

  return router;
}
