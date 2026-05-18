import { useState } from "react";
import "../styles/clients.css";

const mockCoaches = [
  {
    coachId: 1,
    fullName: "Carlos Mora",
    specialty: "Coaching profesional",
  },
  {
    coachId: 2,
    fullName: "María López",
    specialty: "Liderazgo",
  },
];

function ClientsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    goal: "",
    coachId: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.goal.trim() ||
      !formData.coachId
    ) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Ingrese un correo electrónico válido.");
      return;
    }

    const clientToCreate = {
      fullName: formData.fullName,
      email: formData.email,
      goal: formData.goal,
      coachId: Number(formData.coachId),
    };

    console.log("Cliente registrado:", clientToCreate);

    setSuccessMessage("Cliente registrado correctamente.");

    setFormData({
      fullName: "",
      email: "",
      goal: "",
      coachId: "",
    });
  }

  return (
    <main className="clients-page">
      <section className="clients-card">
        <h1>Registrar cliente</h1>
        <p className="clients-description">
          Cree un nuevo cliente y asígnelo a un coach.
        </p>

        {errorMessage && <div className="alert error">{errorMessage}</div>}
        {successMessage && <div className="alert success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="clients-form">
          <label>
            Nombre completo
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ingrese el nombre completo del cliente"
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="cliente@email.com"
            />
          </label>

          <label>
            Objetivo
            <textarea
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="Ingrese el objetivo del cliente"
              rows="4"
            />
          </label>

          <label>
            Coach
            <select
              name="coachId"
              value={formData.coachId}
              onChange={handleChange}
            >
              <option value="">Seleccione un coach</option>
              {mockCoaches.map((coach) => (
                <option key={coach.coachId} value={coach.coachId}>
                  {coach.fullName} - {coach.specialty}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Registrar cliente</button>
        </form>
      </section>
    </main>
  );
}

export default ClientsPage;