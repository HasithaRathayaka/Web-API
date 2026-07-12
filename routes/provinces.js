const express = require("express");
const { toProvince } = require("./serializers");

const createProvincesRouter = (provinces) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(provinces.map(toProvince));
  });

  router.get("/:province_id", (req, res) => {
    const province = provinces.find(
      (item) => item.id === req.params.province_id
    );

    if (!province) {
      return res.status(404).json({ error: "Province not found" });
    }

    res.json(toProvince(province));
  });

  return router;
};

module.exports = createProvincesRouter;
