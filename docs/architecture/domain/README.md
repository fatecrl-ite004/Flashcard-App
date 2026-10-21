# Camada de Domínio (Domain Layer)

Esta pasta contém o núcleo conceitual e as **regras de negócio puras** do aplicativo de flashcards, desenvolvido como projeto de TCC com suporte ao algoritmo de repetição espaçada **FSRS v6**.

---

## Filosofia e Arquitetura

Seguindo os princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**, esta camada foi projetada sob uma regra estrita:

> **O Domínio não conhece o mundo exterior.** 
> As classes aqui dentro não sabem o que é React Native, não fazem manipulação de arquivos JSON e não possuem dependências de bibliotecas de terceiros ou de interface gráfica. Elas cuidam exclusivamente de como o estudo, os baralhos e a memória funcionam.

---

## 📂 Estrutura da Pasta

* **`Card.ts`**: Entidade que representa o cartão de estudo, unindo o conteúdo bruto (frente e verso) aos parâmetros matemáticos do FSRS v6 (estabilidade, dificuldade, estado, revisões e flags).
* **`Deck.ts`**: Entidade que representa o baralho, agrupando os cartões e definindo as políticas e limites de estudo (como limites diários e meta de retenção).
* **`Study.ts`**: Classe de orquestração responsável por gerenciar a sessão de estudo ativa (fila de cartões, controle de índice e suporte ao *Undo*).
* **`diagrams/`**: Contém os diagramas UML em Mermaid (`.mmd`) que documentam a modelagem de classes e o fluxo de revisão.
* **`domain-model.md`**: Documentação detalhada em texto do modelo de domínio e suas regras de negócio.

---

## Vantagens desta Abordagem
1. **Independência Tecnológica:** Se a interface ou a forma de persistência mudarem no futuro, a lógica de negócio permanece intacta.
2. **Testabilidade:** As regras do FSRS e dos baralhos podem ser testadas de forma isolada e rápida.
3. **Clareza Acadêmica:** Facilita a visualização e a explicação da arquitetura do sistema para a banca avaliadora do TCC.
