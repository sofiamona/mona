"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <div className="container">
      <div className="card">
        <img src="/logo.jpg"/>
        <h1>Mona</h1>
        <p>Cadastro do funcionaria</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" >Entrar</button>
        </form>
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          font-family: Arial, sans-serif;
        }

        .card {
          backdrop-filter: blur(15px);
          background: rgba(94, 16, 16, 0.05);
          padding: 40px;
          border-radius: 20px;
          width: 320px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          text-align: center;
          color: white;
        }

        h1 {
          font-size: 32px;
          margin-bottom: 5px;
          letter-spacing: 2px;
        }

        p {
          font-size: 14px;
          margin-bottom: 20px;
          color: #cbd5e1;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        input::placeholder {
          color: #94a3b8;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #0047b1;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          background: #190167;
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}