"use client";

import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    rg: "",
    pis: "",
    endereco: "",
    login: "",
    senha: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(form);
    alert("Funcionário cadastrado com sucesso!");
  }

  return (
    <div style={container}>
      <div style={card}>
        
        {/* LOGO */}
        <img src="/logo.png" alt="Logo MONA" style={logo} />

        <h1 style={title}>Cadastro de Funcionário</h1>
        <p style={subtitle}>Preencha os dados para prosseguir</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input name="nome" placeholder="Nome completo" onChange={handleChange} style={input} />
          <input name="email" placeholder="Email" onChange={handleChange} style={input} />
          <input name="cpf" placeholder="CPF" onChange={handleChange} style={input} />
          <input name="telefone" placeholder="Telefone" onChange={handleChange} style={input} />
          <input name="rg" placeholder="RG" onChange={handleChange} style={input} />
          <input name="pis" placeholder="Número do PIS" onChange={handleChange} style={input} />
          <input name="endereco" placeholder="Endereço completo" onChange={handleChange} style={input} />
          <input name="login" placeholder="Login" onChange={handleChange} style={input} />
          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} style={input} />

          <button type="submit" style={button}>
            Salvar Funcionário
          </button>
        </form>

      </div>
    </div>
  );
}

/* ===== ESTILOS ===== */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f172a",
};

const card = {
  background: "#111",
  padding: "30px",
  borderRadius: "12px",
  width: "380px",
  textAlign: "center",
};

const logo = {
  width: "90px",
  marginBottom: "10px",
};

const title = {
  color: "#fff",
  marginBottom: "5px",
};

const subtitle = {
  color: "#aaa",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#000",
  color: "#fff",
};

const button = {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  background: "#dc2626",
  color: "#fff",
  cursor: "pointer",
};