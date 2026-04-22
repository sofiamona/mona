"use client";

export default function Home() {
  const carros = [
    { nome: "Tucson", imagem: "/tucson.png" },
    { nome: "Creta", imagem: "/creta.png" },
    { nome: "HB20S", imagem: "/hb20s.png" },
    { nome: "Kona", imagem: "/kona.png" },
  ];

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.navbar}>
        <h2 style={styles.logo}>MONA</h2>

        <div style={styles.navButtons}>
          <button style={styles.login}>Cliente</button>
          <button style={styles.funcionario}>Funcionário</button>
        </div>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Encontre o carro dos seus sonhos 🚗
        </h1>

        <p style={styles.heroSubtitle}>
          Tecnologia, conforto e desempenho em um só lugar
        </p>

        <button style={styles.cta}>Ver Veículos</button>
      </section>

      {/* CARROS */}
      <section style={styles.carsSection}>
        <h2 style={styles.sectionTitle}>Modelos em Destaque</h2>

        <div style={styles.grid}>
          {carros.map((carro, index) => (
            <div key={index} style={styles.card}>
              <img
                src={carro.imagem}
                alt={carro.nome}
                style={styles.image}
              />

              <h3 style={styles.carName}>{carro.nome}</h3>

              <button style={styles.details}>Ver Detalhes</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ===== ESTILO ===== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f2c, #020617)",
    color: "#fff",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #111",
  },

  logo: {
    color: "#fff",
    fontWeight: "bold",
  },

  navButtons: {
    display: "flex",
    gap: "10px",
  },

  login: {
    padding: "8px 15px",
    background: "#1a1a1a",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },

  funcionario: {
    padding: "8px 15px",
    background: "#cc0000",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    padding: "80px 20px",
  },

  heroTitle: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  heroSubtitle: {
    color: "#aaa",
    marginBottom: "20px",
  },

  cta: {
    padding: "12px 25px",
    background: "linear-gradient(90deg, #1419a3, #cc0000)",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },

  carsSection: {
    padding: "40px",
  },

  sectionTitle: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#111",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid #222",
  },

  image: {
    width: "100%",
    borderRadius: "8px",
  },

  carName: {
    marginTop: "10px",
  },

  details: {
    marginTop: "10px",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#1a1a1a",
    color: "#fff",
    cursor: "pointer",
  },
};