import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../../Css/ResetPasswordScreen.css"

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const search = useLocation().search;
  const token = search.split("=")[1]

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/auth/resetpassword?resetPasswordToken=${token}`,
        {
          password,
        }
      );

      setSuccess(data.message);

    } catch (error) {

      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="Inclusive-resetPassword-page">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-form"
      >

        <h3 >Reset Password</h3>

        {error && <div className="error_msg">{error} </div>}

        {success && (
          <div className="success_msg">
            {success} <Link to="/login">Login</Link>
          </div>
        )}

        <div className="input-wrapper">
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmpassword"> Password</label>
        </div>

        <div className="input-wrapper">

          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmpassword">Confirm New Password</label>
        </div>
        <button className="resetPass-btn">
          Reset Password
        </button>

      </form>
    </div>
  );
};

export default ResetPasswordScreen;