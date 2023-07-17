import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/list.css";
import axios from "axios";

function ListMatkul() {
  const [showEdit, setShowEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [newRecord, setNewRecord] = useState({
    idMatkul: "",
    namaMatkul: "",
    sks: "",
    semester: "",
    nim: "",
    idDosen: "",
  });
  const [editRecordId, setEditRecordId] = useState(null);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShow = (isAdding, id = null) => {
    setIsAdding(isAdding);
    setEditRecordId(id);
    setShowEdit(true);

    if (!isAdding && id) {
      const matkulToEdit = platforms.find(
        (platform) => platform.idMatkul === id
      );
      if (matkulToEdit) {
        setNewRecord({
          ...newRecord,
          idMatkul: matkulToEdit.idMatkul,
          namaMatkul: matkulToEdit.namaMatkul,
          sks: matkulToEdit.sks,
          semester: matkulToEdit.semester,
          nim: matkulToEdit.nim,
          idDosen: matkulToEdit.idDosen,
        });
      }
    } else {
      const newIdMatkul = `MK${(platforms.length + 1)
        .toString()
        .padStart(3, "0")}`;
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        idMatkul: newIdMatkul,
        namaMatkul: "",
        sks: "",
        semester: "",
        nim: "",
        idDosen: "",
      }));
    }
  };

  const getPlatforms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/matkul");
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlatforms();
    if (editRecordId !== null) {
      axios
        .get(`http://localhost:5000/matkul/${editRecordId}`)
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
      .post("http://localhost:5000/matkul", newRecord)
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
      .patch(`http://localhost:5000/matkul/${editRecordId}`, newRecord)
      .then((response) => {
        console.log("Data updated:", response.data);
        getPlatforms();
        handleClose();
      });
  };

  const handleDeletePlatform = (idMatkul) => {
    axios
      .delete(`http://localhost:5000/matkul/${idMatkul}`)
      .then((response) => {
        console.log("Data deleted:", response.data);
        getPlatforms();
      });
  };

  const getDosen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setDosen(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getMahasiswa = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mahasiswa");
      setMahasiswa(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDosen();
    getMahasiswa();
  }, []);

  return (
    <div className="pt-1">
      <div className="container">
        <div className="p-5 mt-5 rounded card section-padding">
          <div className="row row-cols-2">
            <div className="col mt-2">
              <h2>
                <b style={{ fontFamily: "Dancing Script, cursive" }}>
                  Data Matkul
                </b>
              </h2>
            </div>
            <div className="col mt-2 mb-4 d-flex justify-content-end">
              <Button variant="success" onClick={() => handleShow(true)}>
                Tambah Matkul
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive text-center">
              <table className="table colors table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Id Matkul</th>
                    <th>Nama Matkul</th>
                    <th>SKS</th>
                    <th>Semester</th>
                    <th>Nama Mahasiswa</th>
                    <th>Nama Dosen</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.length === 0 ? (
                    <tr>
                      <td colSpan="10">
                        Tidak terdapat data Platform yang tersimpan
                      </td>
                    </tr>
                  ) : (
                    platforms.map((platform, index) => (
                      <tr key={platform.id}>
                        <td>{index + 1}</td>
                        <td>{platform.idMatkul}</td>
                        <td>{platform.namaMatkul}</td>
                        <td>{platform.sks}</td>
                        <td>{platform.semester}</td>
                        <td>{platform.namaMahasiswa}</td>
                        <td>{platform.namaDosen}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleShow(false, platform.idMatkul)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeletePlatform(platform.idMatkul)
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
                  {isAdding ? "Add Matkul" : "Edit Matkul"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Id Matkul"
                      name="idMatkul"
                      value={newRecord.idMatkul || ""}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Matkul"
                      name="namaMatkul"
                      value={newRecord.namaMatkul || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="SKS"
                      name="sks"
                      value={newRecord.sks || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Semester"
                      name="semester"
                      value={newRecord.semester || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <select
                      className="form-control"
                      name="nim"
                      value={newRecord.nim || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih Mahasiswa</option>
                      {mahasiswa.map((mahasiswa) => (
                        <option
                          key={mahasiswa.nim}
                          value={mahasiswa.nim}
                        >
                          {mahasiswa.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mt-3">
                    <select
                      className="form-control"
                      name="idDosen"
                      value={newRecord.idDosen || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih Dosen</option>
                      {dosen.map((dosen) => (
                        <option key={dosen.idDosen} value={dosen.idDosen}>
                          {dosen.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-4"
                    onClick={isAdding ? handleAddPlatform : handleEditPlatform}
                  >
                    {isAdding ? "Add Matkul" : "Save Changes"}
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

export default ListMatkul;
