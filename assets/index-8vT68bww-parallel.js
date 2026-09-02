const base = new URL("./", import.meta.url);
const parts = ["index-8vT68bww.part00.txt","index-8vT68bww.part01.txt","index-8vT68bww.part02.txt","index-8vT68bww.part03.txt","index-8vT68bww.part04.txt","index-8vT68bww.part05.txt","index-8vT68bww.part06.txt","index-8vT68bww.part07.txt","index-8vT68bww.part08.txt","index-8vT68bww.part09.txt","index-8vT68bww.part10.txt","index-8vT68bww.part11.txt"];
const load = async () => {
  const texts = await Promise.all(parts.map(async (part) => {
    const response = await fetch(new URL(part, base));
    if (!response.ok) throw new Error(`Failed to load ${part}: ${response.status}`);
    return response.text();
  }));
  const moduleUrl = URL.createObjectURL(new Blob(texts, { type: "text/javascript" }));
  try { await import(moduleUrl); }
  finally { URL.revokeObjectURL(moduleUrl); }
};
load().catch((error) => {
  console.error(error);
  const root = document.getElementById("root");
  if (root) root.textContent = "よみこみに しっぱいしました。もういちど ひらいてください。";
});
