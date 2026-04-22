"use client";
import { useState } from "react";

export default function CadastroVeiculo() {
  const [form, setForm] = useState({
    modelo: "",
    fabricante: "",
    cor: "",
    ano: "",
    preco: "",
    chassi: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Veículo cadastrado:", form);
    alert("Veículo cadastrado com sucesso! 🚗");

    setForm({
      modelo: "",
      fabricante: "",
      cor: "",
      ano: "",
      preco: "",
      chassi: "",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastro de Veículos</h1>
        <p style={styles.subtitle}>Preencha os dados do veículo</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="modelo"
            placeholder="Modelo do veículo"
            value={form.modelo}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="fabricante"
            placeholder="Fabricante"
            value={form.fabricante}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="cor"
            placeholder="Cor"
            value={form.cor}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="ano"
            placeholder="Ano"
            type="number"
            value={form.ano}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="preco"
            placeholder="Preço (R$)"
            type="number"
            value={form.preco}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="chassi"
            placeholder="Número do chassi"
            value={form.chassi}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Salvar Veículo
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f2c, #020617)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#111",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0 0 30px rgba(255,0,0,0.2)",
    border: "1px solid #071c92",
  },

  title: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "20px",
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
    background: "linear-gradient(90deg, #1419a3, #cc0000)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
};