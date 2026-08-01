const parts=["index-DSmeojZ1.js.part0","index-DSmeojZ1.js.part1","index-DSmeojZ1.js.part2","index-DSmeojZ1.js.part3","index-DSmeojZ1.js.part4","index-DSmeojZ1.js.part5","index-DSmeojZ1.js.part6","index-DSmeojZ1.js.part7","index-DSmeojZ1.js.part8"];
const status=document.getElementById("root");
try {
  const responses=await Promise.all(parts.map((name)=>fetch(new URL(name,import.meta.url))));
  if(responses.some((response)=>!response.ok)) throw new Error("アプリファイルを読み込めませんでした");
  const chunks=await Promise.all(responses.map((response)=>response.arrayBuffer()));
  const url=URL.createObjectURL(new Blob(chunks,{type:"text/javascript"}));
  await import(url);
  URL.revokeObjectURL(url);
} catch(error) {
  status.innerHTML='<main style="padding:3rem;font-family:sans-serif"><h1>読み込みに失敗しました</h1><p>ページを再読み込みしてください。</p></main>';
  console.error(error);
}