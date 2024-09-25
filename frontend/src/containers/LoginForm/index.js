import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../redux/authActions";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/user");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} size="lg" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input type="email" id="email" {...register("email")} required />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </div>
  );
};

export default LoginForm;

