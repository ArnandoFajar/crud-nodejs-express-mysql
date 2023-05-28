const sql = require("../config/db.config");

// constructor
const Mahasiswa = function (mahasiswa) {
  this.name = mahasiswa.name;
  this.address = mahasiswa.address;
  this.gender = mahasiswa.gender;
};

Mahasiswa.create = (newMahasiswa, result) => {
  sql.query("INSERT INTO Mahasiswas SET ?", newMahasiswa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Mahasiswa: ", { id: res.insertId, ...newMahasiswa });
    result(null, { id: res.insertId, ...newMahasiswa });
  });
};

Mahasiswa.findById = (id, result) => {
  sql.query(`SELECT * FROM Mahasiswas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Mahasiswa: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Mahasiswa with the id
    result({ kind: "not_found" }, null);
  });
};

Mahasiswa.getAll = (name, result) => {
  let query = "SELECT * FROM Mahasiswas";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Mahasiswas: ", res);
    result(null, res);
  });
};

Mahasiswa.updateById = (id, Mahasiswa, result) => {
  sql.query(
    "UPDATE Mahasiswas SET name = ?, address = ?, gender = ? WHERE id = ?",
    [Mahasiswa.name, Mahasiswa.address, Mahasiswa.gender, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Mahasiswa with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Mahasiswa: ", { id: id, ...Mahasiswa });
      result(null, { id: id, ...Mahasiswa });
    }
  );
};

Mahasiswa.remove = (id, result) => {
  sql.query("DELETE FROM Mahasiswas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Mahasiswa with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Mahasiswa with id: ", id);
    result(null, res);
  });
};

module.exports = Mahasiswa;
