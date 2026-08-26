# Marvel Rivals QA Challenge

Projeto desenvolvido como parte de um desafio técnico para a posição de **Analista de Qualidade Pleno**, com foco na definição e aplicação de uma estratégia de qualidade para uma solução baseada no universo Marvel Rivals.

## Objetivo

O objetivo deste projeto é demonstrar uma abordagem de **Quality Engineering baseada em risco**, contemplando diferentes camadas de teste e priorizando cenários relevantes para automação.

A solução contempla:

- Testes de API;
- Testes Web;
- Testes de resiliência;
- Estratégia de testes baseada em risco;
- Matriz de cenários e priorização;
- Automação seletiva;
- Tratamento de cenários de erro e indisponibilidade;
- Evidências de execução.

---

## Aplicações utilizadas

### API

**Marvel Developer API**

A API originalmente proposta no desafio, **Marvel Rivals API**, apresentou indisponibilidade durante o desenvolvimento, com retorno HTTP `502 Bad Gateway`.

A indisponibilidade foi reproduzida, documentada com evidências e comunicada aos responsáveis pelo desafio.

Após o reporte, foi autorizada a utilização da **Marvel Developer API** como alternativa para a execução da camada de API.

A API alternativa utiliza **GraphQL** e autenticação via **Bearer Token**.

A substituição foi realizada com o objetivo de preservar os principais aspectos técnicos avaliados no desafio, incluindo:

- Autenticação;
- Consumo de API;
- Validação de contrato;
- Validação da estrutura das respostas;
- Tratamento de erros;
- Cenários positivos e negativos;
- Automação.

> A API alternativa possui domínio funcional diferente da API originalmente proposta. Os cenários foram adaptados para preservar os objetivos técnicos da avaliação, sem buscar reproduzir artificialmente os mesmos recursos de heróis, busca e detalhes.

### Web

**Marvel Rivals Heroes**

O portal público Marvel Rivals Heroes foi utilizado como aplicação de referência para os testes de interface Web.

Os principais fluxos selecionados para automação foram:

- Carregamento da página;
- Exibição da lista de heróis;
- Navegação para detalhes de um herói;
- Renderização da imagem do herói.

---

## Estratégia de testes

A estratégia é baseada em testes distribuídos por camadas:

- **API:** autenticação, validação de contrato, estrutura das respostas e tratamento de requisições inválidas;
- **Web:** validação dos principais fluxos e comportamentos da interface;
- **Resiliência:** validação de timeout e indisponibilidade de serviços.

A priorização dos cenários considera:

- Risco;
- Impacto;
- Criticidade;
- Valor para detecção de regressões;
- Custo de implementação;
- Custo de manutenção;
- Dependência e estabilidade dos serviços externos.

A automação foi realizada de forma seletiva. Nem todos os cenários identificados na matriz foram automatizados, priorizando os casos de maior valor, risco e viabilidade técnica para o escopo do desafio.

A estratégia detalhada está disponível em:

`docs/test-plan.md`

A matriz de cenários está disponível em:

`docs/test-matrix.md`

---

## Cobertura automatizada

A suíte implementada contém **11 testes automatizados**, distribuídos entre três camadas.

### Web — 4 testes

- `UI-01` — Validação do carregamento da página;
- `UI-02` — Validação da exibição da lista de heróis;
- `UI-03` — Validação da navegação para detalhes de um herói;
- `UI-05` — Validação da renderização da imagem do herói.

### API — 4 testes

- `API-01` — Consulta de usuário autenticado com sucesso;
- `API-02` — Validação da estrutura da resposta do usuário;
- `API-03` — Validação de requisição sem query GraphQL;
- `API-04` — Validação da restrição ao schema autenticado em requisição sem autenticação;
- `API-05` — Validação de requisição com token de autenticação inválido.

### Resiliência — 2 testes

- `TRV-03` — Tratamento de timeout de requisição;
- `TRV-06` — Identificação de indisponibilidade de serviço.

A relação completa dos cenários analisados, incluindo casos não automatizados e suas respectivas prioridades, está disponível em `docs/test-matrix.md`.

---

## Estrutura do projeto

```text
marvel-rivals-qa-challenge/
├── docs/
│   ├── test-matrix.md
│   └── test-plan.md
│
├── evidencias/
│   ├── api-alternativa/
│   ├── api-original-indisponivel/
│   ├── playwright/
│   └── suite-completa/
│
├── tests/
│   ├── api/
│   │   └── user.spec.ts
│   ├── resilience/
│   │   └── resilience.spec.ts
│   └── web/
│       └── heroes.spec.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

### Organização

- `docs/`: documentação da estratégia de qualidade, incluindo plano e matriz de testes;
- `evidencias/api-alternativa/`: evidências das validações realizadas contra a API alternativa;
- `evidencias/api-original-indisponivel/`: evidências da indisponibilidade identificada na API originalmente prevista para o desafio;
- `evidencias/playwright/`: evidências relacionadas às execuções automatizadas;
- `evidencias/suite-completa/`: evidências da execução completa da suíte;
- `tests/api/`: testes automatizados da Marvel Developer API;
- `tests/web/`: testes automatizados da interface Web do Marvel Rivals;
- `tests/resilience/`: testes relacionados a timeout e indisponibilidade;
- `.env.example`: exemplo das variáveis de ambiente necessárias para execução;
- `playwright.config.ts`: configuração central do Playwright.

---

## Tecnologias

A stack utilizada no projeto é composta por:

- Node.js;
- TypeScript;
- Playwright;
- dotenv;
- GraphQL como linguagem de consulta da Marvel Developer API.

O **Playwright** foi escolhido por permitir a automação das camadas Web e API no mesmo ecossistema, além de oferecer suporte a múltiplos navegadores, execução paralela, relatórios, screenshots, vídeos e traces.

A escolha também reduz a necessidade de dependências adicionais para o escopo proposto.

---

## Configuração

As configurações do ambiente são realizadas por meio de variáveis de ambiente.

Um exemplo está disponível no arquivo:

`.env.example`

Configuração esperada:

```env
WEB_BASE_URL=https://www.marvelrivals.com

MARVEL_API_BASE_URL=https://api.marvelapp.com/graphql/
MARVEL_API_TOKEN=your_token_here
```

Para criar o arquivo local de configuração:

```bash
cp .env.example .env
```

### Gerando o token da Marvel Developer API

Para executar os testes de API é necessário possuir uma conta Marvel e gerar um **Personal Access Token**.

Para desenvolvimento local, a Marvel permite a utilização desse token sem a necessidade de implementar o fluxo OAuth2 completo.

O token pode ser gerado seguindo as instruções disponíveis na [documentação de autenticação da Marvel Developer API](https://marvelapp.com/developers/documentation/authentication).

Após acessar a página:

1. Faça login com uma conta Marvel;
2. Gere um Personal Access Token;
3. Copie o token gerado;
4. Abra o arquivo `.env` criado anteriormente;
5. Informe o token na variável:

```env
MARVEL_API_TOKEN=seu_token_aqui
```

O token será utilizado pelos testes no header HTTP de autenticação:

```text
Authorization: Bearer <token>
```

O Personal Access Token deve permanecer somente no arquivo `.env` local.

> O arquivo `.env` não deve ser versionado. Credenciais e outros dados sensíveis não devem ser adicionados ao repositório.

Documentação oficial:

- [Marvel Developer API — Getting Started](https://marvelapp.com/developers/documentation/getting-started)
- [Marvel Developer API — Authentication](https://marvelapp.com/developers/documentation/authentication)

---

## Instalação

Após clonar o repositório, acesse o diretório do projeto e instale as dependências:

```bash
npm install
```

Instale os navegadores utilizados pelo Playwright:

```bash
npx playwright install
```

Crie o arquivo local de variáveis de ambiente:

```bash
cp .env.example .env
```

Configure o `MARVEL_API_TOKEN` no arquivo `.env` conforme descrito na seção de configuração.

> Para executar somente os testes Web, o token da Marvel Developer API não é necessário.

---

## Execução dos testes

### Executar a suíte completa

Após instalar as dependências e configurar o `.env`:

```bash
npx playwright test
```

### Executar somente os testes Web

```bash
npx playwright test tests/web
```

### Executar somente os testes de API

Os testes de API dependem de um `MARVEL_API_TOKEN` válido configurado no arquivo `.env`.

```bash
npx playwright test tests/api
```

### Executar somente os testes de resiliência

```bash
npx playwright test tests/resilience
```

### Acompanhar visualmente os testes Web

```bash
npx playwright test tests/web --headed
```

### Abrir o relatório HTML

Após a execução dos testes:

```bash
npx playwright show-report
```

---

## Resultado da execução

A execução final da suíte foi concluída com sucesso:

```text
Running 11 tests using 3 workers
11 passed
```

As evidências da execução estão disponíveis no diretório `evidencias/`.

---

## Evidências

As principais evidências coletadas durante o desenvolvimento e a execução dos testes estão organizadas no diretório `evidencias/`.

As evidências contemplam:

- Indisponibilidade da API originalmente prevista para o desafio, com retorno `502 Bad Gateway`;
- Validação com sucesso da Marvel Developer API utilizada como alternativa;
- Validação do comportamento da API com token de autenticação inválido, retornando `401 Unauthorized`;
- Execução dos testes automatizados com Playwright;
- Resultado da execução completa da suíte.

---

## Limitações conhecidas

- A Marvel Developer API utilizada nos testes possui domínio funcional diferente da API originalmente prevista no desafio;
- O portal Web utilizado não disponibiliza um mecanismo funcional de filtros para a lista de heróis, motivo pelo qual esse cenário foi substituído pela validação de renderização da imagem do herói;
- Os testes de resiliência foram implementados de forma controlada, sem provocar falhas reais nos serviços externos;
- Por se tratar de aplicações públicas externas, alterações de disponibilidade, conteúdo, estrutura da página ou contrato das APIs podem impactar futuras execuções da suíte.

---

## Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento deste projeto, principalmente para:

- Estruturação e revisão da estratégia de testes;
- Discussão de cenários e critérios de priorização;
- Apoio na implementação e revisão dos testes automatizados;
- Análise de erros encontrados durante a execução;
- Organização e revisão da documentação.

> As sugestões geradas por IA foram revisadas, validadas e adaptadas com base no comportamento real das aplicações e APIs utilizadas no desafio. As decisões técnicas e validações finais foram realizadas a partir dos resultados observados durante a implementação e execução dos testes.