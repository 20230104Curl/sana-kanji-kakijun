const base = new URL("./", import.meta.url);
const parts = ["index-YaDffmdk.part00.txt","index-YaDffmdk.part01.txt","index-YaDffmdk.part02.txt","index-YaDffmdk.part03.txt","index-YaDffmdk.part04.txt","index-YaDffmdk.part05.txt","index-YaDffmdk.part06.txt","index-YaDffmdk.part07.txt","index-YaDffmdk.part08.txt","index-YaDffmdk.part09.txt","index-YaDffmdk.part10.txt","index-YaDffmdk.part11.txt"];
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
