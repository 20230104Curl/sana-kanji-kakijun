const PARTS = ["index-DtA6zB2N.part00.txt","index-DtA6zB2N.part01.txt","index-DtA6zB2N.part02.txt","index-DtA6zB2N.part03.txt","index-DtA6zB2N.part04.txt","index-DtA6zB2N.part05.txt","index-DtA6zB2N.part06.txt","index-DtA6zB2N.part07.txt","index-DtA6zB2N.part08.txt","index-DtA6zB2N.part09.txt","index-DtA6zB2N.part10.txt","index-DtA6zB2N.part11.txt"];
const BASE = new URL("./", import.meta.url);
const chunks = await Promise.all(PARTS.map(async (part) => {
  const response = await fetch(new URL(part, BASE));
  if (!response.ok) throw new Error(`Failed to load ${part}: ${response.status}`);
  return response.text();
}));
const bundleUrl = URL.createObjectURL(new Blob([chunks.join("")], { type: "text/javascript" }));
try {
  await import(bundleUrl);
} finally {
  setTimeout(() => URL.revokeObjectURL(bundleUrl), 0);
}
