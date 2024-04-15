
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Curr_user");
    navigate("/login");
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-success container-fluid">
      <div className="container-fluid">
        <blockquote className="blockquote text-left">
          <Link className="navbar-brand fs-1 fw-bold text-uppercase text-decoration-none italic" to="/" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>Kanban Board</Link>
          <footer className="blockquote-footer text-black mt-1 mx-4" style={{ fontFamily: 'cursive, sans-serif' }}>Organize, Prioritize, Succeed: <cite title="Source Title">Let Kanban Be Your Guide.</cite></footer>
        </blockquote>

        <div className="d-flex flex-column flex-lg-row align-items-lg-center w-100">
          <div className="d-flex justify-content-end align-items-center w-100"  style={{gap: "2"}}>
            <p className="text-white me-3 mb-2 mb-lg-0">
              <h5 className="mb-0">Username: </h5><h6 className="mb-0">{localStorage.getItem("Curr_user")}</h6>
            </p>
            <div className='logout_button'>
            <button className="btn btn-outline-dark  mt-2 mt-lg-0 fw-bold" onClick={handleLogout}>
              Logout
            </button>
            </div>
            
          </div>
        </div>
      
      </div>
    </div>
  );
}
