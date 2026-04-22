"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ConsultaCliente() {
  const [nomeBusca, setNomeBusca] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarClientes = async () => {
    if (!nomeBusca) return;

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .ilike("nome", `%${nomeBusca}%`); // busca parcial

      if (error) throw error;

      setClientes(data);

    } catch (error) {
      alert("Erro ao buscar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>Consultar Cliente</h1>

        <div style={styles.form}>
          <input
            placeholder="Digite o nome do cliente"
            value={nomeBusca}
            onChange={(e) => setNomeBusca(e.target.value)}
            style={styles.input}
          />

          <button onClick={buscarClientes} style={styles.button}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          {clientes.length === 0 && !loading && (
            <p style={{ color: "#aaa" }}>Nenhum cliente encontrado</p>
          )}

          {clientes.map((cliente) => (
            <div key={cliente.id} style={styles.cardCliente}>
              <p><strong>{cliente.nome}</strong></p>
              <p>{cliente.email}</p>

              <div style={styles.actions}>
                <button
                  onClick={() => alert("Alterar cliente " + cliente.nome)}
                  style={styles.btnSmall}
                >
                  Alterar
                </button>

                <button
                  onClick={() => alert("Associar à venda " + cliente.nome)}
                  style={styles.btnSmall}
                >
                  Associar Venda
                </button>
              </div>
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
  cardCliente: {
    background: "#1a1a1a",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "10px",
    border: "1px solid #333",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  btnSmall: {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#071c92",
    color: "#fff",
    cursor: "pointer",
  },
};