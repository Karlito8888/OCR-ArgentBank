import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authActions";
import "./style.scss";

const LoginPage = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Récupérer les informations de l'utilisateur stockées dans localStorage s'il existe
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
    }

    if (userInfo) {
      navigate("/user");
    }
  }, [navigate, userInfo, setValue]);

  const submitForm = (data) => {
    // Si la case "Remember Me" est cochée, stocker les informations dans localStorage
    if (data.rememberMe) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
    } else {
      // Si la case n'est pas cochée, s'assurer de nettoyer le localStorage
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    // Dispatch de l'action de login
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
            <input
              type="checkbox"
              id="remember-me"
              {...register("rememberMe")}
            />
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

export default LoginPage;
