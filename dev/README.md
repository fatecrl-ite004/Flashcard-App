# Flashcard Domain Lab

Primeira implementação executável do domínio do Flashcard App. O projeto usa
TypeScript puro para estudar o `ts-fsrs` antes de introduzir React Native,
SQLite, importadores ou UI.

## Estado desta etapa

Esta entrega prova a cadeia mínima:

```text
Deck -> Card -> reviewCard() -> ts-fsrs -> novo estado do Card
```

O projeto fixa `ts-fsrs@5.4.1`. Essa é a versão do pacote; ela informa em runtime
que implementa o algoritmo `FSRS-6.0`. Portanto, **versão da biblioteca** e
**versão do algoritmo** são números diferentes.

## Requisitos e instalação

- Node.js 20 ou superior;
- npm.

```bash
node --version
npm install
```

O requisito de Node 20 vem do próprio `ts-fsrs`.

## Como explorar

Comece pela API sem abstração:

```bash
npm run playground
```

Esse script importa o `ts-fsrs` diretamente, cria um card novo em uma data fixa,
executa `repeat()` e imprime os quatro futuros possíveis com os objetos completos.
Ele é um laboratório, não código que a UI usará.

Depois, execute os mesmos comportamentos através da nossa camada de domínio:

```bash
npm run scenario:create
npm run scenario:again
npm run scenario:hard
npm run scenario:good
npm run scenario:easy
npm run scenario:all
```

Por fim, verifique os tipos:

```bash
npm run typecheck
```

## Ordem de leitura sugerida

1. `scripts/playground.ts`: API real e objetos completos do `ts-fsrs`;
2. `src/domain/card/card.ts`: nosso `Card` e seu estado de agendamento;
3. `src/domain/review/review-rating.ts`: ratings independentes da biblioteca;
4. `src/domain/review/review-card.ts`: fronteira e mapeamento para o FSRS;
5. `scripts/scenarios/`: consumidores do domínio, como a UI será futuramente.

## O mínimo do `ts-fsrs` para uma revisão

### 1. Criar um card

```ts
const card = createEmptyCard(reviewedAt);
```

Passamos uma data explicitamente para que até o estado inicial seja
determinístico. Sem argumento, a biblioteca usa o horário atual.

### 2. Criar o scheduler

```ts
const scheduler = fsrs({ request_retention: 0.9 });
```

`fsrs()` aceita parâmetros parciais e preenche os restantes com os defaults.
Por isso, ainda não precisamos de `generatorParameters()`. Ele será útil se um
dia decidirmos serializar a configuração completa do algoritmo.

### 3. Pré-visualizar ou aplicar

```ts
const preview = scheduler.repeat(card, reviewedAt);
const result = scheduler.next(card, reviewedAt, Rating.Good);
```

- `repeat()` calcula `Again`, `Hard`, `Good` e `Easy`; é útil para inspeção ou
  para exibir intervalos antes da resposta.
- `next()` recebe a resposta já escolhida e devolve `{ card, log }`; é a operação
  usada por `reviewCard()`.

Nenhuma dessas chamadas exige banco de dados. O domínio recebe um objeto e
devolve outro objeto; a persistência entrará depois.

## Campos observados no card do FSRS

| Campo da biblioteca | Significado nesta etapa | Decisão inicial |
| --- | --- | --- |
| `due` | instante da próxima revisão | manter como `scheduling.due` |
| `stability` | estabilidade da memória em dias; quanto maior, mais lentamente a lembrança decai | persistir |
| `difficulty` | dificuldade estimada pelo FSRS | persistir |
| `scheduled_days` | intervalo agendado em dias inteiros | persistir como `scheduledDays` |
| `learning_steps` | posição atual nos passos curtos de aprendizagem | persistir como `learningStep` |
| `reps` | quantidade de respostas aplicadas ao card | persistir como `repetitions` |
| `lapses` | esquecimentos ocorridos quando o card já estava em revisão | persistir |
| `state` | `New`, `Learning`, `Review` ou `Relearning` | mapear para strings próprias em minúsculas |
| `last_review` | instante da última resposta | persistir como `lastReviewedAt` |
| `elapsed_days` | dias decorridos, recalculados a partir da última revisão | não colocar no modelo próprio; está obsoleto no pacote atual |

O `ReviewLog` atual também contém `last_elapsed_days`, já obsoleto. Nesta fase,
nosso `ReviewTransition` preserva snapshots `before` e `after` em vez de expor o
tipo de log da biblioteca ao resto do aplicativo.

## Resultado do primeiro experimento

Entradas fixas:

- revisão: `2026-08-20 20:00:00 -03:00`;
- retenção desejada: `0.9`;
- passos de aprendizagem default: `1m` e `10m`;
- card no estado `new`.

| Rating | Próximo estado | Próxima revisão | Stability | Difficulty |
| --- | --- | ---: | ---: | ---: |
| `again` | `learning` | 1 minuto | 0.212 | 6.4133 |
| `hard` | `learning` | 6 minutos | 1.2931 | 5.11217071 |
| `good` | `learning` | 10 minutos | 2.3065 | 2.11810397 |
| `easy` | `review` | 8 dias | 8.2956 | 1 |

Três observações importantes:

1. `Hard` resulta em 6 minutos porque a biblioteca calcula um passo
   intermediário entre `1m` e `10m`.
2. O `Good` já produz estabilidade de aproximadamente 2,3 dias, mas o `due`
   continua em 10 minutos porque o card ainda precisa concluir os passos curtos
   de aprendizagem.
3. `Again` em um card novo não aumenta `lapses`; um lapse é um esquecimento de
   um card que já estava no estado de revisão.

## Decisões de domínio tomadas

- A UI usará ratings próprios: `"again" | "hard" | "good" | "easy"`.
- Tipos, enums e nomes `snake_case` do `ts-fsrs` não atravessam a API pública do
  domínio.
- Dados de agendamento ficam agrupados em `card.scheduling`.
- `reviewCard()` recebe `reviewedAt`; ele nunca busca o horário atual sozinho.
- A função devolve um novo card e não altera o objeto recebido.
- A retenção é validada somente pelo limite técnico `(0, 1]`. Um intervalo de UX
  mais estreito ainda será uma decisão de produto, não uma suposição desta etapa.
- Dentro de `src/domain`, somente `review/review-card.ts` importa `ts-fsrs`.

## Deliberadamente ausente

- React Native, Expo e Android;
- SQLite e repositories;
- importação de decks;
- Zod ou outro schema de fronteira;
- configuração avançada do FSRS;
- framework de testes.

Os testes automatizados entram depois de transformarmos os próximos cenários
exploratórios — segunda revisão, graduação, lapse e mudança de retenção — em
comportamentos que decidimos garantir permanentemente.

## Referências oficiais

- [Repositório do ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)
- [Documentação da API](https://open-spaced-repetition.github.io/ts-fsrs/)
