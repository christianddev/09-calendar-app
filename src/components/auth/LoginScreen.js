import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [{ lEmail, lPassword }, handleLoginInputChange] = useForm({
    lEmail: "1@email.com",
    lPassword: "123123",
  });

  const [{ rName, rEmail, rPassword, rPassword2 }, handleRegisterInputChange] =
    useForm({
      rName: "lol",
      rEmail: "1@email.com",
      rPassword: "123123",
      rPassword2: "123123",
    });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (rPassword !== rPassword2) {
      Swal.fire("Error", "Check passwords", "error");
      return;
    }

    dispatch(startRegister(rName, rEmail, rPassword));
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Log in</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                name="lEmail"
                className="form-control"
                placeholder="Email"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="lPassword"
                className="form-control"
                placeholder="Password"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                name="rName"
                className="form-control"
                placeholder="Name"
                value={rName}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="rEmail"
                className="form-control"
                placeholder="Email"
                value={rEmail}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="rPassword"
                className="form-control"
                placeholder="Password"
                value={rPassword}
                onChange={handleRegisterInputChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="rPassword2"
                className="form-control"
                placeholder="Repeat password"
                value={rPassword2}
                onChange={handleRegisterInputChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
