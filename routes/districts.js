const express = require("express");
const { toDistrict } = require("./serializers");

const createDistrictsRouter = (districts) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(districts.map(toDistrict));
  });

  router.get("/:district_id", (req, res) => {
    const district = districts.find(
      (item) => item.id === req.params.district_id
    );

    if (!district) {
      return res.status(404).json({ error: "District not found" });
    }

    res.json(toDistrict(district));
  });

  return router;
};

module.exports = createDistrictsRouter;
