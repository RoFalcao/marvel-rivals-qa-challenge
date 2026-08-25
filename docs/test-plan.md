# Test Plan

## 1. Objetivo

Definir a estratégia de qualidade para o desafio **Marvel Rivals QA Challenge**, considerando testes de API, Web e cenários transversais.

A abordagem será baseada em risco, priorizando inicialmente os fluxos de maior impacto para o usuário e para o funcionamento da aplicação.

---

## 2. Escopo

### 2.1 API

A camada de API contempla os cenários relacionados a:

- Listagem de heróis;
- Busca de heróis;
- Detalhes de heróis;
- Validação da estrutura das respostas;
- Tratamento de erros;
- Comportamento em indisponibilidade.

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

### 2.3 Cenários transversais

Também serão considerados cenários relacionados a:

- Loading;
- Erro de API;
- Timeout;
- Múltiplos cliques;
- Erros no console;
- Indisponibilidade da API.

---

## 3. Riscos identificados

### R1 — Indisponibilidade da API

Durante a análise inicial do ambiente, a Marvel Rivals API apresentou resposta HTTP `502 Bad Gateway`.

#### Impactos

- Impossibilidade de executar cenários funcionais contra a API real;
- Impossibilidade de validar as respostas esperadas;
- Bloqueio parcial dos testes de integração;
- Impacto na execução de cenários dependentes do backend.

#### Mitigação

- Documentar a indisponibilidade;
- Manter os testes preparados para execução quando o serviço estiver disponível;
- Utilizar mocks quando aplicável para cenários de erro e resiliência;
- Continuar a execução dos cenários Web independentes da API.

---

### R2 — Dependência de serviços externos

A solução depende de aplicações públicas que não estão sob controle do projeto.

#### Impactos possíveis

- Indisponibilidade;
- Lentidão;
- Alteração de conteúdo;
- Alteração de seletores;
- Mudanças na estrutura da API.

#### Mitigação

- Evitar dados excessivamente rígidos;
- Priorizar asserts funcionais e de contrato;
- Utilizar configurações por ambiente;
- Manter a automação desacoplada.

---

### R3 — Fragilidade dos testes Web

Elementos visuais podem sofrer alterações sem representar uma falha funcional da aplicação.

#### Mitigação

- Priorizar seletores estáveis;
- Evitar dependência excessiva de posição ou estilo;
- Validar comportamento em vez de detalhes visuais desnecessários.

---

### R4 — Tempo limitado para execução do desafio

Nem todos os cenários possuem o mesmo valor ou precisam ser automatizados.

#### Mitigação

- Priorizar happy paths;
- Priorizar riscos de maior impacto;
- Automatizar cenários de maior retorno;
- Evitar automação de baixo valor ou alto custo de manutenção.

---

## 4. Estratégia de testes

A estratégia será distribuída por camadas, buscando executar as validações no nível mais adequado.

### 4.1 API

A camada de API será responsável por validar:

- Status HTTP;
- Estrutura da resposta;
- Campos obrigatórios;
- Conteúdo relevante;
- Comportamento para dados inexistentes;
- Tratamento de falhas.

Os testes de API serão priorizados por permitirem validações mais rápidas e menos dependentes da interface.

Enquanto a API real estiver indisponível, os cenários permanecerão preparados para execução quando o serviço for restabelecido.

Cenários específicos de erro e resiliência poderão utilizar respostas simuladas quando aplicável.

---

### 4.2 Web

A camada Web será utilizada para validar as principais jornadas do usuário.

A primeira etapa da automação será concentrada nos fluxos felizes:

1. Carregamento da página;
2. Exibição da lista de heróis;
3. Navegação para detalhes.

Após a cobertura dos principais fluxos, serão avaliados cenários relacionados a:

- Filtros;
- Imagens;
- Responsividade;
- Acessibilidade;
- Tratamento de erros.

---

### 4.3 Resiliência

Cenários de indisponibilidade possuem alta relevância neste projeto porque o risco foi observado durante a execução real do desafio.

Serão considerados:

- Erro de API;
- Timeout;
- Indisponibilidade;
- Falha de carregamento da interface.

Sempre que aplicável, esses cenários poderão utilizar mocks para garantir comportamento controlado e determinístico.

---

## 5. Critérios de priorização

A priorização dos testes será baseada nos seguintes fatores:

- Impacto para o usuário;
- Criticidade da funcionalidade;
- Frequência de uso;
- Risco de regressão;
- Facilidade de automação;
- Custo de manutenção;
- Dependência de serviços externos.

### Prioridade Alta

Cenários essenciais para o funcionamento principal da aplicação ou associados a riscos de alto impacto.

Exemplos:

- Carregamento da aplicação;
- Listagem de heróis;
- Busca principal;
- Detalhe de herói;
- Validação de contrato;
- Erro de API;
- Timeout;
- Indisponibilidade.

### Prioridade Média

Cenários importantes, porém não bloqueadores do fluxo principal.

Exemplos:

- Filtros;
- Renderização de imagens;
- Campos nulos;
- Responsividade;
- Loading;
- Erros no console.

### Prioridade Baixa

Cenários complementares ou com menor retorno para a automação inicial.

Exemplos:

- Caracteres especiais;
- Combinações pouco frequentes;
- Cenários cujo custo de manutenção seja superior ao risco identificado.

---

## 6. Estratégia de automação

A automação será seletiva.

Nem todos os cenários serão automatizados apenas por estarem disponíveis no escopo.

A decisão de automatizar considera:

- Valor para o usuário;
- Repetibilidade;
- Risco;
- Estabilidade;
- Custo de manutenção;
- Possibilidade de execução contínua.

A ordem inicial de priorização será:

1. Happy paths;
2. Contratos e validações essenciais;
3. Cenários negativos de alto impacto;
4. Cenários de resiliência;
5. Cenários secundários e edge cases.

---

## 7. Escolha da ferramenta

### Playwright + TypeScript

A ferramenta escolhida para a automação será **Playwright com TypeScript**.

A decisão considera:

- Suporte a automação Web;
- Suporte a requisições HTTP;
- Possibilidade de manter testes de API e Web na mesma stack;
- Suporte a múltiplos navegadores;
- Suporte a fixtures;
- Execução paralela;
- Recursos para screenshots, vídeos e traces;
- Boa integração com pipelines de CI;
- Menor necessidade de dependências adicionais para atender ao escopo do desafio.

---

### Por que não Cypress + Cucumber?

Cypress também seria uma opção válida para a automação Web.

Cucumber também possui valor quando existe uma necessidade explícita de BDD e quando os cenários em Gherkin são utilizados como linguagem compartilhada entre áreas técnicas e stakeholders de negócio.

Entretanto, para este desafio, essa necessidade não foi definida.

A utilização de Cypress em conjunto com Cucumber adicionaria uma camada adicional de abstração, envolvendo:

- Feature files;
- Step definitions;
- Mapeamento entre cenários Gherkin e implementação;
- Dependências adicionais;
- Maior quantidade de arquivos para manutenção.

Considerando o escopo e o tempo disponível, foi priorizada uma solução com menor complexidade estrutural e que permita manter testes de API e Web no mesmo ecossistema.

Portanto, a escolha do Playwright não representa uma limitação do Cypress ou do Cucumber, mas uma decisão técnica baseada nas necessidades específicas deste projeto.

---

## 8. Distribuição por camada

A estratégia seguirá, de forma geral:

- API para validações de contrato, dados e regras de integração;
- Web para validação das principais jornadas do usuário;
- Mocks para cenários controlados de falha e resiliência;
- Cenários transversais quando agregarem valor à cobertura.

O objetivo é evitar concentrar todas as validações na camada Web quando elas puderem ser realizadas de forma mais rápida e sustentável em uma camada inferior.

---

## 9. Limitações conhecidas

Durante o desenvolvimento, a Marvel Rivals API apresentou indisponibilidade com resposta HTTP `502 Bad Gateway`.

Por esse motivo:

- Cenários funcionais de API não podem ser validados contra o ambiente real enquanto a indisponibilidade persistir;
- Testes de API poderão ser estruturados, porém sua execução real permanecerá bloqueada;
- Cenários de resiliência poderão utilizar mocks quando aplicável;
- O tempo de resposta do erro `502` não será considerado evidência válida da performance funcional da API.

A indisponibilidade foi comunicada aos responsáveis pelo desafio.

---

## 10. Critérios de saída

A execução será considerada suficiente para entrega quando:

- Os cenários estiverem classificados e priorizados;
- Os principais happy paths Web estiverem automatizados;
- Os testes de API prioritários estiverem estruturados;
- As limitações conhecidas estiverem documentadas;
- Cenários de erro relevantes estiverem cobertos quando tecnicamente possível;
- Evidências relevantes estiverem disponíveis;
- As instruções de instalação e execução estiverem documentadas no README.