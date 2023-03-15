import { useState } from "react";
import axios from "axios";
import "../../Css/Login.css"
import { Link, useNavigate } from "react-router-dom";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/auth/login",
        { email, password }
      );
      localStorage.setItem("authToken", data.token);

      setTimeout(() => {

        navigate("/")

      }, 1800)

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4500);

    }
  };

  return (

    <div className="Inclusive-login-page">

      <div className="login-big-wrapper">

        <div className="section-wrapper">

          <div className="top-suggest_register">

            <span>Don't have an account? </span>
            <a href="/register">Sign Up</a>

          </div>

          <div className="top-login-explain">
            <h2>Login to Your Account </h2>

            <p>
              Please Login Your Account, Thank You!
            </p>


          </div>


          <form onSubmit={loginHandler} >
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>

            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="6+ strong character"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password

              </label>
            </div>
            <Link to="/forgotpassword" className="login-screen__forgotpassword"> Forgot Password ?
            </Link>
            <button type="submit" >
              Login
            </button>

          </form>


        </div>

        <div className="login-banner-section ">

          <img src="login.png" alt="banner" width="400px" />
        </div>

      </div>


    </div>


  );
};

export default LoginScreen;