import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/list.css";
import axios from "axios";

function ListJurusan() {
  const [showEdit, setShowEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [newRecord, setNewRecord] = useState({
    idJurusan: "",
    namaJurusan: "",
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
      const jurusanToEdit = platforms.find((platform) => platform.idJurusan === id);
      if (jurusanToEdit) {
        setNewRecord({
          ...newRecord,
          idJurusan: jurusanToEdit.idJurusan,
          namaJurusan: jurusanToEdit.namaJurusan
        });
      }
    } else {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        idJurusan: "",
        namaJurusan: ""
      }));
    }
  };

  const getPlatforms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jurusan");
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlatforms();
    if (editRecordId !== null) {
      axios
        .get(`http://localhost:5000/jurusan/${editRecordId}`)
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
      .post("http://localhost:5000/jurusan", newRecord)
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
      .patch(`http://localhost:5000/jurusan/${editRecordId}`, newRecord)
      .then((response) => {
        console.log("Data updated:", response.data);
        getPlatforms();
        handleClose();
      });
  };

  const handleDeletePlatform = (idJurusan) => {
    axios.delete(`http://localhost:5000/jurusan/${idJurusan}`).then((response) => {
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
                  Data Jurusan
                </b>
              </h2>
            </div>
            <div className="col mt-2 mb-4 d-flex justify-content-end">
              <Button variant="success" onClick={() => handleShow(true)}>
                Tambah Jurusan
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive text-center">
              <table className="table colors table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Id Jurusan</th>
                    <th>Nama Jurusan</th>
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
                        <td>{platform.idJurusan}</td>
                        <td>{platform.namaJurusan}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleShow(false, platform.idJurusan)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeletePlatform(platform.idJurusan)
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
                  {isAdding ? "Add Jurusan" : "Edit Jurusan"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Id Jurusan"
                      name="idJurusan"
                      value={newRecord.idJurusan || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Jurusan"
                      name="namaJurusan"
                      value={newRecord.namaJurusan || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-4"
                    onClick={isAdding ? handleAddPlatform : handleEditPlatform}
                  >
                    {isAdding ? "Add Jurusan" : "Save Changes"}
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

export default ListJurusan;
