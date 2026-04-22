"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ConsultaVeiculos() {
  const [busca, setBusca] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarVeiculos = async () => {
    if (!busca) return;

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("veiculos")
        .select("*")
        .or(
          `modelo.ilike.%${busca}%,chassi.ilike.%${busca}%`
        ); // busca por modelo OU chassi

      if (error) throw error;

      setVeiculos(data);

    } catch (error) {
      alert("Erro ao buscar veículos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Buscar Veículos</h1>

        <div style={styles.form}>
          <input
            placeholder="Digite o modelo ou nº do chassi"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.input}
          />

          <button onClick={buscarVeiculos} style={styles.button}>
            {loading ? "Buscando..." : "Consultar"}
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          {!loading && veiculos.length === 0 && (
            <p style={{ color: "#aaa" }}>Nenhum veículo encontrado</p>
          )}

          {veiculos.map((v) => (
            <div key={v.id} style={styles.cardVeiculo}>
              <p><strong>{v.modelo}</strong></p>
              <p>Cor: {v.cor}</p>
              <p>Chassi: {v.chassi}</p>
              <p>Preço: R$ {v.preco}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0f2c",
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
  form: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
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
  cardVeiculo: {
    background: "#1a1a1a",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "10px",
    border: "1px solid #333",
  },
};