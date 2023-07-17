import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/list.css";
import axios from "axios";

function ListDosen() {
  const [showEdit, setShowEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [newRecord, setNewRecord] = useState({
    idDosen: "",
    nama: "",
    nip: "",
    alamat: "",
    gender: "",
    email: "",
    noHp: "",
  });
  const [editRecordId, setEditRecordId] = useState(null);

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShow = (isAdding, id = null) => {
    setIsAdding(isAdding);
    setEditRecordId(id);
    setShowEdit(true);

    if (!isAdding && id) {
      const dosenToEdit = platforms.find((platform) => platform.idDosen === id);
      if (dosenToEdit) {
        setNewRecord({
          ...newRecord,
          idDosen: dosenToEdit.idDosen,
          nama: dosenToEdit.nama,
          nip: dosenToEdit.nip,
          alamat: dosenToEdit.alamat,
          gender: dosenToEdit.gender,
          email: dosenToEdit.email,
          noHp: dosenToEdit.noHp,
        });
      }
    } else {
      const newIdDosen = `DSN${(platforms.length + 1)
        .toString()
        .padStart(3, "0")}`;
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        idDosen: newIdDosen,
        nama: "",
        nip: "",
        alamat: "",
        gender: "",
        email: "",
        noHp: "",
      }));
    }
  };

  const getPlatforms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlatforms();
    if (editRecordId !== null) {
      axios
        .get(`http://localhost:5000/dosen/${editRecordId}`)
        .then((response) => {
          setNewRecord(response.data);
        })
        .catch((error) => {
          console.error("Error fetching record:", error);
        });
    }
  }, [editRecordId]);

  const handleInputChange = (e) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPlatform = () => {
    axios
      .post("http://localhost:5000/dosen", newRecord)
      .then((response) => {
        console.log("Data added:", response.data);
        getPlatforms();
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  const handleEditPlatform = () => {
    axios
      .patch(`http://localhost:5000/dosen/${editRecordId}`, newRecord)
      .then((response) => {
        console.log("Data updated:", response.data);
        getPlatforms();
        handleClose();
      });
  };

  const handleDeletePlatform = (idDosen) => {
    axios.delete(`http://localhost:5000/dosen/${idDosen}`).then((response) => {
      console.log("Data deleted:", response.data);
      getPlatforms();
    });
  };

  return (
    <div className="pt-1">
      <div className="container">
        <div className="p-5 mt-5 rounded card section-padding">
          <div className="row row-cols-2">
            <div className="col mt-2">
              <h2>
                <b style={{ fontFamily: "Dancing Script, cursive" }}>
                  Data Dosen
                </b>
              </h2>
            </div>
            <div className="col mt-2 mb-4 d-flex justify-content-end">
              <Button variant="success" onClick={() => handleShow(true)}>
                Tambah Dosen
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive text-center">
              <table className="table colors table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Id Dosen</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Alamat</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>No Hp</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        Tidak terdapat data Platform yang tersimpan
                      </td>
                    </tr>
                  ) : (
                    platforms.map((platform, index) => (
                      <tr key={platform.id}>
                        <td>{index + 1}</td>
                        <td>{platform.idDosen}</td>
                        <td>{platform.nama}</td>
                        <td>{platform.nip}</td>
                        <td>{platform.alamat}</td>
                        <td>{platform.gender}</td>
                        <td>{platform.email}</td>
                        <td>{platform.noHp}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleShow(false, platform.idDosen)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeletePlatform(platform.idDosen)
                            }
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* <!--- Model Box ---> */}
          <div className="model_box">
            <Modal
              show={showEdit}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {isAdding ? "Add Dosen" : "Edit Dosen"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Id Dosen"
                      name="idDosen"
                      value={newRecord.idDosen || ""}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama"
                      name="nama"
                      value={newRecord.nama || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nip"
                      name="nip"
                      value={newRecord.nip || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Alamat"
                      name="alamat"
                      value={newRecord.alamat || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <select
                      className="form-control"
                      name="gender"
                      value={newRecord.gender || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih Gender</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={newRecord.email || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="No Hp"
                      name="noHp"
                      value={newRecord.noHp || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-4"
                    onClick={isAdding ? handleAddPlatform : handleEditPlatform}
                  >
                    {isAdding ? "Add Dosen" : "Save Changes"}
                  </button>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Model Box Finsihs */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListDosen;
