const express = require("express");
const seed = require("./seed.json");
const createProvincesRouter = require("./routes/provinces");
const createDistrictsRouter = require("./routes/districts");
const createStationsRouter = require("./routes/stations");
const createVehiclesRouter = require("./routes/vehicles");
const createPingsRouter = require("./routes/pings");

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

app.use("/provinces", createProvincesRouter(seed.provinces));
app.use("/districts", createDistrictsRouter(seed.districts));
app.use("/stations", createStationsRouter(seed.stations));
app.use("/vehicles", createPingsRouter({
  vehicles: seed.vehicles,
  pings: seed.pings,
  deviceKeys,
}));
app.use("/vehicles", createVehiclesRouter({
  vehicles: seed.vehicles,
  pings: seed.pings,
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
