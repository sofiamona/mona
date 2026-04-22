export default function CarList({ cars }) {
  return (
    <div>
      <h2>Outros modelos</h2>

      {cars.map((car) => (
        <div key={car.id} style={{ marginBottom: "20px" }}>
          <img
            src={car.image}
            alt={car.name}
            style={{ width: "100%", borderRadius: "10px" }}
          />

          <h3>{car.name}</h3>
        </div>
      ))}
    </div>
  );
}