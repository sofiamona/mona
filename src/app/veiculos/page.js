"use client";
import { useState } from "react";

export default function Cliente() {
  const [cliente, setCliente] = useState(null);
  const [busca, setBusca] = useState("");

  // 🔎 Buscar cliente (simulado)
  const buscarCliente = () => {
    // Simulando um cliente vindo do sistema
    const clienteFake = {
      nome: "João Silva",
      email: "joao@email.com",
    };

    setCliente(clienteFake);
  };

  // ✍️ Atualizar dados
  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 Salvar dados
  const salvar = () => {
    console.log("Dados salvos:", cliente);
    alert("Cliente atualizado com sucesso!");
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Alterar Cliente</h1>

      {/* 🔎 Buscar */}
      <input
        type="text"
        placeholder="Buscar cliente"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button onClick={buscarCliente}>Buscar</button>

      {/* ✍️ Editar */}
      {cliente && (
        <div style={{ marginTop: 20 }}>
          <h2>Editar Dados</h2>

          <input
            type="text"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
          />

          <br />
          <button onClick={salvar}>Salvar</button>
        </div>
      )}
    </main>
  );
}