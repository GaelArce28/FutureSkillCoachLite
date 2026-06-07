import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const respuesta = await fetch("https://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      });

      if (!respuesta.ok) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      const datos = await respuesta.json();

      localStorage.setItem("token", datos.token);

      
      localStorage.setItem("usuario", JSON.stringify(datos.user));

   
      navigate("/perfil");
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <section className="login">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <form className="formulario" onSubmit={iniciarSesion}>
          <input
            type="text"
            placeholder="Usuario"
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

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </section>
  );
}

export default Login;