import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      if (!usuario.trim() || !password.trim()) {
        setError("Debe ingresar correo y contraseña");
        return;
      }

      const user = await login(usuario.trim(), password);

      localStorage.removeItem("cliente");
      localStorage.removeItem("coach");
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");

      localStorage.setItem("usuario", JSON.stringify(user));

      if (user.token) {
        localStorage.setItem("token", user.token);
      }

      if (user.role === "Admin") {
        navigate("/admin");
        return;
      }

      if (user.role === "Client") {
        localStorage.setItem("cliente", JSON.stringify(user));
        navigate("/perfil");
        return;
      }

      if (user.role === "Coach") {
        localStorage.setItem("coach", JSON.stringify(user));
        navigate("/mis-clientes");
        return;
      }

      navigate("/");
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="login">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <form className="formulario" onSubmit={iniciarSesion}>
          <input
            type="email"
            placeholder="Correo"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-login">{error}</p>}

          <button type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;