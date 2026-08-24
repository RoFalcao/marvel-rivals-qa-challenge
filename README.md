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

**Marvel Rivals API**

A API será utilizada para validação dos cenários relacionados a heróis, busca e detalhes.

> **Status durante o desenvolvimento:** foi identificada indisponibilidade da documentação/serviço da Marvel Rivals API, com retorno HTTP `502 Bad Gateway`. Essa limitação está sendo considerada na estratégia de testes e será documentada neste projeto.

### Web

**Marvel Rivals Heroes**

O portal público será utilizado como aplicação de referência para os testes de interface Web.

## Estratégia de testes

A estratégia será baseada em testes distribuídos por camadas:

- **API:** validação de contratos, status HTTP, estrutura e conteúdo das respostas;
- **Web:** validação dos principais fluxos e comportamentos da interface;
- **Cenários transversais:** validação de erros, timeout e indisponibilidade de serviços.

A priorização dos cenários será realizada considerando risco, impacto e relevância para o usuário.

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
├── evidencias/
├── fixtures/
│   └── mocks/
├── tests/
│   ├── api/
│   └── web/
├── .env.example
├── .gitignore
└── README.md
```

## Tecnologias

As tecnologias e ferramentas utilizadas na automação serão documentadas conforme a evolução da solução.

## Configuração

As configurações do ambiente serão realizadas por meio de variáveis de ambiente.

Um exemplo das variáveis necessárias está disponível em:

`.env.example`

Dados sensíveis não devem ser versionados no repositório.

## Instalação

As instruções de instalação serão adicionadas após a definição e configuração da stack de automação.

## Execução dos testes

As instruções para execução dos testes de API e Web serão adicionadas conforme a implementação da automação.

## Evidências

As evidências relevantes das execuções serão armazenadas no diretório:

`evidencias/`

## Limitações conhecidas

Durante a análise inicial do ambiente, foi identificada indisponibilidade da Marvel Rivals API/documentação, apresentando resposta HTTP `502 Bad Gateway`.

A indisponibilidade foi comunicada aos responsáveis pelo desafio e será considerada na estratégia de testes, principalmente nos cenários relacionados a tratamento de falhas e indisponibilidade de serviços.

## Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento deste projeto.

O uso de IA, as validações realizadas e as decisões técnicas tomadas durante o desenvolvimento serão documentados nesta seção ao final da implementação.

> Todo conteúdo gerado com auxílio de IA será revisado e validado antes de ser incorporado à solução.