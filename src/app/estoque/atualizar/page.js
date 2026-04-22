"use client";
import { useState } from "react";

export default function Estoque() {
  const [estoque, setEstoque] = useState([
    { modelo: "Tucson", quantidade: 3 },
    { modelo: "Creta", quantidade: 5 },
    { modelo: "HB20S", quantidade: 2 },
  ]);

  // Simula cadastro de veículo (aumenta estoque)
  const adicionarVeiculo = (modelo) => {
    const atualizado = estoque.map((item) =>
      item.modelo === modelo
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );

    setEstoque(atualizado);
  };

  // Simula venda (diminui estoque)
  const venderVeiculo = (modelo) => {
    const atualizado = estoque.map((item) =>
      item.modelo === modelo && item.quantidade > 0
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );

    setEstoque(atualizado);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Controle de Estoque</h1>
        <p style={styles.subtitle}>
          Atualização automática ao cadastrar ou vender veículos
        </p>

        <div style={styles.list}>
          {estoque.map((item, index) => (
            <div key={index} style={styles.item}>
              <div>
                <strong>{item.modelo}</strong>
                <p style={styles.qtd}>
                  Quantidade: {item.quantidade}
                </p>
              </div>

              <div style={styles.actions}>
                <button
                  onClick={() => adicionarVeiculo(item.modelo)}
                  style={styles.addButton}
                >
                  + Entrada
                </button>

                <button
                  onClick={() => venderVeiculo(item.modelo)}
                  style={styles.sellButton}
                >
                  - Venda
                </button>
              </div>
            </div>
          ))}
        </div>
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
    maxWidth: "600px",
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
    marginBottom: "20px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  item: {
    background: "#1a1a1a",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #333",
  },

  qtd: {
    color: "#ccc",
    fontSize: "14px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  addButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    cursor: "pointer",
  },

  sellButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
  },
};