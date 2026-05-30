function Login() {
  return (
    <section className="hero">
      <h2>Iniciar sesión</h2>

      <form className="formulario">
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
    </section>
  )
}

export default Login