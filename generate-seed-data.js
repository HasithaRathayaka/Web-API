const fs = require("fs");

const provinces = [
  { id: "prov-western", name: "Western" },
  { id: "prov-central", name: "Central" },
  { id: "prov-southern", name: "Southern" },
  { id: "prov-northern", name: "Northern" },
  { id: "prov-eastern", name: "Eastern" },
  { id: "prov-north-western", name: "North Western" },
  { id: "prov-north-central", name: "North Central" },
  { id: "prov-uva", name: "Uva" },
  { id: "prov-sabaragamuwa", name: "Sabaragamuwa" },
];

const districts = [
  { id: "dist-colombo", name: "Colombo", province_id: "prov-western" },
  { id: "dist-gampaha", name: "Gampaha", province_id: "prov-western" },
  { id: "dist-kalutara", name: "Kalutara", province_id: "prov-western" },
  { id: "dist-kandy", name: "Kandy", province_id: "prov-central" },
  { id: "dist-matale", name: "Matale", province_id: "prov-central" },
  { id: "dist-nuwara-eliya", name: "Nuwara Eliya", province_id: "prov-central" },
  { id: "dist-galle", name: "Galle", province_id: "prov-southern" },
  { id: "dist-matara", name: "Matara", province_id: "prov-southern" },
  { id: "dist-hambantota", name: "Hambantota", province_id: "prov-southern" },
  { id: "dist-jaffna", name: "Jaffna", province_id: "prov-northern" },
  { id: "dist-kilinochchi", name: "Kilinochchi", province_id: "prov-northern" },
  { id: "dist-mannar", name: "Mannar", province_id: "prov-northern" },
  { id: "dist-vavuniya", name: "Vavuniya", province_id: "prov-northern" },
  { id: "dist-mullaitivu", name: "Mullaitivu", province_id: "prov-northern" },
  { id: "dist-batticaloa", name: "Batticaloa", province_id: "prov-eastern" },
  { id: "dist-ampara", name: "Ampara", province_id: "prov-eastern" },
  { id: "dist-trincomalee", name: "Trincomalee", province_id: "prov-eastern" },
  { id: "dist-kurunegala", name: "Kurunegala", province_id: "prov-north-western" },
  { id: "dist-puttalam", name: "Puttalam", province_id: "prov-north-western" },
  { id: "dist-anuradhapura", name: "Anuradhapura", province_id: "prov-north-central" },
  { id: "dist-polonnaruwa", name: "Polonnaruwa", province_id: "prov-north-central" },
  { id: "dist-badulla", name: "Badulla", province_id: "prov-uva" },
  { id: "dist-moneragala", name: "Moneragala", province_id: "prov-uva" },
  { id: "dist-ratnapura", name: "Ratnapura", province_id: "prov-sabaragamuwa" },
  { id: "dist-kegalle", name: "Kegalle", province_id: "prov-sabaragamuwa" },
];

const stations = [
  { id: "st-colombo-fort", name: "Colombo Fort Police Station", district_id: "dist-colombo", lat: 6.9344, lon: 79.8428 },
  { id: "st-bambalapitiya", name: "Bambalapitiya Police Station", district_id: "dist-colombo", lat: 6.8882, lon: 79.8563 },
  { id: "st-negombo", name: "Negombo Police Station", district_id: "dist-gampaha", lat: 7.2083, lon: 79.8358 },
  { id: "st-gampaha", name: "Gampaha Police Station", district_id: "dist-gampaha", lat: 7.0873, lon: 79.999 },
  { id: "st-kalutara", name: "Kalutara Police Station", district_id: "dist-kalutara", lat: 6.5854, lon: 79.9607 },
  { id: "st-kandy", name: "Kandy Police Station", district_id: "dist-kandy", lat: 7.2906, lon: 80.6337 },
  { id: "st-matale", name: "Matale Police Station", district_id: "dist-matale", lat: 7.4675, lon: 80.6234 },
  { id: "st-nuwara-eliya", name: "Nuwara Eliya Police Station", district_id: "dist-nuwara-eliya", lat: 6.9497, lon: 80.7891 },
  { id: "st-galle", name: "Galle Police Station", district_id: "dist-galle", lat: 6.0329, lon: 80.2168 },
  { id: "st-matara", name: "Matara Police Station", district_id: "dist-matara", lat: 5.9549, lon: 80.555 },
  { id: "st-hambantota", name: "Hambantota Police Station", district_id: "dist-hambantota", lat: 6.1241, lon: 81.1185 },
  { id: "st-jaffna", name: "Jaffna Police Station", district_id: "dist-jaffna", lat: 9.6615, lon: 80.0255 },
  { id: "st-vavuniya", name: "Vavuniya Police Station", district_id: "dist-vavuniya", lat: 8.7514, lon: 80.4971 },
  { id: "st-batticaloa", name: "Batticaloa Police Station", district_id: "dist-batticaloa", lat: 7.717, lon: 81.7 },
  { id: "st-ampara", name: "Ampara Police Station", district_id: "dist-ampara", lat: 7.3018, lon: 81.6747 },
  { id: "st-trincomalee", name: "Trincomalee Police Station", district_id: "dist-trincomalee", lat: 8.5874, lon: 81.2152 },
  { id: "st-kurunegala", name: "Kurunegala Police Station", district_id: "dist-kurunegala", lat: 7.4863, lon: 80.3647 },
  { id: "st-puttalam", name: "Puttalam Police Station", district_id: "dist-puttalam", lat: 8.0362, lon: 79.8283 },
  { id: "st-anuradhapura", name: "Anuradhapura Police Station", district_id: "dist-anuradhapura", lat: 8.3114, lon: 80.4037 },
  { id: "st-polonnaruwa", name: "Polonnaruwa Police Station", district_id: "dist-polonnaruwa", lat: 7.9403, lon: 81.0188 },
  { id: "st-badulla", name: "Badulla Police Station", district_id: "dist-badulla", lat: 6.9934, lon: 81.055 },
  { id: "st-moneragala", name: "Moneragala Police Station", district_id: "dist-moneragala", lat: 6.8728, lon: 81.3507 },
  { id: "st-ratnapura", name: "Ratnapura Police Station", district_id: "dist-ratnapura", lat: 6.6828, lon: 80.3992 },
  { id: "st-kegalle", name: "Kegalle Police Station", district_id: "dist-kegalle", lat: 7.2513, lon: 80.3464 },
  { id: "st-kilinochchi", name: "Kilinochchi Police Station", district_id: "dist-kilinochchi", lat: 9.3803, lon: 80.377 },
];

const publicStations = stations.map(({ lat, lon, ...station }) => station);
const vehicles = [];
const pings = [];
const baseTime = Date.UTC(2026, 5, 29, 8, 0, 0);

for (let i = 1; i <= 200; i += 1) {
  const station = stations[(i - 1) % stations.length];
  const vehicleId = `veh-${String(i).padStart(3, "0")}`;
  const regPrefix = ["WP", "CP", "SP", "NP", "EP", "NW", "NC", "UP", "SG"][(i - 1) % 9];
  const regNumber = `${regPrefix}-TUK-${String(1000 + i)}`;

  vehicles.push({
    id: vehicleId,
    registration_number: regNumber,
    device_id: `dev-tuk-${String(i).padStart(4, "0")}`,
    station_id: station.id,
  });

  for (let day = 0; day < 7; day += 1) {
    const driftA = ((i * 17 + day * 11) % 100 - 50) / 10000;
    const driftB = ((i * 23 + day * 7) % 100 - 50) / 10000;
    const timestamp = new Date(baseTime + day * 86400000 + (i % 12) * 1800000).toISOString();

    pings.push({
      id: `ping-${String((i - 1) * 7 + day + 1).padStart(5, "0")}`,
      vehicle_id: vehicleId,
      latitude: Number((station.lat + driftA).toFixed(6)),
      longitude: Number((station.lon + driftB).toFixed(6)),
      timestamp,
    });
  }
}

const seed = {
  provinces,
  districts,
  stations: publicStations,
  vehicles,
  pings,
};

fs.writeFileSync("seed-data.json", `${JSON.stringify(seed, null, 2)}\n`);
