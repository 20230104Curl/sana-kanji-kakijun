const PARTS = ["index-DK_dCyPP.part00.txt","index-DK_dCyPP.part01.txt","index-DK_dCyPP.part02.txt","index-DK_dCyPP.part03.txt","index-DK_dCyPP.part04.txt","index-DK_dCyPP.part05.txt","index-DK_dCyPP.part06.txt","index-DK_dCyPP.part07.txt","index-DK_dCyPP.part08.txt","index-DK_dCyPP.part09.txt","index-DK_dCyPP.part10.txt"];
const BASE = new URL("./", import.meta.url);
const chunks = [];
for (const part of PARTS) {
  const response = await fetch(new URL(part, BASE));
  if (!response.ok) throw new Error(`Failed to load ${part}: ${response.status}`);
  chunks.push(await response.text());
}
const bundleUrl = URL.createObjectURL(new Blob([chunks.join("")], { type: "text/javascript" }));
try {
  await import(bundleUrl);
} finally {
  setTimeout(() => URL.revokeObjectURL(bundleUrl), 0);
}
