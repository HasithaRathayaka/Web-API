const express = require("express");
const { toPing } = require("./serializers");

const createPingsRouter = ({ vehicles, pings, deviceKeys }) => {
  const router = express.Router();

  const findVehicle = (vehicleId) =>
    vehicles.find((item) => item.id === vehicleId);

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

  router.get("/:vehicle_id/last-position", (req, res) => {
    const vehicle = findVehicle(req.params.vehicle_id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const ping = findLatestPing(vehicle.id);

    if (!ping) {
      return res.status(404).json({ error: "Location ping not found" });
    }

    const { vehicle_id, timestamp, lat, lng, speed } = toPing(ping);
    res.json({ vehicle_id, timestamp, lat, lng, speed });
  });

  router.get("/:vehicle_id/pings", (req, res) => {
    const vehicle = findVehicle(req.params.vehicle_id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json(
      pings
        .filter((item) => item.vehicle_id === req.params.vehicle_id)
        .map(toPing)
    );
  });

  router.post("/:vehicle_id/pings", (req, res) => {
    const apiKey = req.get("X-API-Key");

    if (!apiKey) {
      return res.status(401).json({ error: "X-API-Key header is required" });
    }

    const vehicle = findVehicle(req.params.vehicle_id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    if (apiKey !== deviceKeys[vehicle.id]) {
      return res.status(403).json({ error: "Invalid device key" });
    }

    const { latitude, longitude, speed } = req.body || {};

    if (
      latitude === undefined ||
      longitude === undefined ||
      speed === undefined
    ) {
      return res.status(400).json({
        error: "latitude, longitude, and speed are required",
      });
    }

    const ping = {
      id: `ping-${String(pings.length + 1).padStart(5, "0")}`,
      vehicle_id: vehicle.id,
      lat: latitude,
      lng: longitude,
      speed,
      timestamp: new Date().toISOString(),
    };

    pings.push(ping);

    res
      .status(201)
      .location(`/vehicles/${vehicle.id}/pings/${ping.id}`)
      .set({
        ETag: `"${ping.id}"`,
        "Last-Modified": new Date(ping.timestamp).toUTCString(),
      })
      .json(toPing(ping));
  });

  router.get("/:vehicle_id/pings/:ping_id", (req, res) => {
    const ping = pings.find(
      (item) =>
        item.vehicle_id === req.params.vehicle_id &&
        item.id === req.params.ping_id
    );

    if (!ping) {
      return res.status(404).json({ error: "Ping not found" });
    }

    res.json(toPing(ping));
  });

  return router;
};

module.exports = createPingsRouter;
