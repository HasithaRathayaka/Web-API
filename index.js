const express = require("express");
const seed = require("./seed.json");

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
