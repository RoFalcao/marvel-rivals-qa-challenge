# Test Plan

## 1. Objetivo

Definir a estratégia de qualidade para o desafio **Marvel Rivals QA Challenge**, considerando testes de API, Web e cenários transversais.

A abordagem será baseada em risco, priorizando os fluxos de maior impacto para o usuário e os cenários que ofereçam maior valor para detecção de regressões.

A automação será seletiva, com foco em qualidade, sustentabilidade e clareza dos testes, em vez de quantidade de cenários automatizados.

---

## 2. Escopo

### 2.1 API

A API originalmente proposta no desafio apresentou indisponibilidade HTTP `502 Bad Gateway`.

Após o reporte da indisponibilidade aos responsáveis pelo desafio, foi autorizada a utilização da **Marvel Developer API** como alternativa para a camada de API.

A API alternativa utiliza GraphQL e autenticação por Bearer Token.

A camada de API contempla cenários relacionados a:

- Autenticação;
- Consulta de dados;
- Validação da estrutura das respostas;
- Validação de contrato;
- Tratamento de requisições inválidas;
- Controle de acesso;
- Tratamento de erros;
- Observação de rate limit.

A substituição não tem como objetivo reproduzir exatamente o domínio funcional da API originalmente proposta, mas preservar os principais aspectos técnicos avaliados no desafio.

### 2.2 Web

A camada Web contempla:

- Carregamento da aplicação;
- Exibição da lista de heróis;
- Navegação para detalhes;
- Filtros disponíveis;
- Renderização de imagens;
- Responsividade básica;
- Acessibilidade básica;
- Tratamento de falhas de carregamento.

Durante a exploração da aplicação, não foram identificados controles de filtro disponíveis na tela de seleção de heróis.

Por esse motivo, o cenário relacionado a filtros permanece documentado na matriz como parte da análise de cobertura, porém não será selecionado para automação.

### 2.3 Cenários transversais

Também serão considerados cenários relacionados a:

- Loading;
- Erro de API;
- Timeout;
- Múltiplos cliques;
- Erros no console;
- Indisponibilidade de dependências.

---

## 3. Riscos identificados

### R1 — Indisponibilidade da API originalmente proposta

Durante a análise inicial do ambiente, a Marvel Rivals API apresentou resposta HTTP `502 Bad Gateway`.

#### Impactos

- Impossibilidade de executar os cenários funcionais da API originalmente proposta;
- Impossibilidade de obter a API Key necessária para autenticação;
- Bloqueio dos cenários diretamente dependentes dessa integração.

#### Mitigação

- Reproduzir e documentar a indisponibilidade;
- Registrar evidências do erro;
- Comunicar o impedimento aos responsáveis pelo desafio;
- Utilizar a Marvel Developer API como alternativa, conforme orientação recebida;
- Registrar a substituição no README e na documentação do projeto.

---

### R2 — Dependência de serviços externos

A solução depende de aplicações públicas que não estão sob controle do projeto.

#### Impactos possíveis

- Indisponibilidade;
- Lentidão;
- Alteração de conteúdo;
- Alteração de seletores;
- Alteração de contratos;
- Mudanças de autenticação;
- Rate limiting.

#### Mitigação

- Evitar dados excessivamente rígidos;
- Priorizar asserts funcionais e de contrato;
- Utilizar configuração por variáveis de ambiente;
- Manter credenciais fora do código;
- Evitar dependência desnecessária de valores específicos retornados pela API;
- Manter a automação desacoplada.

---

### R3 — Exposição de credenciais

A Marvel Developer API utiliza Personal Access Token para autenticação.

#### Impactos

- Exposição de acesso à conta;
- Versionamento acidental de credenciais;
- Uso indevido do token.

#### Mitigação

- Armazenar o token somente no arquivo local `.env`;
- Manter `.env` no `.gitignore`;
- Disponibilizar apenas `.env.example` no repositório;
- Nunca utilizar o token diretamente no código;
- Utilizar o princípio de menor privilégio na criação do token.

---

### R4 — Fragilidade dos testes Web

Elementos visuais podem sofrer alterações sem representar uma falha funcional da aplicação.

#### Mitigação

- Priorizar seletores estáveis;
- Preferir locators semânticos sempre que possível;
- Evitar dependência excessiva de posição ou estilo;
- Validar comportamento em vez de detalhes visuais desnecessários.

---

### R5 — Tempo limitado para execução do desafio

Nem todos os cenários possuem o mesmo valor ou precisam ser automatizados.

#### Mitigação

- Priorizar happy paths;
- Priorizar riscos de maior impacto;
- Automatizar cenários de maior retorno;
- Evitar automação de baixo valor ou alto custo de manutenção;
- Documentar os cenários analisados, mesmo quando não selecionados para automação.

---

## 4. Estratégia de testes

A estratégia será distribuída por camadas, buscando executar as validações no nível mais adequado.

### 4.1 API

A camada de API utilizará a **Marvel Developer API**.

A API utiliza:

- GraphQL;
- endpoint único para execução das queries;
- autenticação via Bearer Token;
- payload JSON;
- resposta estruturada em JSON.

A camada será responsável por validar:

- Autenticação;
- Disponibilidade da API;
- Retorno de uma query válida;
- Estrutura da resposta;
- Campos esperados;
- Tratamento de payload inválido;
- Controle de acesso;
- Comportamento diante de requisições inválidas.

Os cenários inicialmente selecionados para automação são:

1. Consultar usuário autenticado com sucesso;
2. Validar estrutura da resposta do usuário;
3. Realizar requisição sem query GraphQL;
4. Realizar requisição sem autenticação.

A validação de valores específicos do usuário será evitada quando não agregar valor ao cenário.

O objetivo é validar contrato e comportamento da API, e não criar dependência de dados pessoais ou valores fixos.

---

### 4.2 Web

### 4.2 Web

A camada Web será utilizada para validar as principais jornadas do usuário no portal Marvel Rivals Heroes.

Os cenários selecionados para automação são:

1. Carregamento da página;
2. Exibição da lista de heróis;
3. Navegação para detalhes;
4. Renderização das imagens.

Durante a exploração da aplicação, não foram identificados controles de filtro disponíveis na tela de seleção de heróis.

Dessa forma, o cenário de filtros inicialmente considerado para automação foi substituído pela validação de renderização das imagens.

A decisão considera o comportamento efetivamente disponível na aplicação e o valor da correta exibição das imagens para a experiência de navegação pelos heróis.

Os demais cenários Web permanecem documentados na matriz e poderão ser avaliados conforme risco e viabilidade técnica.

---

### 4.3 Resiliência

Cenários de indisponibilidade possuem alta relevância neste projeto porque esse risco foi observado durante a execução real do desafio.

Serão considerados:

- Timeout;
- Indisponibilidade de dependências;
- Falhas de comunicação;
- Comportamento da aplicação diante de respostas inesperadas.

Quando aplicável, mocks ou interceptações poderão ser utilizados para produzir cenários determinísticos.

A utilização de mocks será limitada a situações nas quais exista um comportamento real da aplicação que possa ser validado.

---

## 5. Critérios de priorização

A priorização dos testes será baseada nos seguintes fatores:

- Impacto para o usuário;
- Criticidade da funcionalidade;
- Risco de regressão;
- Repetibilidade;
- Valor para detecção rápida de falhas;
- Facilidade de automação;
- Custo de manutenção;
- Dependência de serviços externos;
- Possibilidade de execução determinística.

### Prioridade Alta

Cenários essenciais para funcionamento, autenticação ou fluxos principais.

Exemplos:

- Autenticação da API;
- Consulta válida à API;
- Validação de contrato;
- Controle de acesso;
- Carregamento da aplicação Web;
- Exibição da lista de heróis;
- Navegação para detalhes;
- Timeout;
- Indisponibilidade.

### Prioridade Média

Cenários importantes, porém não bloqueadores do fluxo principal.

Exemplos:

- Filtros;
- Rate limit;
- Requisições inválidas;
- Renderização de imagens;
- Responsividade;
- Loading;
- Erros no console.

### Prioridade Baixa

Cenários complementares ou com menor retorno para automação.

Exemplos:

- Edge cases de baixa frequência;
- Validações redundantes;
- Cenários cujo custo de manutenção seja superior ao risco identificado.

---

## 6. Estratégia de automação

A automação será seletiva.

Nem todos os cenários analisados serão automatizados.

A decisão de automatizar considera:

- Valor do cenário;
- Repetibilidade;
- Risco;
- Estabilidade;
- Custo de implementação;
- Custo de manutenção;
- Possibilidade de execução contínua.

A priorização seguirá, de forma geral:

1. Happy paths;
2. Autenticação;
3. Contratos e validações essenciais;
4. Cenários negativos de alto valor;
5. Cenários de resiliência;
6. Cenários complementares.

A automação não será expandida apenas para aumentar a quantidade de testes.

---

## 7. Escolha da ferramenta

### Playwright + TypeScript

A ferramenta escolhida para a automação será **Playwright com TypeScript**.

A decisão considera:

- Suporte a automação Web;
- Suporte a requisições HTTP;
- Capacidade de testar APIs REST ou GraphQL;
- Possibilidade de manter API e Web na mesma stack;
- Suporte a múltiplos navegadores;
- Suporte a fixtures;
- Execução paralela;
- Interceptação de requisições;
- Recursos de screenshots, vídeos e traces;
- Boa integração com pipelines de CI;
- Menor necessidade de dependências adicionais para atender ao escopo do desafio.

---

### Por que não Cypress + Cucumber?

Cypress também seria uma opção válida para automação Web.

Cucumber possui valor quando existe uma necessidade explícita de BDD ou quando cenários em Gherkin são utilizados como linguagem compartilhada entre áreas técnicas e stakeholders de negócio.

Entretanto, essa necessidade não foi definida neste desafio.

A utilização de Cypress em conjunto com Cucumber adicionaria uma camada adicional de abstração, envolvendo:

- Feature files;
- Step definitions;
- Mapeamento entre cenários Gherkin e implementação;
- Dependências adicionais;
- Maior quantidade de arquivos para manutenção.

Considerando o escopo e o tempo disponível, foi priorizada uma solução que permita manter Web e API no mesmo ecossistema, com menor complexidade estrutural.

Portanto, a escolha do Playwright não representa uma limitação do Cypress ou do Cucumber, mas uma decisão técnica baseada nas necessidades específicas deste projeto.

---

## 8. Distribuição por camada

A estratégia seguirá, de forma geral:

- API para autenticação, contrato, dados e tratamento de respostas;
- Web para validação das principais jornadas do usuário;
- Interceptações ou mocks para cenários controlados de falha e resiliência;
- Cenários transversais quando agregarem valor à cobertura.

O objetivo é evitar concentrar todas as validações na camada Web quando elas puderem ser realizadas de forma mais rápida e sustentável em uma camada inferior.

---

## 9. Dados de teste e configuração

As configurações do projeto serão armazenadas por meio de variáveis de ambiente.

Exemplo:

```env
WEB_BASE_URL=https://www.marvelrivals.com

MARVEL_API_BASE_URL=https://api.marvelapp.com/graphql/
MARVEL_API_TOKEN=your_token_here