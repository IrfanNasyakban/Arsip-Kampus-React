import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/navbar.css"

function Navbar() {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav class="navbar navbar-expand-lg bg-primary">
      {/* <!-- Container wrapper --> */}
      <div class="container">
        {/* <!-- Toggle button --> */}
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        {/* <!-- Collapsible wrapper --> */}
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <!-- Navbar brand --> */}
          <a class="navbar-brand mt-2 mt-lg-0" href="#home">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          {/* <!-- Left links --> */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-putih" href="#s">
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-putih" href="/dosen">
                Dosen
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-putih" href="/mahasiswa">
                Mahasiswa
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-putih" href="/jurusan">
                Jurusan
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-putih" href="/matkul">
                Matkul
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-putih" href="/arsip-mhs">
                Arsip Mahasiswa
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-putih" href="/arsip-dsn">
                Arsip Dosen
              </a>
            </li>
          </ul>
          {/* <!-- Left links --> */}
        </div>
        {/* <!-- Collapsible wrapper --> */}

        {/* <!-- Right elements --> */}
        <div class="d-flex align-items-center">
          {/* <!-- Icon --> */}
          <a class="link-secondary me-3" href="#s">
            <i class="fas fa-shopping-cart"></i>
          </a>
          {/* <!-- Avatar --> */}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-avatar">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="30"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* <!-- Right elements --> */}
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>
  );
}

export default Navbar;
