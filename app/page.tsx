import Header from "./components/Header";
import WorkGrid, { Card } from "./components/WorkGrid";
import { readFile } from "fs/promises";
import path from "path";

async function getCards(): Promise<Card[]> {
  const filePath = path.join(process.cwd(), "public", "cards.json");
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export default async function Home() {
  const cards = await getCards();

  return (
    <div className="page">
      <Header />
      <main className="main">
        <WorkGrid cards={cards} />
      </main>
    </div>
  );
}
