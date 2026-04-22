"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Relatorios() {
  const [tipo, setTipo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerarRelatorio = async () => {
    if (!tipo) {
      alert("Selecione um tipo de relatório");
      return;
    }

    setLoading(true);

    try {
      let data;

      switch (tipo) {
        case "vendas_periodo":
          const res1 = await supabase
            .from("vendas")
            .select("*")
            .gte("data_venda", dataInicio)
            .lte("data_venda", dataFim);

          if (res1.error) throw res1.error;

          const total = res1.data.reduce((acc, v) => acc + v.valor, 0);

          data = {
            titulo: "Vendas no Período",
            totalVendas: res1.data.length,
            valorTotal: total,
          };
          break;

        case "funcionarios":
          const res2 = await supabase.from("vendas").select("*");

          if (res2.error) throw res2.error;

          const porFuncionario = {};

          res2.data.forEach((v) => {
            if (!porFuncionario[v.funcionario]) {
              porFuncionario[v.funcionario] = 0;
            }
            porFuncionario[v.funcionario] += v.valor;
          });

          data = {
            titulo: "Vendas por Funcionário",
            dados: porFuncionario,
          };
          break;

        case "veiculos":
          const res3 = await supabase.from("veiculos").select("*");
          if (res3.error) throw res3.error;

          data = {
            titulo: "Relatório de Veículos",
            total: res3.data.length,
          };
          break;

        case "estoque":
          const res4 = await supabase.from("veiculos").select("*");
          if (res4.error) throw res4.error;

          const disponiveis = res4.data.filter(v => v.status === "disponivel");

          data = {
            titulo: "Situação do Estoque",
            disponiveis: disponiveis.length,
            total: res4.data.length,
          };
          break;

        case "promocoes":
          const res5 = await supabase.from("promocoes").select("*");
          if (res5.error) throw res5.error;

          data = {
            titulo: "Relatório de Promoções",
            total: res5.data.length,
          };
          break;

        case "clientes":
          const res6 = await supabase.from("profiles").select("*");
          if (res6.error) throw res6.error;

          data = {
            titulo: "Relatório de Clientes",
            total: res6.data.length,
          };
          break;

        default:
          break;
      }

      setResultado(data);

      // salvar histórico
      await supabase.from("relatorios").insert([
        {
          tipo,
          data_inicio: dataInicio,
          data_fim: dataFim,
        },
      ]);

    } catch (error) {
      alert("Erro ao gerar relatório: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Geração de Relatórios</h1>

        <div style={styles.form}>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={styles.input}
          >
            <option value="">Selecione o tipo</option>
            <option value="vendas_periodo">Vendas por período</option>
            <option value="funcionarios">Vendas por funcionário</option>
            <option value="veiculos">Veículos</option>
            <option value="estoque">Estoque</option>
            <option value="promocoes">Promoções</option>
            <option value="clientes">Clientes</option>
          </select>

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

          <button onClick={gerarRelatorio} style={styles.button}>
            {loading ? "Gerando..." : "Visualizar Relatório"}
          </button>
        </div>

        {resultado && (
          <div style={styles.resultado}>
            <h3>{resultado.titulo}</h3>

            {resultado.totalVendas !== undefined && (
              <>
                <p>Total de vendas: {resultado.totalVendas}</p>
                <p>Valor total: R$ {resultado.valorTotal}</p>
              </>
            )}

            {resultado.dados && (
              Object.entries(resultado.dados).map(([func, valor]) => (
                <p key={func}>{func}: R$ {valor}</p>
              ))
            )}

            {resultado.total !== undefined && (
              <p>Total: {resultado.total}</p>
            )}

            {resultado.disponiveis !== undefined && (
              <p>Disponíveis: {resultado.disponiveis}</p>
            )}
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
  },
  resultado: {
    marginTop: "20px",
    background: "#1a1a1a",
    padding: "15px",
    borderRadius: "6px",
    color: "#fff",
  },
};