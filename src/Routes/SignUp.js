import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
const bcrypt = require("bcryptjs");
const validate = require("validate.js");

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const constraints = {
    name: {
      presence: { allowEmpty: false },
      length: {
        minimum: 3,
        message: "must be at least 3 characters",
      },
    },
    email: {
      presence: { allowEmpty: false },
      email: true,
    },
    password: {
      presence: { allowEmpty: false },
      length: {
        minimum: 6,
        message: "must be at least 6 characters",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate({ name, email, password }, constraints);
    if (validationErrors) {
      const errorMessages = Object.values(validationErrors).flat();
      swal(errorMessages.join("\n"), "error", "error");
      return;
    }

    if (!isChecked) {
      alert("Please agree to the terms of service to submit the form.");
      return; // Exit the function if not checked
    }

    if (password !== confirmPassword) {
      swal("password does not match", "error", "error");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);
  
      let userRecords = JSON.parse(localStorage.getItem("users")) || [];
  
      if (userRecords.some((v) => v.email === email)) {
        swal("Duplicate email address", "error", "error");
        return;
      }
  
      userRecords.push({
        name: name,
        email: email,
        password: secPassword,
      });
      await localStorage.setItem("users", JSON.stringify(userRecords));
      swal("Registration Successful", "success", "success");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      swal("Registration failed", "error", "error");
    }
  };

  return (
    <section
      className="vh-100"
      style={{ backgroundColor: "#333", color: "#fff" }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="name">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="email">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Confirm your password
                          </label>
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree to all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                        >
                          Register
                        </button>

                        <Link to="/login" className="m-3 btn btn-danger btn-sm">
                          Already a user?
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
