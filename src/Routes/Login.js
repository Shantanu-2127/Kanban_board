import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import bcrypt from "bcryptjs";
const validate = require("validate.js");

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const constraints = {
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

    const validationErrors = validate({ email, password }, constraints);
    if (validationErrors) {
      const errorMessages = Object.values(validationErrors).flat();
      swal(errorMessages.join("\n"), "error", "error");
      return;
    }

    try {
      const userRecords = JSON.parse(localStorage.getItem("users")) || [];

      const user = userRecords.find((u) => u.email === email);



      if (!user) {
        swal("Invalid email or password", "error", "error");
        return;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        swal("Login Successful", "success", "success");
        localStorage.setItem("Curr_user", user.email)
        navigate("/");

      } else {
        swal("Invalid email or password", "error", "error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <h5
                        className="fw-bold mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Login into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          name="email"
                          value={email}
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          name="password"
                          value={password}
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="#!" style={{ color: "#393f81" }}>
                          <Link to="/signup">Register here</Link>
                        </a>
                      </p>
                    </form>
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
