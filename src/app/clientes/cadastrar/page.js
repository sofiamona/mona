"use client";
import { IMaskInput } from "react-imask";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const estadosBrasil = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO"
];

const cidadesPorEstado = {
  CE: ["Fortaleza", "Juazeiro do Norte", "Crato", "Sobral"],
  SP: ["São Paulo", "Campinas", "Santos"],
  RJ: ["Rio de Janeiro", "Niterói"],
};

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
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      ...(name === "estado" && { cidade: "" }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("profiles").insert([
        {
          cpf: form.cpf,
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          rg: form.rg,
          cidade: form.cidade,
          estado: form.estado.toUpperCase(),
          cnh: form.cnh,
        },
      ]);

      if (error) throw error;

      alert("Cadastro realizado com sucesso! 🚗");

      setForm({
        nome: "", email: "", cpf: "", telefone: "",
        rg: "", cidade: "", estado: "", cnh: ""
      });

    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>Cadastro de Cliente</h1>
        <p style={styles.subtitle}>Preencha os dados</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input name="nome" placeholder="Nome completo"
            value={form.nome} onChange={handleChange}
            required style={styles.input} />

          <input name="email" type="email" placeholder="Email"
            value={form.email} onChange={handleChange}
            required style={styles.input} />

          <IMaskInput
            mask="000.000.000-00"
            value={form.cpf}
            onAccept={(value) => setForm({ ...form, cpf: value })}
            placeholder="CPF"
            style={styles.input}
          />

          <IMaskInput
            mask="(00) 00000-0000"
            value={form.telefone}
            onAccept={(value) => setForm({ ...form, telefone: value })}
            placeholder="Telefone"
            style={styles.input}
          />

          <input name="rg" placeholder="RG"
            value={form.rg} onChange={handleChange}
            required style={styles.input} />

          <input name="cnh" placeholder="CNH"
            value={form.cnh} onChange={handleChange}
            required style={styles.input} />

          {/* ESTADO */}
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Selecione o Estado</option>
            {estadosBrasil.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>

          {/* CIDADE */}
         {/* CIDADE (AGORA DIGITÁVEL) */}
<input
  name="cidade"
  placeholder="Digite a cidade"
  value={form.cidade}
  onChange={handleChange}
  required
  disabled={!form.estado}
  style={styles.input}
/>

          <button
            type="submit"
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Processando..." : "Cadastrar"}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
  },
  button: {
    padding: "14px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(90deg, #1419a3, #cc0000)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};