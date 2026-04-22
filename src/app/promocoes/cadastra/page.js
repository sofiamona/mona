"use client";
import { useState } from "react";

export default function Promocoes() {
  const [busca, setBusca] = useState("");
  const [veiculo, setVeiculo] = useState(null);
  const [promocao, setPromocao] = useState({
    desconto: "",
    dataLimite: "",
  });

  // Simula busca de veículo
  const buscarVeiculo = () => {
    const veiculoFake = {
      modelo: "Creta",
      fabricante: "Hyundai",
      preco: "100000",
    };

    setVeiculo(veiculoFake);
  };

  const handleChange = (e) => {
    setPromocao({
      ...promocao,
      [e.target.name]: e.target.value,
    });
  };

  const salvar = () => {
    console.log("Promoção cadastrada:", {
      veiculo,
      ...promocao,
    });

    alert("Promoção cadastrada com sucesso! 🎉");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastrar Promoção</h1>
        <p style={styles.subtitle}>Busque um veículo e aplique desconto</p>

        {/* BUSCA */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar veículo"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.input}
          />

          <button onClick={buscarVeiculo} style={styles.button}>
            Buscar
          </button>
        </div>

        {/* VEÍCULO ENCONTRADO */}
        {veiculo && (
          <div style={styles.form}>
            <h2 style={styles.subtitle}>Veículo Selecionado</h2>

            <div style={styles.infoBox}>
              <p><strong>Modelo:</strong> {veiculo.modelo}</p>
              <p><strong>Fabricante:</strong> {veiculo.fabricante}</p>
              <p><strong>Preço:</strong> R$ {veiculo.preco}</p>
            </div>

            <input
              type="number"
              name="desconto"
              placeholder="Desconto (%)"
              value={promocao.desconto}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="date"
              name="dataLimite"
              value={promocao.dataLimite}
              onChange={handleChange}
              style={styles.input}
            />

            <button onClick={salvar} style={styles.button}>
              Salvar Promoção
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== ESTILO PADRÃO ===== */

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

  infoBox: {
    background: "#1a1a1a",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #333",
    color: "#ccc",
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