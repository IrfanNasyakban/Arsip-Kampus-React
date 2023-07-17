import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListDosen from './components/ListDosen';
import ListMahasiswa from './components/ListMahasiswa';
import ArsipMahasiswa from './components/ArsipMahasiswa';
import ArsipDosen from './components/ArsipDosen';
import ListJurusan from './components/ListJurusan';
import ListMatkul from './components/ListMatkul';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(
          <>
            <Login/>
          </>
        )} />
        <Route path="/dashboard" element={(
          <>
            <Navbar/>
            <Dashboard/>
            <Footer/>
          </>
        )} />
        <Route path="/dosen" element={(
          <>
            <Navbar/>
            <ListDosen/>
            <Footer/>
          </>
        )} />
        <Route path="/mahasiswa" element={(
          <>
            <Navbar/>
            <ListMahasiswa/>
            <Footer/>
          </>
        )} />
        <Route path="/jurusan" element={(
          <>
            <Navbar/>
            <ListJurusan/>
            <Footer/>
          </>
        )} />
        <Route path="/matkul" element={(
          <>
            <Navbar/>
            <ListMatkul/>
            <Footer/>
          </>
        )} />
        <Route path="/arsip-mhs" element={(
          <>
            <Navbar/>
            <ArsipMahasiswa/>
            <Footer/>
          </>
        )} />
        <Route path="/arsip-dsn" element={(
          <>
            <Navbar/>
            <ArsipDosen/>
            <Footer/>
          </>
        )} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
