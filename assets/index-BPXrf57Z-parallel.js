const base = new URL("./", import.meta.url);
const parts = ["index-BPXrf57Z.part00.txt","index-BPXrf57Z.part01.txt","index-BPXrf57Z.part02.txt","index-BPXrf57Z.part03.txt","index-BPXrf57Z.part04.txt","index-BPXrf57Z.part05.txt","index-BPXrf57Z.part06.txt","index-BPXrf57Z.part07.txt","index-BPXrf57Z.part08.txt","index-BPXrf57Z.part09.txt","index-BPXrf57Z.part10.txt","index-BPXrf57Z.part11.txt"];
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
