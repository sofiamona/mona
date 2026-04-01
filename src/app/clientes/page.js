"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Certifique-se de que o caminho está correto

export default function CadastroCliente() {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // O objeto dentro do .insert() deve bater com as colunas da tabela 'profiles'
      const { error } = await supabase
        .from("profiles")
        .insert([
          {
            cpf: form.cpf,
            nome: form.nome,
            email: form.email,
            telefone: form.telefone,
            rg: form.rg,
            cidade: form.cidade,
            estado: form.estado.toUpperCase(), // Garante que o estado tenha 2 letras maiúsculas
            cnh: form.cnh,
          },
        ]);

      if (error) throw error;

      alert("Cadastro realizado com sucesso! 🚗");
      
      // Limpa o formulário após o sucesso
      setForm({
        nome: "", email: "", cpf: "", telefone: "",
        rg: "", cidade: "", estado: "", cnh: ""
      });

    } catch (error) {
      console.error("Erro ao salvar:", error.message);
      alert("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>Cadastro de Cliente</h1>
        <p style={styles.subtitle}>Preencha os dados para a tabela Profiles</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { name: "nome", placeholder: "Nome completo" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "cpf", placeholder: "CPF (apenas números)", maxLength: 11 },
            { name: "telefone", placeholder: "Telefone" },
            { name: "rg", placeholder: "RG" },
            { name: "cidade", placeholder: "Cidade" },
            { name: "estado", placeholder: "Estado (Ex: SP)", maxLength: 2 },
            { name: "cnh", placeholder: "CNH" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              maxLength={field.maxLength}
              required
              disabled={loading}
              style={styles.input}
            />
          ))}

          <button 
            type="submit" 
            style={{...styles.button, opacity: loading ? 0.7 : 1}} 
            disabled={loading}
          >
            {loading ? "Processando..." : "Cadastrar no Banco"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/logo.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
  },
  card: {
    position: "relative",
    zIndex: 2,
    background: "#111",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 0 30px rgba(255,0,0,0.2)",
    border: "1px solid #071c92",
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
    background: "linear-gradient(90deg, #1419a3, #cc0000)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};