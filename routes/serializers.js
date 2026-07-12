const toProvince = (province) => ({
  province_id: province.id,
  name: province.name,
});

const toDistrict = (district) => ({
  district_id: district.id,
  name: district.name,
  province_id: district.province_id,
});

const toStation = (station) => ({
  station_id: station.id,
  name: station.name,
  district_id: station.district_id,
});

const toPing = (ping) => ({
  ping_id: ping.id,
  vehicle_id: ping.vehicle_id,
  timestamp: ping.timestamp,
  lat: ping.lat ?? ping.latitude,
  lng: ping.lng ?? ping.longitude,
  speed: ping.speed ?? null,
});

const toVehicle = (vehicle) => ({
  vehicle_id: vehicle.id,
  reg_number: vehicle.registration_number,
  device_id: vehicle.device_id,
  station_id: vehicle.station_id,
});

module.exports = {
  toProvince,
  toDistrict,
  toStation,
  toPing,
  toVehicle,
};
