import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("Curr_user");
    navigate("/login")
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-success">
  <div className="container-fluid" style={{ height: "100%" }}>
  <blockquote class="blockquote text-left">
  <Link  className="navbar-brand fs-1 fw-bold text-uppercase text-decoration-none italic" to="/" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>Kanban Board</Link>
  <footer className="blockquote-footer text-black mt-1 mx-4" style={{ fontFamily: 'cursive, sans-serif'}} >Organize, Prioritize, Succeed: <cite title="Source Title">Let Kanban Be Your Guide.</cite></footer>
  </blockquote>
    
    <div  className="collapse navbar-collapse justify-content-end" id="navbarNav">
      { (!localStorage.getItem("Curr_user"))? ""
        : 
        (
          <div className="d-flex align-items-center">
            <p className="text-white mr-4 mb-0">
              {localStorage.getItem("Curr_user")}
            </p>
            <button className="btn btn-outline-light" style={{ marginLeft: "5px" }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )
      } 
        
    </div>
  </div>
</nav>
    </div>
  )
}
