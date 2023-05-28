module.exports = (app) => {
  const mahasiswa = require("../controllers/mahasiswa.controller");

  var router = require("express").Router();

  // Create a new Mahasiswa
  router.post("/", mahasiswa.create);

  // Retrieve all mahasiswa
  router.get("/", mahasiswa.findAll);

  // Retrieve a single Mahasiswa with id
  router.get("/:id", mahasiswa.findOne);

  // Update a Mahasiswa with id
  router.put("/:id", mahasiswa.update);

  // Delete a Mahasiswa with id
  router.delete("/:id", mahasiswa.delete);
};
