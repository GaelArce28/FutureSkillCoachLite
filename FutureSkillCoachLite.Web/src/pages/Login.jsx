import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../api/clientApi";

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
        setError("Debe ingresar usuario y contraseña");
        setCargando(false);
        return;
      }

      const clientes = await getClients();

      const clienteEncontrado = clientes.find(
        (cliente) =>
          cliente.email &&
          cliente.email.toLowerCase() === usuario.trim().toLowerCase()
      );

      if (!clienteEncontrado) {
        setError("No existe un cliente con ese correo");
        setCargando(false);
        return;
      }

      localStorage.setItem("cliente", JSON.stringify(clienteEncontrado));
      localStorage.setItem("usuario", JSON.stringify(clienteEncontrado));

      navigate("/perfil");
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el backend");
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
            type="text"
            placeholder="Correo del cliente"
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