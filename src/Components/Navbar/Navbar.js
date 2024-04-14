
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Curr_user");
    navigate("/login");
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <blockquote className="blockquote text-left">
          <Link className="navbar-brand fs-1 fw-bold text-uppercase text-decoration-none italic" to="/" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>Kanban Board</Link>
          <footer className="blockquote-footer text-black mt-1 mx-4" style={{ fontFamily: 'cursive, sans-serif' }}>Organize, Prioritize, Succeed: <cite title="Source Title">Let Kanban Be Your Guide.</cite></footer>
        </blockquote>

        <div className="d-flex flex-column flex-lg-row align-items-lg-center">
          <div className="d-flex justify-content-between align-items-center w-100">
            <p className="text-white me-5 mb-2 mb-lg-0">
              <h5 className="mb-0">Username: </h5><h6 className="mb-0">{localStorage.getItem("Curr_user")}</h6>
            </p>
            <button className="btn btn-outline-light mt-2 mt-lg-0 justify-content-end" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
