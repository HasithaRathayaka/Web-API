const express = require("express");
const { toPing, toVehicle } = require("./serializers");

const createVehiclesRouter = ({ vehicles, pings }) => {
  const router = express.Router();

  const findLatestPing = (vehicleId) =>
    pings
      .filter((ping) => ping.vehicle_id === vehicleId)
      .reduce(
        (latest, ping) =>
          !latest || new Date(ping.timestamp) > new Date(latest.timestamp)
            ? ping
            : latest,
        null
      );

  router.get("/", (req, res) => {
    res.json(vehicles.map(toVehicle));
  });

  router.get("/:vehicle_id", (req, res) => {
    const vehicle = vehicles.find(
      (item) => item.id === req.params.vehicle_id
    );

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const lastPing = findLatestPing(vehicle.id);
    res.json({
      ...toVehicle(vehicle),
      last_ping: lastPing ? toPing(lastPing) : null,
    });
  });

  return router;
};

module.exports = createVehiclesRouter;
