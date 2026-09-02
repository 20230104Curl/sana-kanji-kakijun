const parts = ["index-DbWOB7CV-part-01.txt","index-DbWOB7CV-part-02.txt","index-DbWOB7CV-part-03.txt","index-DbWOB7CV-part-04.txt","index-DbWOB7CV-part-05.txt","index-DbWOB7CV-part-06.txt","index-DbWOB7CV-part-07.txt","index-DbWOB7CV-part-08.txt","index-DbWOB7CV-part-09.txt","index-DbWOB7CV-part-10.txt","index-DbWOB7CV-part-11.txt","index-DbWOB7CV-part-12.txt"];
const source = (await Promise.all(parts.map(async (part) => {
  const response = await fetch(new URL(part, import.meta.url));
  if (!response.ok) throw new Error(`Failed to load ${part}`);
  return response.text();
}))).join("");
const moduleUrl = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
try {
  await import(moduleUrl);
} finally {
  URL.revokeObjectURL(moduleUrl);
}
