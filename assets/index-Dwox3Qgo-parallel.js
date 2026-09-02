const base = new URL("./", import.meta.url);
const parts = ["index-Dwox3Qgo.part00.txt","index-Dwox3Qgo.part01.txt","index-Dwox3Qgo.part02.txt","index-Dwox3Qgo.part03.txt","index-Dwox3Qgo.part04.txt","index-Dwox3Qgo.part05.txt","index-Dwox3Qgo.part06.txt","index-Dwox3Qgo.part07.txt","index-Dwox3Qgo.part08.txt","index-Dwox3Qgo.part09.txt","index-Dwox3Qgo.part10.txt","index-Dwox3Qgo.part11.txt"];
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
