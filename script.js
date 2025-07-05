
async function carregarCSV() {
  const resposta = await fetch("arquivos.csv");
  const texto = await resposta.text();
  const linhas = texto.split("\n").slice(1); // ignora cabeçalho
  return linhas.map(linha => {
    const partes = linha.split(",");
    return {
      nome: partes[0]?.trim(),
      link: partes[1]?.trim(),
      pasta: partes[2]?.trim()
    };
  });
}

function buscar(arquivos, termo) {
  termo = termo.toLowerCase();
  return arquivos.filter(arq =>
    arq.nome.toLowerCase().includes(termo) ||
    arq.pasta.toLowerCase().includes(termo)
  );
}

function exibirResultados(resultados) {
  const ul = document.getElementById("resultados");
  ul.innerHTML = "";
  resultados.forEach(arq => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong><i class="fas fa-file-alt"></i> ${arq.nome}</strong>
      <a class="btn" href="${arq.link}" target="_blank"><i class="fas fa-link"></i> Acessar</a>
      <small><i class="fas fa-folder-open"></i> ${arq.pasta}</small>
    `;
    ul.appendChild(li);
  });
}

(async () => {
  const arquivos = await carregarCSV();
  const input = document.getElementById("busca");
  input.addEventListener("input", e => {
    const termo = e.target.value;
    const encontrados = buscar(arquivos, termo);
    exibirResultados(encontrados);
  });
})();
