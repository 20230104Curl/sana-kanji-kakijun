const base = new URL("./", import.meta.url);
const parts = ["index-Ce6MU3V_.part00.txt","index-Ce6MU3V_.part01.txt","index-Ce6MU3V_.part02.txt","index-Ce6MU3V_.part03.txt","index-Ce6MU3V_.part04.txt","index-Ce6MU3V_.part05.txt","index-Ce6MU3V_.part06.txt","index-Ce6MU3V_.part07.txt","index-Ce6MU3V_.part08.txt","index-Ce6MU3V_.part09.txt","index-Ce6MU3V_.part10.txt","index-Ce6MU3V_.part11.txt"];
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
