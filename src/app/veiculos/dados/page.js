"use client";
import { useState } from "react";

export default function AlterarVeiculo() {
  const [busca, setBusca] = useState("");
  const [veiculo, setVeiculo] = useState(null);

  // Simulação de busca
  const buscarVeiculo = () => {
    const veiculoFake = {
      modelo: "Tucson",
      fabricante: "Hyundai",
      cor: "Preto",
      ano: "2022",
      preco: "120000",
      chassi: "9BWZZZ377VT004251",
    };

    setVeiculo(veiculoFake);
  };

  const handleChange = (e) => {
    setVeiculo({
      ...veiculo,
      [e.target.name]: e.target.value,
    });
  };

  const salvar = () => {
    console.log("Veículo atualizado:", veiculo);
    alert("Veículo atualizado com sucesso! 🚗");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Alterar Veículo</h1>
        <p style={styles.subtitle}>Busque e edite os dados</p>

        {/* BUSCA */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar veículo (modelo ou chassi)"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.input}
          />

          <button onClick={buscarVeiculo} style={styles.button}>
            Buscar
          </button>
        </div>

        {/* EDIÇÃO */}
        {veiculo && (
          <div style={styles.form}>
            <h2 style={styles.subtitle}>Editar Dados</h2>

            <input
              name="modelo"
              value={veiculo.modelo}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="fabricante"
              value={veiculo.fabricante}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="cor"
              value={veiculo.cor}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="ano"
              type="number"
              value={veiculo.ano}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="preco"
              type="number"
              value={veiculo.preco}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="chassi"
              value={veiculo.chassi}
              onChange={handleChange}
              style={styles.input}
            />

            <button onClick={salvar} style={styles.button}>
              Salvar Alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== ESTILO PADRÃO DO SISTEMA ===== */

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
    textAlign: "center",
    marginBottom: "15px",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
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
  },

  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(90deg, #1419a3, #cc0000)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};