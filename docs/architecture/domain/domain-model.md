# Modelo de Domínio (Domain Model) — Flashcards App (FSRS v6)

## 1. Visão Geral do Domínio

O **Domínio** deste sistema representa as regras de negócio puras para a gestão de estudos baseados em **Repetição Espaçada (Spaced Repetition)** com o algoritmo **FSRS v6**. 

Seguindo os princípios de *Domain-Driven Design (DDD)* e *Clean Architecture*, esta camada é totalmente isolada da interface de usuário (React Native), do ecossistema do dispositivo e dos mecanismos de persistência (arquivos JSON).

---

## 2. Conceitos e Entidades Principais

### 2.1. Entidade `Card` (Unidade de Estudo)
Representa o cartão individual e a sua respectiva pegada de memória na mente do usuário. Combina o conteúdo informativo com os parâmetros matemáticos do algoritmo FSRS v6.

* **Responsabilidades:**
  * Armazenar o conteúdo bruto de estudo (frente e verso).
  * Manter o estado de aprendizagem e retenção calculado pelo FSRS v6.
  * Gerenciar sinalizações de erro ou anotações manuais pelo usuário.

* **Atributos de Negócio:**
  * `id`: Identificador único do cartão.
  * `front`: Texto/Pergunta apresentada na frente do cartão.
  * `back`: Texto/Resposta apresentada no verso do cartão.
  * `due`: Data e hora em que o cartão deve ser revisado.
  * `stability` ($S$): Estimativa de estabilidade da memória (em dias).
  * `difficulty` ($D$): Grau de dificuldade percebido da informação.
  * `elapsed_days`: Dias decorridos desde a última revisão.
  * `scheduled_days`: Intervalo de dias agendado para a revisão atual.
  * `reps`: Número total de revisões efetuadas.
  * `lapses`: Quantidade de falhas/esquecimentos.
  * `state`: Estado atual do cartão (Novo, Aprendizagem, Revisão, Reaprendizagem).
  * `flagActive`: Indicador booleano de erro/sinalização.
  * `flagNote`: Anotação opcional referente à sinalização de erro.

---

### 2.2. Entidade `Deck` (Agrupamento e Limites)
Representa o baralho de cartões sobre um tema específico e define as configurações de estudo aplicáveis ao grupo.

* **Responsabilidades:**
  * Agrupar a coleção de objetos `Card`.
  * Definir e aplicar meta de retenção e limites diários de estudo.

* **Atributos de Negócio:**
  * `deckName`: Nome do baralho.
  * `deckDescription`: Descrição do tema do baralho.
  * `deckTag`: Etiquetas para categorização.
  * `retention`: Taxa de retenção desejada para o algoritmo FSRS.
  * `sessionCardLimit`: Limite máximo de cartões por sessão.
  * `dailyNewCardLimit`: Limite diário de novos cartões a introduzir.
  * `cards`: Coleção de cartões (`Card[]`).

---

### 2.3. Classe de Aplicação/Sessão `Study` (Orquestração do UC08)
Orquestra o fluxo de execução de uma sessão de estudo ativa, gerenciando a fila de apresentação e o histórico de ações.

* **Responsabilidades:**
  * Construir a fila de estudo (`studyQueue`) respeitando os limites do baralho e a priorização dos cartões devidos.
  * Controlar o avanço da sessão via índice atual.
  * Registrar o estado anterior para permitir a funcionalidade de *Desfazer* (*Undo*).
  * Fixar a data/hora lógica da sessão (respeitando o corte das 04h00 da manhã).

* **Atributos de Controle:**
  * `deck`: Referência ao baralho em estudo.
  * `studyQueue`: Lista ordenada dos cartões a apresentar na sessão.
  * `currentIndex`: Posição do cartão atual a ser apresentado.
  * `lastReviewState`: Registro do estado anterior do último cartão avaliado (suporte a Undo).
  * `sessionDate`: Data/hora em que a sessão foi iniciada.

---

## 3. Regras de Fronteira e Persistência

1. **Independência do Domínio:** As entidades `Card` e `Deck` não possuem referências ao módulo `fs` do Node.js, nem a formatadores JSON, nem a bibliotecas visuais.
2. **Padrão Repository:** A conversão de/para arquivos JSON é gerenciada exclusivamente pela classe de infraestrutura `DeckRepository`, mantendo o domínio puro.
