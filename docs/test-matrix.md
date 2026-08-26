# Test Matrix

## Critérios

### Prioridade

- **Alta:** fluxo crítico, alto impacto para o usuário ou risco relevante;
- **Média:** funcionalidade importante, porém não bloqueadora;
- **Baixa:** cenário complementar ou de menor retorno para automação.

### Automação

- **Sim:** cenário selecionado para automação;
- **Não:** cenário analisado, porém não selecionado para automação com base em risco, valor e custo-benefício;
- **Avaliar:** decisão depende do comportamento observado durante a exploração da aplicação.

---

# 1. API — Marvel Developer API

A API originalmente proposta no desafio apresentou indisponibilidade HTTP `502 Bad Gateway`.

Após o reporte da indisponibilidade, foi autorizada pelos responsáveis pelo desafio a utilização da **Marvel Developer API** como alternativa para a execução da camada de API.

Os cenários abaixo foram adaptados para preservar os principais aspectos avaliados no desafio:

- Autenticação;
- Consumo de API;
- Validação de respostas;
- Validação de contrato;
- Tratamento de erros;
- Organização e sustentabilidade da automação.

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| API-01 | Consultar usuário autenticado com sucesso | API | Alta | Sim | Happy path que valida disponibilidade da API, autenticação via Bearer Token e retorno de dados |
| API-02 | Validar estrutura da resposta do usuário | API | Alta | Sim | Valida o contrato básico da resposta e a presença dos campos esperados |
| API-03 | Realizar requisição sem query GraphQL | API | Média | Sim | Valida o tratamento de uma requisição inválida e o retorno de erro esperado |
| API-04 | Realizar requisição sem autenticação | API | Alta | Sim | Valida que uma requisição não autenticada utiliza o schema público limitado e restringe o acesso ao recurso protegido |
| API-05 | Realizar requisição com token inválido | API | Alta | Sim | Valida o tratamento de um Bearer Token inválido e o retorno HTTP 401 para credencial inválida ou expirada |
| API-06 | Validar informações de rate limit | API | Média | Não | Informação importante para análise da API, mas não prioritária para a automação selecionada |
| API-07 | Validar tempo de resposta da API | API | Média | Não | Relevante para observação, porém não priorizado sem definição de baseline ou SLA específico |

---

# 2. Web

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| UI-01 | Validar carregamento da página | Web | Alta | Sim | Smoke test e pré-condição para as demais jornadas |
| UI-02 | Validar exibição da lista de heróis | Web | Alta | Sim | Representa a funcionalidade principal da página |
| UI-03 | Validar navegação para detalhes | Web | Alta | Sim | Jornada principal do usuário para consultar informações de um herói |
| UI-04 | Validar filtros disponíveis | Web | Média | Não | Durante a exploração da interface não foram identificados filtros disponíveis na tela de seleção de heróis |
| UI-05 | Validar renderização das imagens | Web | Média | Sim | Imagens são parte relevante da experiência de navegação e podem falhar mesmo quando o restante da página carrega |
| UI-06 | Validar responsividade básica | Web | Média | Não | Importante, porém possui menor prioridade em relação aos principais fluxos funcionais |
| UI-07 | Validar acessibilidade básica | Web | Média | Não | Relevante, mas exige abordagem específica e não foi priorizado no recorte de automação |
| UI-08 | Validar comportamento em falha de carregamento | Web / Integração | Alta | Não | Cenário relevante, porém não selecionado no recorte final de automação devido à dependência de controle das requisições realizadas pelo portal |

---

# 3. Cenários transversais

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| TRV-01 | Loading durante requisição | Web | Média | Não | Comportamento complementar aos fluxos principais |
| TRV-02 | Erro de API | Integração | Alta | Não | Parte do tratamento de erro é coberta pelos cenários negativos da Marvel Developer API |
| TRV-03 | Timeout | API / Resiliência | Alta | Sim | Valida de forma controlada o tratamento de uma requisição que excede o limite de tempo configurado |
| TRV-04 | Múltiplos cliques | Web | Média | Não | Menor risco em relação aos fluxos funcionais priorizados |
| TRV-05 | Console sem erros | Web | Média | Não | Validação complementar que pode ser observada durante a execução dos testes |
| TRV-06 | Tratamento de indisponibilidade da API | API / Resiliência | Alta | Sim | Valida a identificação controlada de indisponibilidade de uma dependência sem provocar falha no serviço real |

---

# 4. Cenários selecionados para automação

A automação foi intencionalmente limitada aos cenários considerados de maior valor para o desafio.

## API

1. `API-01` — Consultar usuário autenticado com sucesso;
2. `API-02` — Validar estrutura da resposta do usuário;
3. `API-03` — Realizar requisição sem query GraphQL;
4. `API-04` — Realizar requisição sem autenticação;
5. `API-05` — Realizar requisição com token inválido.

## Web

1. `UI-01` — Validar carregamento da página;
2. `UI-02` — Validar exibição da lista de heróis;
3. `UI-03` — Validar navegação para detalhes;
4. `UI-05` — Validar renderização das imagens.

## Resiliência

1. `TRV-03` — Timeout;
2. `TRV-06` — Tratamento de indisponibilidade da API.

**Total automatizado: 11 cenários.**

---

# 5. Comportamentos observados na API alternativa

Durante a exploração manual da **Marvel Developer API** foram observados comportamentos utilizados como referência para a definição e implementação dos testes automatizados.

### Requisição autenticada válida

Uma query válida utilizando Bearer Token retornou HTTP `200` e os dados do usuário.

Exemplo de comportamento observado:

```json
{
  "data": {
    "user": {
      "pk": 123,
      "username": "example"
    }
  }
}
```

Os valores específicos do usuário não são utilizados como dados fixos na automação.

Esse comportamento é validado pelos cenários `API-01` e `API-02`.

### Requisição sem query GraphQL

Uma requisição autenticada sem uma query GraphQL retornou HTTP `400`.

```json
{
  "errors": [
    {
      "message": "Must provide query string."
    }
  ]
}
```

Esse comportamento é validado pelo cenário `API-03`.

### Requisição sem autenticação

Uma requisição sem Bearer Token utilizou o schema público limitado e retornou HTTP `400` ao tentar acessar o campo `user`.

A resposta informou que a requisição não estava autenticada e que o acesso estava sendo realizado por meio do schema público.

Esse comportamento é validado pelo cenário `API-04`.

### Requisição com token inválido

Uma requisição utilizando um Bearer Token inválido retornou HTTP `401 Unauthorized`.

```json
{
  "errors": [
    {
      "message": "OAuth2 token expired or invalid"
    }
  ]
}
```

Esse comportamento é validado pelo cenário `API-05`.