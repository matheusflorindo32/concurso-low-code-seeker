# PWA e recursos offline

Este projeto possui uma estrutura inicial para recursos de Progressive Web App, incluindo `manifest.json` e um arquivo de service worker em `public/sw.js`.

No estado atual, a aplicação prioriza a entrega funcional do desafio: consulta de concursos por CPF e consulta de candidatos por código do concurso.

---

## Recursos presentes

### Manifest

O arquivo `public/manifest.json` define informações básicas da aplicação, como:

- nome da aplicação;
- nome curto;
- cores de tema;
- modo de exibição;
- ícones;
- atalhos para os principais fluxos.

### Service worker

O arquivo `public/sw.js` contém uma base de service worker com estratégia de cache para páginas e recursos estáticos.

---

## Estado atual

Os recursos de PWA existem como estrutura técnica inicial, mas não devem ser tratados como funcionalidade principal da entrega.

Para uma validação completa de PWA, ainda seria necessário:

- registrar o service worker em produção;
- testar o comportamento offline em navegador real;
- validar instalação em desktop e mobile;
- revisar cache de rotas e assets;
- executar auditoria em Lighthouse;
- confirmar se os ícones referenciados existem e carregam corretamente.

---

## Decisão de escopo

Como o desafio principal está relacionado à compatibilidade entre candidatos, profissões e concursos, a camada PWA foi mantida como melhoria futura, sem ser apresentada como requisito central da solução.

Essa decisão evita prometer uma funcionalidade que ainda depende de validação específica em ambiente real.

---

## Possíveis evoluções

- ativar registro do service worker somente após validação;
- adicionar tela/aviso de modo offline;
- criar estratégia de cache mais simples e previsível;
- validar instalação em Android, iOS e desktop;
- revisar ícones, tema e shortcuts;
- criar testes manuais documentados para PWA.
