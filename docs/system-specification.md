# Requisitos Funcionais (RF)

# RF01 - Importar e Configurar Deck do Acervo

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve permitir que o usuário selecione um deck pré-existente do acervo e defina suas preferências iniciais, como nome local, tags, cor e parâmetros de retenção FSRS, antes de confirmá-lo e adicioná-lo à sua biblioteca.

# RF02 - Visualização do Acervo

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve exibir uma lista com todos os decks pré-cadastrados disponíveis na plataforma.

# RF03 - Personalização do Título

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Desejável<br>
>
> **Descrição:** O usuário deve conseguir criar e alterar o título de exibição de qualquer deck da sua biblioteca.

# RF04 - Atribuição de Cor

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Desejável<br>
>
> **Descrição:** O usuário deve poder escolher e editar uma cor de sinalização/etiqueta para organizar e identificar visualmente cada deck.

# RF05 - Configuração de Retenção

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Importante<br>
>
> **Descrição:** O usuário deve poder definir suas preferências de retenção, como taxa de acerto desejada, quantidade de cards novos por dia e intervalo de repetição espaçada.

# RF06 - Seleção de Deck para Estudo

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve permitir que o usuário inicie uma sessão de estudo a partir de qualquer deck disponível.

# RF07 - Exibição do Card

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve apresentar a frente do card e manter o verso oculto até que o usuário solicite sua revelação.

# RF08 - Revelar Verso do Card (Giro)

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve permitir que o usuário clique ou toque no card em exibição para realizar uma animação de giro e revelar o verso, contendo o conteúdo da resposta.

# RF09 - Inserção de Resposta Escrita

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve disponibilizar um campo de texto na frente do card para que o usuário digite sua resposta antes de solicitar a revelação do verso. Ao virar o card, o sistema deve comparar o texto digitado com a resposta correta.

# RF10 - Voltar Card Anterior

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Desejável<br>
>
> **Descrição:** O sistema deve disponibilizar, no campo de estudos, uma opção para retornar ao card anterior e permitir sua visualização novamente por escolha do usuário.

# RF11 - Encerrar Sessão de Estudo

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve permitir que o usuário interrompa e saia da sessão de estudo a qualquer momento, garantindo o salvamento do progresso dos cards já respondidos e retornando o usuário à biblioteca de decks.

# RF12 - Feedback de Desempenho

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O usuário deve poder classificar sua facilidade ou desempenho em relação ao card após revelar o verso, utilizando opções como "Fácil", "Bom", "Difícil" ou "Errei".

# RF13 - Cálculo de Repetição

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema deve aplicar a regra de retenção e repetição configurada para agendar a próxima exibição do card com base no feedback fornecido pelo usuário.

# RF14 - Indicador de Status do Deck

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Importante<br>
>
> **Descrição:** O sistema deve exibir visualmente o progresso do usuário em cada deck, incluindo informações como cards pendentes, estudados e concluídos no dia.

# RF15 - Finalizar Sessão de Estudos

> **Categoria:** Funcionalidade<br>
> **Data:** 29/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** Ao chegar ao final da sessão de estudos, o sistema deve salvar o progresso do usuário e exibir um feedback na tela, como "Revisão completa, parabéns".

# Requisitos Não Funcionais (RNF)

# RNF01 - Tempo de Resposta da Transição de Cards

> **Categoria:** Desempenho<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** A virada do card, com a exibição do verso, e a transição para o próximo card durante a sessão de estudos devem ocorrer de forma fluida, com tempo de resposta inferior a 200 ms.

# RNF02 - Funcionamento e Estudo Offline

> **Categoria:** Disponibilidade / Eficiência<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O aplicativo deve permitir que o usuário realize sessões de estudo utilizando decks salvos localmente, mesmo sem conexão com a internet, armazenando o progresso para sincronização posterior.

# RNF03 - Sincronização em Segundo Plano

> **Categoria:** Desempenho / Confiabilidade<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Importante<br>
>
> **Descrição:** O envio de estatísticas de retenção e o salvamento do progresso de estudo no servidor devem ser executados em segundo plano, sem travar ou interromper a navegação do usuário.

# RNF04 - Design Responsivo

> **Categoria:** Usabilidade<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** A interface das telas de estudo e do painel de decks deve se adaptar automaticamente a diferentes resoluções de tela, garantindo usabilidade em smartphones e tablets.

# RNF05 - Suporte ao Modo Escuro (Dark Mode)

> **Categoria:** Usabilidade<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Desejável<br>
>
> **Descrição:** O sistema deve oferecer suporte ao tema escuro para reduzir a fadiga visual do usuário durante sessões prolongadas de estudo em ambientes com pouca iluminação.

# Regras de Negócio (RN)

# RN01 - Limite de Cards Novos Diários

> **Categoria:** Regra de Negócio<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** O sistema só deve apresentar novos cards ao usuário até o limite diário configurado no deck. Após atingir esse limite, apenas cards pendentes de revisão devem ser exibidos na sessão.

# RN02 - Cálculo do Intervalo de Repetição Espaçada

> **Categoria:** Regra de Negócio<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** A data da próxima revisão de cada card deve ser calculada dinamicamente com base na avaliação de dificuldade informada pelo usuário, como "Errei", "Difícil", "Bom" ou "Fácil", e no algoritmo de repetição espaçada definido.

# RN03 - Agendamento de Cards Incorretos

> **Categoria:** Regra de Negócio<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** Quando o usuário marcar um card como "Errei" durante uma sessão de estudos, o card deve reentrar na fila da mesma sessão até que seja respondido corretamente.

# RN04 - Exclusão em Cascata de Cards

> **Categoria:** Regra de Negócio<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Essencial<br>
>
> **Descrição:** Ao deletar um deck, o sistema deve remover automaticamente todos os cards vinculados a ele, assim como o histórico de revisões associado ao deck.

# RN05 - Reinício do Ciclo Diário de Estudo

> **Categoria:** Regra de Negócio<br>
> **Data:** 30/08/26<br>
> **Autor:** Yohans Silva<br>
> **Versão:** 1<br>
> **Prioridade:** Importante<br>
>
> **Descrição:** A contagem da meta diária de revisões e a liberação de novos cards devem ser reiniciadas automaticamente todos os dias no horário configurado pelo usuário, sendo 04:00 AM o horário padrão.
