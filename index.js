const express = require("express");
const seed = require("./seed.json");

const app = express();
const port = process.env.PORT || 3000;
const deviceKeys = Object.fromEntries(
  seed.vehicles.map((vehicle) => [
    vehicle.id,
    `key_${vehicle.id.replace(/-/g, "")}`,
  ])
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", session: "NB6007CEM S2" });
});

app.get("/provinces", (req, res) => {
  res.json(seed.provinces);
});

app.get("/provinces/:provinceId", (req, res) => {
  const province = seed.provinces.find((item) => item.id === req.params.provinceId);

  if (!province) {
    return res.status(404).json({ error: "Province not found" });
  }

  res.json(province);
});

app.get("/districts", (req, res) => {
  res.json(seed.districts);
});

app.get("/districts/:districtId", (req, res) => {
  const district = seed.districts.find((item) => item.id === req.params.districtId);

  if (!district) {
    return res.status(404).json({ error: "District not found" });
  }

  res.json(district);
});

app.get("/stations", (req, res) => {
  res.json(seed.stations);
});

app.get("/stations/:stationId", (req, res) => {
  const station = seed.stations.find((item) => item.id === req.params.stationId);

  if (!station) {
    return res.status(404).json({ error: "Station not found" });
  }

  res.json(station);
});

app.get("/vehicles", (req, res) => {
  res.json(seed.vehicles);
});

app.get("/vehicles/:vehicleId", (req, res) => {
  const vehicle = seed.vehicles.find((item) => item.id === req.params.vehicleId);

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.json(vehicle);
});

app.get("/vehicles/:vehicleId/pings", (req, res) => {
  const vehicle = seed.vehicles.find((item) => item.id === req.params.vehicleId);

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const pings = seed.pings.filter((item) => item.vehicle_id === req.params.vehicleId);

  res.json(pings);
});

app.post("/vehicles/:vehicleId/pings", (req, res) => {
  const apiKey = req.get("X-API-Key");

  if (!apiKey) {
    return res.status(401).json({ error: "X-API-Key header is required" });
  }

  const vehicle = seed.vehicles.find((item) => item.id === req.params.vehicleId);

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  if (apiKey !== deviceKeys[vehicle.id]) {
    return res.status(403).json({ error: "Invalid device key" });
  }

  const { latitude, longitude, speed } = req.body || {};

  if (latitude === undefined || longitude === undefined || speed === undefined) {
    return res.status(400).json({
      error: "latitude, longitude, and speed are required",
    });
  }

  const ping = {
    id: `ping-${String(seed.pings.length + 1).padStart(5, "0")}`,
    vehicle_id: vehicle.id,
    latitude,
    longitude,
    speed,
    timestamp: new Date().toISOString(),
  };

  seed.pings.push(ping);

  res
    .status(201)
    .location(`/vehicles/${vehicle.id}/pings/${ping.id}`)
    .set({
      ETag: `"${ping.id}"`,
      "Last-Modified": new Date(ping.timestamp).toUTCString(),
    })
    .json(ping);
});

app.get("/vehicles/:vehicleId/pings/:pingId", (req, res) => {
  const ping = seed.pings.find(
    (item) =>
      item.vehicle_id === req.params.vehicleId && item.id === req.params.pingId
  );

  if (!ping) {
    return res.status(404).json({ error: "Ping not found" });
  }

  res.json(ping);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
