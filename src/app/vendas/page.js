"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FecharVenda() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    cpf: "",
    cliente: "",
    carro: "",
    preco: "",
    desconto: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const buscarCliente = async () => {
    if (!form.cpf) return alert("Digite o CPF");

    const { data, error } = await supabase
      .from("profiles")
      .select("nome")
      .eq("cpf", form.cpf)
      .single();

    if (error || !data) {
      alert("Cliente não encontrado!");
      return;
    }

    setForm((prev) => ({
      ...prev,
      cliente: data.nome,
    }));
  };

  
  const calcularVenda = () => {
    const preco = parseFloat(form.preco);
    const desconto = parseFloat(form.desconto) || 0;

    if (!preco) return alert("Informe o preço");

    const valorFinal = preco * (1 - desconto / 100);
    const comissao = valorFinal * 0.05;

    setResultado({
      valorFinal,
      comissao,
    });
  };

  
  const fecharVenda = async () => {
    if (!resultado) return alert("Calcule a venda primeiro!");

    setLoading(true);

    try {
      const { error } = await supabase.from("vendas").insert([
        {
          cpf: form.cpf,
          cliente: form.cliente,
          carro: form.carro,
          preco: Number(form.preco),
          desconto: Number(form.desconto || 0),
          valor_final: resultado.valorFinal,
          comissao: resultado.comissao,
        },
      ]);

      if (error) throw error;

      alert("Venda fechada com sucesso! 🚗💰");

      setForm({
        cpf: "",
        cliente: "",
        carro: "",
        preco: "",
        desconto: "",
      });

      setResultado(null);

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
        <h1 style={styles.title}>Fechar Venda</h1>

        <div style={styles.form}>

          <input
            name="cpf"
            placeholder="CPF do cliente"
            value={form.cpf}
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={buscarCliente} style={styles.button}>
            Buscar Cliente
          </button>

          <input
            name="cliente"
            placeholder="Nome do cliente"
            value={form.cliente}
            disabled
            style={styles.input}
          />

          <input
            name="carro"
            placeholder="Modelo do carro"
            value={form.carro}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="preco"
            type="number"
            placeholder="Preço (R$)"
            value={form.preco}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="desconto"
            type="number"
            placeholder="Desconto (%)"
            value={form.desconto}
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={calcularVenda} style={styles.button}>
            Calcular
          </button>

          {resultado && (
            <div style={{ color: "#fff", textAlign: "center" }}>
              <p>Valor final: R$ {resultado.valorFinal.toFixed(2)}</p>
              <p>Comissão: R$ {resultado.comissao.toFixed(2)}</p>
            </div>
          )}

          <button
            onClick={fecharVenda}
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Finalizando..." : "Fechar Venda"}
          </button>

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
    border: "1px solid #071c92",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: "28px",
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