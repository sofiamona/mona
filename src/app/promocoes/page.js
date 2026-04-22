"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ConsultaPromocoes() {
  const [promocoes, setPromocoes] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  // Buscar promoções ativas ao entrar na tela
  useEffect(() => {
    buscarPromocoes();
  }, []);

  const buscarPromocoes = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("promocoes")
        .select("*")
        .eq("ativa", true); // só promoções ativas

      if (error) throw error;

      setPromocoes(data);

    } catch (error) {
      alert("Erro ao buscar promoções: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtro de busca
  const promocoesFiltradas = promocoes.filter((promo) =>
    promo.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Promoções Ativas</h1>

        <input
          placeholder="Pesquisar promoção..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={styles.input}
        />

        <div style={{ marginTop: "20px" }}>
          {loading && <p style={{ color: "#aaa" }}>Carregando...</p>}

          {!loading && promocoesFiltradas.length === 0 && (
            <p style={{ color: "#aaa" }}>Nenhuma promoção encontrada</p>
          )}

          {promocoesFiltradas.map((promo) => (
            <div key={promo.id} style={styles.cardPromo}>
              <p><strong>{promo.nome}</strong></p>
              <p>{promo.descricao}</p>
              <p>Desconto: {promo.desconto}%</p>
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
    background: "#0a0f2c", // azul escuro
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
  input: {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
    width: "100%",
  },
  cardPromo: {
    background: "#1a1a1a",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "10px",
    border: "1px solid #333",
  },
};