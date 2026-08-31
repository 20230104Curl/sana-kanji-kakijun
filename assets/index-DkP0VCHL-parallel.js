const PARTS = ["index-DkP0VCHL.part00.txt","index-DkP0VCHL.part01.txt","index-DkP0VCHL.part02.txt","index-DkP0VCHL.part03.txt","index-DkP0VCHL.part04.txt","index-DkP0VCHL.part05.txt","index-DkP0VCHL.part06.txt","index-DkP0VCHL.part07.txt","index-DkP0VCHL.part08.txt","index-DkP0VCHL.part09.txt","index-DkP0VCHL.part10.txt","index-DkP0VCHL.part11.txt"];
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
