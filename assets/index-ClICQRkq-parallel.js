const base = new URL("./", import.meta.url);
const parts = ["index-ClICQRkq.part00.txt","index-ClICQRkq.part01.txt","index-ClICQRkq.part02.txt","index-ClICQRkq.part03.txt","index-ClICQRkq.part04.txt","index-ClICQRkq.part05.txt","index-ClICQRkq.part06.txt","index-ClICQRkq.part07.txt","index-ClICQRkq.part08.txt","index-ClICQRkq.part09.txt","index-ClICQRkq.part10.txt","index-ClICQRkq.part11.txt"];
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
