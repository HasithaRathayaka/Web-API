const express = require("express");
const { toStation } = require("./serializers");

const createStationsRouter = (stations) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(stations.map(toStation));
  });

  router.get("/:station_id", (req, res) => {
    const station = stations.find(
      (item) => item.id === req.params.station_id
    );

    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.json(toStation(station));
  });

  return router;
};

module.exports = createStationsRouter;
