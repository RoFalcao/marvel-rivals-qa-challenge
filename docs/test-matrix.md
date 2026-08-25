# Test Matrix

## Critérios

### Prioridade

- **Alta:** fluxo crítico, alto impacto para o usuário ou risco relevante;
- **Média:** funcionalidade importante, porém não bloqueadora;
- **Baixa:** cenário complementar ou de menor retorno para automação.

### Automação

- **Sim:** cenário selecionado para automação;
- **Não:** cenário analisado, porém não selecionado para automação com base em risco, valor e custo-benefício;
- **Não — API indisponível:** cenário relevante para automação, porém impossibilitado de execução devido à indisponibilidade da API durante o desafio;
- **Avaliar:** decisão depende do comportamento observado durante a exploração da aplicação.

---

# 1. API — Heróis

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| HERO-01 | Listar heróis com sucesso | API | Alta | Não — API indisponível | Happy path principal da API; execução impossibilitada pela indisponibilidade do serviço |
| HERO-02 | Validar estrutura da resposta | API | Alta | Não — API indisponível | Validação importante de contrato, porém não é possível obter uma resposta funcional da API |
| HERO-03 | Validar quantidade de registros retornados | API | Média | Não — API indisponível | Depende de resposta funcional e dados reais da API |
| HERO-04 | Validar comportamento sem resultados | API | Média | Não — API indisponível | Não é possível diferenciar ausência de resultados de indisponibilidade enquanto o serviço retorna erro |
| HERO-05 | Avaliar tempo de resposta da API | API | Média | Não — API indisponível | O tempo de resposta de um erro 502 não representa a performance funcional do serviço |

---

# 2. API — Busca

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| BUS-01 | Buscar herói por nome | API | Alta | Não — API indisponível | Happy path importante, porém depende da disponibilidade do serviço |
| BUS-02 | Buscar herói por trecho do nome | API | Média | Não — API indisponível | Depende da execução funcional da busca |
| BUS-03 | Buscar herói inexistente | API | Alta | Não — API indisponível | Cenário negativo relevante, mas exige resposta funcional da API |
| BUS-04 | Buscar com campo vazio | API | Média | Não — API indisponível | Não é possível validar o comportamento esperado com o serviço indisponível |
| BUS-05 | Buscar com caracteres especiais | API | Baixa | Não | Edge case com menor prioridade para o escopo de automação definido |

---

# 3. API — Detalhe

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| DET-01 | Exibir detalhe do herói | API | Alta | Não — API indisponível | Happy path relevante, porém depende da disponibilidade da API |
| DET-02 | Validar atributos retornados | API | Alta | Não — API indisponível | Necessita resposta funcional para validar integridade dos dados |
| DET-03 | Validar tratamento de herói inexistente | API | Média | Não — API indisponível | Não é possível validar corretamente o comportamento esperado |
| DET-04 | Validar tratamento de campos nulos | API | Média | Não — API indisponível | Depende de dados retornados pelo serviço |
| DET-05 | Validar estrutura da resposta | API | Alta | Não — API indisponível | Validação de contrato bloqueada pela indisponibilidade da API |

---

# 4. Web

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|---|---|
| UI-01 | Validar carregamento da página | Web | Alta | Sim | Smoke test e pré-condição para as demais jornadas |
| UI-02 | Validar exibição da lista de heróis | Web | Alta | Sim | Representa a funcionalidade principal da página |
| UI-03 | Validar navegação para detalhes | Web | Alta | Sim | Jornada principal do usuário para consultar informações de um herói |
| UI-04 | Validar filtros disponíveis | Web | Média | Sim | Funcionalidade relevante para localização e exploração dos heróis |
| UI-05 | Validar renderização das imagens | Web | Média | Não | Pode ser validado durante os fluxos principais sem necessidade de um cenário automatizado dedicado |
| UI-06 | Validar responsividade básica | Web | Média | Não | Importante, porém possui menor prioridade em relação aos principais fluxos funcionais |
| UI-07 | Validar acessibilidade básica | Web | Média | Não | Relevante, mas exige uma abordagem específica e não foi priorizado no recorte de automação |
| UI-08 | Validar comportamento em falha de carregamento | Web / Integração | Alta | Avaliar | Depende da possibilidade de controlar ou interceptar as requisições realizadas pelo portal |

---

# 5. Cenários transversais

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|---|-------------|---|
| TRV-01 | Loading durante requisição | Web | Média | Não         | Comportamento complementar aos fluxos principais |
| TRV-02 | Erro de API | Integração | Alta | Não         | O escopo da automação foi concentrado nos principais fluxos funcionais Web |
| TRV-03 | Timeout | Integração | Alta | Sim         | Valida a resiliência da aplicação quando uma dependência excede o tempo esperado de resposta |
| TRV-04 | Múltiplos cliques | Web | Média | Não         | Menor risco em relação aos fluxos funcionais priorizados |
| TRV-05 | Console sem erros | Web | Média | Não         | Validação complementar que poderá ser observada durante a execução dos testes |
| TRV-06 | Tratamento de indisponibilidade da API | Integração | Alta | Sim         | Risco efetivamente identificado durante o desafio e relevante para demonstrar tratamento de falhas |

---

# 6. Cenários selecionados para automação

A automação foi intencionalmente limitada aos cenários considerados de maior valor para o desafio.

## Web

1. `UI-01` — Validar carregamento da página;
2. `UI-02` — Validar exibição da lista de heróis;
3. `UI-03` — Validar navegação para detalhes;
4. `UI-04` — Validar filtros disponíveis.

## Resiliência

5. `TRV-03` — Timeout;
6. `TRV-06` — Tratamento de indisponibilidade da API.

---

# 7. Cenários de API

Os cenários de API foram analisados e priorizados na matriz, porém sua automação e execução foram impactadas pela indisponibilidade do serviço durante o período de desenvolvimento.

Durante a análise, a API apresentou resposta HTTP `502 Bad Gateway`, impossibilitando a validação confiável dos fluxos funcionais.

A indisponibilidade foi comunicada aos responsáveis pelo desafio.

A decisão de não substituir silenciosamente a API real por dados simulados nos cenários funcionais busca preservar a confiabilidade das evidências apresentadas.

Mocks poderão ser utilizados apenas quando fizerem parte de um cenário explicitamente voltado à simulação de falhas ou resiliência.

---

# 8. Estratégia de seleção

A seleção dos cenários automatizados considera:

- Criticidade do fluxo;
- Impacto para o usuário;
- Frequência de utilização;
- Valor para detecção de regressões;
- Risco observado;
- Custo de implementação;
- Custo de manutenção;
- Disponibilidade do ambiente.

A estratégia prioriza qualidade e sustentabilidade da suíte em vez da quantidade de casos automatizados.

Os cenários não selecionados continuam documentados como parte da análise de cobertura, mas não serão implementados apenas para aumentar artificialmente a quantidade de testes.