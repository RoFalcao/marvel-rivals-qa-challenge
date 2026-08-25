# Marvel Rivals QA Challenge

Projeto desenvolvido como parte de um desafio técnico para a posição de **Analista de Qualidade Pleno**, com foco na definição e aplicação de uma estratégia de qualidade para uma solução baseada no universo Marvel Rivals.

## Objetivo

O objetivo deste projeto é demonstrar uma abordagem de Quality Engineering baseada em risco, contemplando diferentes camadas de teste e priorizando cenários relevantes para automação.

A solução contempla:

- Testes de API;
- Testes Web;
- Estratégia de testes baseada em risco;
- Matriz de cenários e priorização;
- Automação seletiva;
- Tratamento de cenários de erro e indisponibilidade;
- Evidências de execução.

## Aplicações utilizadas

### API

**Marvel Developer API**

A API originalmente proposta no desafio, Marvel Rivals API, apresentou indisponibilidade durante o desenvolvimento, com retorno HTTP `502 Bad Gateway`.

A indisponibilidade foi reproduzida, documentada com evidências e comunicada aos responsáveis pelo desafio.

Após o reporte, foi autorizada a utilização da **Marvel Developer API** como alternativa para a execução da camada de API.

A API alternativa utiliza GraphQL e autenticação via Bearer Token.

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

O portal público Marvel Rivals Heroes será utilizado como aplicação de referência para os testes de interface Web.

Os principais fluxos selecionados para automação são:

- Carregamento da página;
- Exibição da lista de heróis;
- Navegação para detalhes;
- Utilização dos filtros disponíveis.

## Estratégia de testes

A estratégia é baseada em testes distribuídos por camadas:

- **API:** autenticação, validação de contrato, estrutura das respostas e tratamento de requisições inválidas;
- **Web:** validação dos principais fluxos e comportamentos da interface;
- **Cenários transversais:** validação de timeout, erros e indisponibilidade de serviços.

A priorização dos cenários considera:

- Risco;
- Impacto;
- Criticidade;
- Valor para detecção de regressões;
- Custo de implementação;
- Custo de manutenção.

A automação é seletiva. Nem todos os cenários identificados serão automatizados, priorizando os casos de maior valor para a solução.

A estratégia detalhada está disponível em:

`docs/test-plan.md`

A matriz de cenários está disponível em:

`docs/test-matrix.md`

## Estrutura do projeto

```text
marvel-rivals-qa-challenge/
├── docs/
│   ├── test-matrix.md
│   └── test-plan.md
├── evidences/
├── fixtures/
│   └── mocks/
├── tests/
│   ├── api/
│   └── web/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

## Tecnologias

A stack de automação definida para o projeto é:

- Node.js;
- TypeScript;
- Playwright;
- dotenv;
- GraphQL para os testes da Marvel Developer API.

O **Playwright** foi escolhido por permitir a automação das camadas Web e API no mesmo ecossistema, além de oferecer recursos para interceptação de requisições, execução em diferentes navegadores, screenshots, vídeos e traces.

A escolha também reduz a necessidade de dependências adicionais para o escopo proposto.

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

O Personal Access Token da Marvel Developer API deve ser informado somente no arquivo `.env` local.

> O arquivo `.env` não deve ser versionado. Credenciais e outros dados sensíveis não devem ser adicionados ao repositório.

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

Instale os navegadores utilizados pelo Playwright:

```bash
npx playwright install
```

## Execução dos testes

Para executar todos os testes:

```bash
npx playwright test
```

Para executar somente os testes Web:

```bash
npx playwright test tests/web
```

Para executar somente os testes de API:

```bash
npx playwright test tests/api
```

Para acompanhar visualmente a execução dos testes Web:

```bash
npx playwright test tests/web --headed
```

Para abrir o relatório HTML gerado pelo Playwright:

```bash
npx playwright show-report
```

## Evidências

As evidências relevantes das execuções serão armazenadas no diretório:

`evidences/`

Entre as evidências consideradas relevantes estão:

- Registros da indisponibilidade da API originalmente proposta;
- Resultados das execuções automatizadas;
- Screenshots de falhas, quando aplicável;
- Traces e relatórios gerados pelo Playwright, quando aplicável.

Credenciais, tokens e dados pessoais não devem ser incluídos nas evidências versionadas.

## Limitações conhecidas

Durante a análise inicial do ambiente, foi identificada indisponibilidade da **Marvel Rivals API** originalmente proposta no desafio, apresentando resposta HTTP `502 Bad Gateway`.

O problema também afetou o fluxo necessário para geração da API Key, impossibilitando a execução confiável dos cenários funcionais previstos para essa integração.

A indisponibilidade foi:

- Reproduzida;
- Documentada com evidências;
- Comunicada aos responsáveis pelo desafio.

Após o reporte, foi autorizada a utilização da **Marvel Developer API** como alternativa.

Por esse motivo, os testes automatizados de API utilizam um domínio funcional diferente do originalmente proposto, preservando os objetivos técnicos relacionados a autenticação, contrato, tratamento de respostas e automação.

Por se tratar de aplicações públicas externas, alterações de disponibilidade, conteúdo ou contrato também podem impactar futuras execuções da suíte.

## Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento deste projeto.

O uso de IA, as validações realizadas e as decisões técnicas tomadas durante o desenvolvimento serão documentados nesta seção ao final da implementação.

> Todo conteúdo gerado com auxílio de IA será revisado e validado antes de ser incorporado à solução.