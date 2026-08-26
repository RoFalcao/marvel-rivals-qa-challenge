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

- autenticação;
- consumo de API;
- validação de respostas;
- validação de contrato;
- tratamento de erros;
- organização e sustentabilidade da automação.

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| API-01 | Consultar usuário autenticado com sucesso | API | Alta | Sim | Happy path que valida disponibilidade da API, autenticação via Bearer Token e retorno de dados |
| API-02 | Validar estrutura da resposta do usuário | API | Alta | Sim | Valida o contrato básico da resposta e a presença dos campos esperados |
| API-03 | Realizar requisição sem query GraphQL | API | Média | Sim | Valida o tratamento de uma requisição inválida e o retorno de erro esperado |
| API-04 | Realizar requisição sem autenticação | API | Alta | Sim | Valida o controle de acesso a um recurso protegido |
| API-05 | Realizar requisição com token inválido | API | Alta | Não | Cenário relevante, porém possui cobertura semelhante ao cenário sem autenticação e não foi priorizado |
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
| UI-08 | Validar comportamento em falha de carregamento | Web / Integração | Alta | Avaliar | Depende da possibilidade de controlar ou interceptar as requisições realizadas pelo portal |

---

# 3. Cenários transversais

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| TRV-01 | Loading durante requisição | Web | Média | Não | Comportamento complementar aos fluxos principais |
| TRV-02 | Erro de API | Integração | Alta | Não | Parte do tratamento de erro será coberta pelos cenários negativos da Marvel Developer API |
| TRV-03 | Timeout | Integração | Alta | Sim | Valida a resiliência da aplicação quando uma dependência excede o tempo esperado de resposta |
| TRV-04 | Múltiplos cliques | Web | Média | Não | Menor risco em relação aos fluxos funcionais priorizados |
| TRV-05 | Console sem erros | Web | Média | Não | Validação complementar que poderá ser observada durante a execução dos testes |
| TRV-06 | Tratamento de indisponibilidade da API | Integração | Alta | Sim | Risco efetivamente identificado durante o desafio e relevante para demonstrar tratamento de falhas |

---

# 4. Cenários selecionados para automação

A automação foi intencionalmente limitada aos cenários considerados de maior valor para o desafio.

## API

1. `API-01` — Consultar usuário autenticado com sucesso;
2. `API-02` — Validar estrutura da resposta do usuário;
3. `API-03` — Realizar requisição sem query GraphQL;
4. `API-04` — Realizar requisição sem autenticação.

## Web

5. `UI-01` — Validar carregamento da página;
6. `UI-02` — Validar exibição da lista de heróis;
7. `UI-03` — Validar navegação para detalhes;
8. `UI-05` — Validar renderização das imagens.

## Resiliência

9. `TRV-03` — Timeout;
10. `TRV-06` — Tratamento de indisponibilidade da API.

---

# 5. Estratégia da API alternativa

A API originalmente indicada no desafio apresentou indisponibilidade durante o período de desenvolvimento, retornando HTTP `502 Bad Gateway`.

A indisponibilidade foi:

- reproduzida;
- documentada com evidências;
- comunicada aos responsáveis pelo desafio.

Após o reporte, foi autorizada a utilização da **Marvel Developer API** como alternativa para a camada de API.

A substituição não busca reproduzir exatamente o domínio funcional da API original, mas preservar os principais aspectos técnicos avaliados no desafio, como:

- autenticação;
- consumo de API;
- validação de contrato;
- tratamento de respostas;
- cenários positivos e negativos;
- automação;
- organização da solução.

A Marvel Developer API utiliza GraphQL e autenticação por Bearer Token.

Durante a exploração manual da API foram observados os seguintes comportamentos:

### Requisição válida

Uma query autenticada para consulta do usuário retornou dados com sucesso.

Exemplo de comportamento esperado:

```json
{
  "data": {
    "user": {
      "pk": 123,
      "username": "example"
    }
  }
}