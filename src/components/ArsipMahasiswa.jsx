import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/list.css";
import axios from "axios";

function ArsipMahasiswa() {
  const [showEdit, setShowEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [newRecord, setNewRecord] = useState({
    idArsip: "",
    nim: "",
    namaFile: "",
    kategori: "",
    jenis: "",
    tglUpload: "",
  });
  const [editRecordId, setEditRecordId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mahasiswa, setMahasiswa] = useState([]);

  const handleClose = () => {
    setShowEdit(false);
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
    getMahasiswa();
  }, []);

  const handleShow = (isAdding, id = null) => {
    setIsAdding(isAdding);
    setEditRecordId(id);
    setShowEdit(true);

    if (!isAdding && id) {
      const arsipMhsToEdit = platforms.find(
        (platform) => platform.idArsip === id
      );
      if (arsipMhsToEdit) {
        setNewRecord({
          ...newRecord,
          idArsip: arsipMhsToEdit.idArsip,
          nim: arsipMhsToEdit.nim,
          namaFile: arsipMhsToEdit.namaFile,
          kategori: arsipMhsToEdit.kategori,
          jenis: arsipMhsToEdit.jenis,
          tglUpload: arsipMhsToEdit.tglUpload,
        });
      }
    } else {
      const newIdArsip = `ARSIP${(platforms.length + 1)
        .toString()
        .padStart(3, "0")}`;
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        idArsip: newIdArsip,
        nim: "",
        namaFile: "",
        kategori: "",
        jenis: "",
        tglUpload: "",
        file: selectedFile,
      }));
    }
  };

  const getPlatforms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/arsip-mhs");
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlatforms();
    if (editRecordId !== null) {
      axios
        .get(`http://localhost:5000/arsip-mhs/${editRecordId}`)
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
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (let key in newRecord) {
      formData.append(key, newRecord[key]);
    }

    axios
      .post("http://localhost:5000/arsip-mhs", formData)
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
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (let key in newRecord) {
      formData.append(key, newRecord[key]);
    }

    axios
      .patch(`http://localhost:5000/arsip-mhs/${editRecordId}`, formData)
      .then((response) => {
        console.log("Data updated:", response.data);
        getPlatforms();
        handleClose();
      });
  };

  const handleDeletePlatform = (idArsip) => {
    axios
      .delete(`http://localhost:5000/arsip-mhs/${idArsip}`)
      .then((response) => {
        console.log("Data deleted:", response.data);
        getPlatforms();
      });
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setSelectedFile(image);
  };

  return (
    <div className="pt-1">
      <div className="container">
        <div className="p-5 mt-5 rounded card section-padding">
          <div className="row row-cols-2">
            <div className="col mt-2">
              <h2>
                <b style={{ fontFamily: "Dancing Script, cursive" }}>
                  Data Arsip Mahasiswa
                </b>
              </h2>
            </div>
            <div className="col mt-2 mb-4 d-flex justify-content-end">
              <Button variant="success" onClick={() => handleShow(true)}>
                Tambah Arsip
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive text-center">
              <table className="table colors table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Id Arsip</th>
                    <th>Nama</th>
                    <th>Nama File</th>
                    <th>Kategori</th>
                    <th>Jenis</th>
                    <th>Tipe File</th>
                    <th>tgl Upload</th>
                    <th>File</th>
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
                        <td>{platform.idArsip}</td>
                        <td>{platform.namaMahasiswa}</td>
                        <td>{platform.namaFile}</td>
                        <td>{platform.kategori}</td>
                        <td>{platform.jenis}</td>
                        <td>{platform.tipeFile}</td>
                        <td>{platform.tglUpload}</td>
                        <td>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Download
                          </a>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleShow(false, platform.idArsip)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeletePlatform(platform.idArsip)
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
                  {isAdding ? "Add Arsip" : "Edit Arsip"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Id Arsip"
                      name="idArsip"
                      value={newRecord.idArsip || ""}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <select
                      className="form-control"
                      name="nim"
                      value={newRecord.nim || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih NIM</option>
                      {mahasiswa.map((mhs) => (
                        <option key={mhs.nim} value={mhs.nim}>
                          {mhs.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama File"
                      name="namaFile"
                      value={newRecord.namaFile || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Kategori"
                      name="kategori"
                      value={newRecord.kategori || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Jenis"
                      name="jenis"
                      value={newRecord.jenis || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label className="mb-1">Tanggal Upload</label>
                    <input
                      type="date"
                      className="form-control"
                      name="tglUpload"
                      value={newRecord.tglUpload || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={loadImage}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-4"
                    onClick={isAdding ? handleAddPlatform : handleEditPlatform}
                  >
                    {isAdding ? "Add Arsip" : "Save Changes"}
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

export default ArsipMahasiswa;
