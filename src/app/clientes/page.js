

"use client";
import { useState } from "react";

export default function CadastroCliente() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    rg: "",
    cidade: "",
    estado: "",
    cnh: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Cliente cadastrado com sucesso 🚗");
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>Cadastro de Cliente</h1>
        <p style={styles.subtitle}>Preencha os dados para prosseguir</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { name: "nome", placeholder: "Nome completo" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "cpf", placeholder: "CPF" },
            { name: "telefone", placeholder: "Telefone" },
            { name: "rg", placeholder: "RG" },
            { name: "cidade", placeholder: "Cidade" },
            { name: "estado", placeholder: "Estado" },
            { name: "cnh", placeholder: "CNH" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          ))}

          <button type="submit" style={styles.button}>
            Cadastrar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
  "url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
  },

  card: {
    position: "relative",
    zIndex: 2,
    background: "#111",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 0 30px rgba(255,0,0,0.3)",
    border: "1px solid #222",
  },

  title: {
    color: "#fff",
    marginBottom: "5px",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "20px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(90deg, #ff0000, #cc0000)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};
      