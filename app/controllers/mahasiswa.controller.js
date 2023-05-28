const Mahasiswa = require("../models/mahasiswa.model.js");

// Create and Save a new Mahasiswa
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Mahasiswa
  const Mahasiswa = new Mahasiswa({
    name: req.body.name,
    address: req.body.address,
    gender: req.body.gender,
  });

  // Save Mahasiswa in the database
  Mahasiswa.create(Mahasiswa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Mahasiswa.",
      });
    else res.send(data);
  });
};

// Retrieve all Mahasiswas from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Mahasiswa.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Mahasiswas.",
      });
    else res.send(data);
  });
};

// Find a single Mahasiswa by Id
exports.findOne = (req, res) => {
  Mahasiswa.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Mahasiswa with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Mahasiswa with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all gender Mahasiswas
exports.findAllgender = (req, res) => {
  Mahasiswa.getAllgender((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Mahasiswas.",
      });
    else res.send(data);
  });
};

// Update a Mahasiswa identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Mahasiswa.updateById(req.params.id, new Mahasiswa(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Mahasiswa with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Mahasiswa with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Mahasiswa with the specified id in the request
exports.delete = (req, res) => {
  Mahasiswa.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Mahasiswa with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Mahasiswa with id " + req.params.id,
        });
      }
    } else res.send({ message: `Mahasiswa was deleted successfully!` });
  });
};

// Delete all Mahasiswas from the database.
exports.deleteAll = (req, res) => {
  Mahasiswa.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Mahasiswas.",
      });
    else res.send({ message: `All Mahasiswas were deleted successfully!` });
  });
};
