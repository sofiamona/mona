"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ComissaoFuncionario() {
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(false);

  const TAXA_COMISSAO = 0.1; // 10%

  const gerarComissao = async () => {
    if (!nomeFuncionario || !dataInicio || !dataFim) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("vendas")
        .select("*")
        .ilike("funcionario", `%${nomeFuncionario}%`)
        .gte("data_venda", dataInicio)
        .lte("data_venda", dataFim);

      if (error) throw error;

      if (!data || data.length === 0) {
        setRelatorio(null);
        alert("Nenhuma venda encontrada!");
        return;
      }

      // 🔹 Cálculos
      const totalVendas = data.length;

      const valorTotal = data.reduce(
        (acc, venda) => acc + Number(venda.valor),
        0
      );

      const valorMedio = valorTotal / totalVendas;

      const totalComissao = valorTotal * TAXA_COMISSAO;

      setRelatorio({
        funcionario: nomeFuncionario,
        totalVendas,
        valorTotal,
        valorMedio,
        totalComissao,
      });

    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Gerar Comissão</h1>

        <div style={styles.form}>
          <input
            placeholder="Nome do funcionário"
            value={nomeFuncionario}
            onChange={(e) => setNomeFuncionario(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            style={styles.input}
          />

          <button onClick={gerarComissao} style={styles.button}>
            {loading ? "Gerando..." : "Gerar Relatório"}
          </button>
        </div>

        {/* RELATÓRIO COMPLETO */}
        {relatorio && (
          <div style={styles.cardRelatorio}>
            <h3>Relatório de Comissão</h3>

            <p><strong>Funcionário:</strong> {relatorio.funcionario}</p>

            <p>Total de vendas: {relatorio.totalVendas}</p>

            <p>Valor total vendido: R$ {relatorio.valorTotal.toFixed(2)}</p>

            <p>Valor médio por venda: R$ {relatorio.valorMedio.toFixed(2)}</p>

            <hr style={{ margin: "10px 0", borderColor: "#333" }} />

            <p>
              <strong>
                Comissão (10%): R$ {relatorio.totalComissao.toFixed(2)}
              </strong>
            </p>
          </div>
        )}
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
    gap: "10px",
    marginTop: "20px",
  },
  input: {
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
  cardRelatorio: {
    marginTop: "20px",
    background: "#1a1a1a",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #333",
    color: "#fff",
  },
};