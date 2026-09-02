const base = new URL("./", import.meta.url);
const parts = ["index-C1XHjG2E.part00.txt","index-C1XHjG2E.part01.txt","index-C1XHjG2E.part02.txt","index-C1XHjG2E.part03.txt","index-C1XHjG2E.part04.txt","index-C1XHjG2E.part05.txt","index-C1XHjG2E.part06.txt","index-C1XHjG2E.part07.txt","index-C1XHjG2E.part08.txt","index-C1XHjG2E.part09.txt","index-C1XHjG2E.part10.txt","index-C1XHjG2E.part11.txt"];
const load = async () => {
  const texts = await Promise.all(parts.map(async (part) => {
    const response = await fetch(new URL(part, base));
    if (!response.ok) throw new Error(`Failed to load ${part}: ${response.status}`);
    return response.text();
  }));
  const moduleUrl = URL.createObjectURL(new Blob(texts, { type: "text/javascript" }));
  try {
    await import(moduleUrl);
  } finally {
    URL.revokeObjectURL(moduleUrl);
  }
};
load().catch((error) => {
  console.error(error);
  const root = document.getElementById("root");
  if (root) root.textContent = "よみこみに しっぱいしました。もういちど ひらいてください。";
});
