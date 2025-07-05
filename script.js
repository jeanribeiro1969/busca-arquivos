
document.addEventListener('DOMContentLoaded', function () {
  fetch('arquivos.csv')
    .then(response => response.text())
    .then(data => {
      const linhas = data.split('\n').slice(1);
      const arquivos = linhas.map(linha => {
        const [arquivo, link, assunto, disciplina, tipo, ano] = linha.split(',');
        return { arquivo, link, assunto, disciplina, tipo, ano };
      });

      const inputBusca = document.querySelector('input');
      const resultados = document.createElement('div');
      document.body.appendChild(resultados);

      inputBusca.addEventListener('input', function () {
        const termo = this.value.toLowerCase();
        resultados.innerHTML = '';

        const encontrados = arquivos.filter(arq =>
          arq.arquivo.toLowerCase().includes(termo) ||
          arq.assunto.toLowerCase().includes(termo) ||
          arq.disciplina.toLowerCase().includes(termo) ||
          arq.tipo.toLowerCase().includes(termo) ||
          arq.ano.toLowerCase().includes(termo)
        );

        encontrados.forEach(({ arquivo, link, assunto, disciplina, tipo, ano }) => {
          let fileIcon = '📄';
          if (arquivo.toLowerCase().endsWith('.pdf')) {
            fileIcon = '📕';
          } else if (arquivo.toLowerCase().endsWith('.doc') || arquivo.toLowerCase().endsWith('.docx')) {
            fileIcon = '📄';
          } else if (arquivo.toLowerCase().endsWith('.xls') || arquivo.toLowerCase().endsWith('.xlsx')) {
            fileIcon = '📊';
          } else if (arquivo.toLowerCase().endsWith('.png') || arquivo.toLowerCase().endsWith('.jpg') || arquivo.toLowerCase().endsWith('.jpeg')) {
            fileIcon = '🖼️';
          }

          const card = document.createElement('div');
          card.style = 'background:#f8f9fa;padding:16px;border-left:6px solid #3b82f6;border-radius:12px;margin-bottom:12px';

          card.innerHTML = \`
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="font-size:28px;">\${fileIcon}</div>
              <div>
                <div style="font-weight:bold;font-size:20px;">
                  \${arquivo}
                  <a href="\${link}" target="_blank" style="margin-left:12px; font-size:14px; padding:4px 12px; background:#3b82f6; color:#fff; text-decoration:none; border-radius:6px; display:inline-flex; align-items:center; gap:6px;">
                    🔗 Acessar
                  </a>
                </div>
                <div style="color:#555; margin-top:4px;">
                  📁 \${assunto} / \${disciplina} / \${tipo}
                </div>
              </div>
            </div>
          \`;
          resultados.appendChild(card);
        });
      });
    });
});
