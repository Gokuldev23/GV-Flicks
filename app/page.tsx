async function getCatFact() {
  const res = await fetch("https://catfact.ninja/fact", {
    cache: "no-store",
  });
  return await res.json();
}

export default async function Home() {
  const catFact = await getCatFact();
  const timestamp = new Date().toLocaleTimeString();
  return (
    <div className="page">
      <main className="main">
        <h1>🐈‍⬛ Cat Facts 🐈</h1>
        <div className="fact-card">
          <p className="timestamp">Rendered at: {timestamp}</p>
          <p className="fact-text">{catFact.fact}</p>
        </div>
      </main>
    </div>
  );
}
