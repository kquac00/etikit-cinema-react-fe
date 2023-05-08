import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "../SearchNav.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';


export default function Navbar({ placeholder, data }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchMovie = event.target.value;
    setWordEntered(searchMovie)
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchMovie.toLowerCase());
    });
    if (searchMovie === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([])
    setWordEntered("")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h1 className="text-primary text-opacity-50">Etikit Cinema</h1>
          </Link>

          {/* ================================Search Bar================================= */}
          <Container className="mt-5">
            <Row>
              <Col sm={4}>
                <div className="form-inline ml-auto">
                  <div className="searchInputs">
                    <input className="form-control mr-sm-2" type="text"
                      placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
                    <div className="searchIcon">
                      {filteredData.length === 0 ? <SearchIcon /> :
                        <CloseIcon id="clearButton" onClick={clearInput} />}
                    </div>
                  </div>
                  {
                    filteredData.length !== 0 && (
                      <div className="dataResult">
                        {
                          filteredData.slice(0, 10).map((value, key) => {
                            return <a className="dataItem"
                              href={`/viewmovie/${value.id}`}>
                              <p>{value.title}</p>
                            </a>
                          })
                        }
                      </div>
                    )}
                </div>
              </Col>
            </Row>
          </Container>
          {/* =============================Home button====================== */}
          <Link className="btn btn-primary" to="/">
            Home
          </Link>
          {/* ================================Link to Purchase=========================== */}
          <Link className="btn btn-warning" to="/food">
            Concession
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* =============================Link to Register/login =========================  */}
          <Link className="btn btn-primary" to="/adduser">
            Register/Login
          </Link>
        </div>
      </nav>
    </div>
  );
}
