# Especificação do Sistema

> **Status do documento:** Em elaboração<br>
> **Última revisão:** 2026-10-31<br>
> **Idioma:** Português brasileiro, por se tratar também de uma entrega acadêmica<br>
> **Baseline atual:** Fase 1 — entrega final obrigatória do TCC<br>
> **Sincronização com GitHub Projects:** Ainda não iniciada

## Propósito

Este documento registra os requisitos funcionais (RF), as regras de negócio (RN) e os requisitos não funcionais (RNF) do Flashcard App. Ele também funciona como matriz inicial de rastreabilidade, relacionando cada requisito aos casos de uso, elementos de design e casos de teste.

A Fase 1 representa a entrega final obrigatória do TCC, prevista para junho de 2027. O marco institucional de TCC I, em 18 de novembro de 2026, possui entregas acadêmicas intermediárias e não exige a implementação completa da Fase 1. A Fase 2 contém extensões condicionais, que somente poderão avançar quando a Fase 1 estiver estável e houver autorização explícita. A Fase 3 é um roadmap pós-TCC e não autoriza implementação ou infraestrutura antecipada.

## Convenções

### Identificadores

- RF identifica um requisito funcional.
- RN identifica uma regra de negócio.
- RNF identifica um requisito não funcional.
- Cada identificador é único, permanente e não deve ser reutilizado.
- A movimentação de um requisito entre fases não altera seu identificador.

### Prioridade

- **Alta:** essencial para alcançar os objetivos da fase em que o requisito está registrado.
- **Média:** importante, mas não central para alcançar os objetivos da fase.
- **Baixa:** desejável e de menor prioridade relativa dentro da fase.

### Status

- **Em discussão:** a necessidade foi identificada, mas seu comportamento ainda não foi totalmente definido.
- **Proposto:** o comportamento foi definido e aguarda aprovação.
- **Aprovado:** o requisito faz parte da baseline da fase indicada.
- **Implementado:** o comportamento existe na aplicação, mas ainda não foi totalmente verificado.
- **Verificado:** o caso de teste correspondente foi executado com sucesso.
- **Adiado:** o requisito foi transferido para uma fase posterior.
- **Descartado:** o requisito foi rejeitado, mas seu registro foi preservado.

O status Aprovado nas Fases 2 e 3 aprova apenas sua permanência no planejamento da respectiva fase. Ele não autoriza sua implementação durante a Fase 1.

### Rastreabilidade ainda inexistente

O valor **A definir** indica que o artefato correspondente ainda não foi criado ou aprovado. Ele não representa uma referência fictícia. Quando GitHub Issues, casos de uso, elementos de design e testes forem criados, os campos correspondentes deverão ser substituídos por links ou identificadores reais.

## Fase 1 — Requisitos obrigatórios do TCC

| ID Requisito | Nome do Requisito | Descrição do Requisito | Caso de Uso  | Elemento de Design | Caso de Teste | Prioridade | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RF-001 | Concluir onboarding | Na primeira abertura, o sistema deve perguntar a familiaridade com aplicativos de flashcards, oferecer três níveis e confirmar a escolha antes de uma demonstração distinta por nível. Deve explicar previamente que não será possível voltar a etapas anteriores durante a demonstração. Pular exige confirmação amigável e ilustrada. A demonstração usa exemplos isolados, sem alterar biblioteca, meta, agendamento ou progresso real. Somente concluir ou confirmar pular com gravação local confirmada libera a biblioteca; uma interrupção anterior não conta como conclusão e a próxima abertura recomeça pela pergunta. | [UC02](use-cases/uc-002-complete-onboarding.md) | A definir | A definir | Alta | Aprovado |
| RF-002 | Importar deck JSON | O sistema deve permitir que o usuário selecione e importe um arquivo JSON válido para adicionar um deck à biblioteca local, com aviso e confirmação para conteúdos duplicados conforme a RN-022. | [UC04](use-cases/uc-004-import-deck.md) | A definir | A definir | Alta | Aprovado |
| RF-003 | Visualizar biblioteca local | O sistema deve exibir os decks locais na biblioteca, única raiz da navegação após o onboarding. A biblioteca deve oferecer importação JSON, filtros por tags e entrada de perfil/preferências por avatar, sem barra inferior de abas. Na Fase 1, essa entrada dá acesso às preferências essenciais já previstas, sem antecipar a estrutura ampliada de perfil da Fase 2. | [UC03](use-cases/uc-003-view-deck-library.md) | A definir | A definir | Alta | Aprovado |
| RF-004 | Abrir deck | O sistema deve permitir que o usuário abra um deck da biblioteca para visualizar suas informações, seus cards e iniciar uma sessão de revisão. | [UC05](use-cases/uc-005-view-deck-details.md) | A definir | A definir | Alta | Aprovado |
| RF-005 | Excluir deck | O sistema deve permitir que o usuário exclua um deck da biblioteca local mediante confirmação. | [UC07](use-cases/uc-007-delete-deck.md) | A definir | A definir | Alta | Aprovado |
| RF-006 | Editar nome e descrição do deck | O sistema deve permitir que o usuário altere o nome de exibição e a descrição de um deck importado por texto livre, com limites máximos de 50 e 500 caracteres, respectivamente. Os campos devem exibir contadores, impedir que digitação ou colagem ultrapasse esses limites e salvar automaticamente ao sair do campo, sem botão Salvar. | [UC06](use-cases/uc-006-edit-deck-settings.md) | A definir | A definir | Alta | Aprovado |
| RF-007 | Configurar retenção desejada | O sistema deve permitir que o usuário configure a retenção desejada individualmente para cada deck. | [UC06](use-cases/uc-006-edit-deck-settings.md) | A definir | A definir | Alta | Aprovado |
| RF-008 | Configurar plano diário de estudo | O sistema deve permitir que o usuário configure uma quantidade global de cards distintos como meta diária de estudo, inicialmente 20. Por padrão, essa mesma quantidade limita os cards distintos por rodada do deck aberto; ao iniciar cada sessão, o usuário pode escolher desativar esse limite. O valor configurado deve ser de no mínimo 10, sem máximo. Ao selecionar um valor superior a 50, o sistema deve avisar que ele não é recomendado, sem bloquear o salvamento automático nem exigir uma confirmação separada. | [UC09](use-cases/uc-009-configure-global-study-settings.md), [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-009 | Configurar referência de novos por deck | O sistema deve permitir que o usuário configure, em cada deck, uma referência diária de cards novos a sugerir. Inicialmente, essa referência automática corresponde a um terço da meta diária global, arredondado ao inteiro mais próximo. Quando a meta global mudar, o sistema deve recalcular apenas as referências dos decks em que o usuário ainda não alterou explicitamente essa referência de novos. As referências editadas manualmente permanecem como estavam. | [UC06](use-cases/uc-006-edit-deck-settings.md), [UC09](use-cases/uc-009-configure-global-study-settings.md) | A definir | A definir | Alta | Aprovado |
| RF-010 | Gerenciar tags do deck | O sistema deve permitir adicionar e remover tags do deck pelo seletor, inclusive criar uma nova tag de até 30 caracteres. Nome vazio ou composto somente por espaços deve impedir a criação; ao informar um nome já existente, deve selecionar a tag existente em vez de duplicá-la. Selecionar, criar e associar ou remover uma tag aciona o salvamento automático, preservando consistência em caso de falha. | [UC06](use-cases/uc-006-edit-deck-settings.md) | A definir | A definir | Alta | Aprovado |
| RF-011 | Filtrar decks por tags | O sistema deve permitir que o usuário selecione tags por meio de chips na tela inicial e visualize apenas os decks que possuam todas as tags selecionadas (operador E). Quando nenhuma tag estiver selecionada, todos os decks devem ser exibidos. | [UC03](use-cases/uc-003-view-deck-library.md) | A definir | A definir | Alta | Aprovado |
| RF-012 | Visualizar card do deck | O sistema deve permitir que o usuário visualize individualmente os cards de um deck fora de uma sessão de revisão. | [UC10](use-cases/uc-010-view-card-and-manage-flag.md) | A definir | A definir | Alta | Aprovado |
| RF-013 | Adicionar flag ao card | O sistema deve permitir adicionar uma flag a um card durante uma sessão de revisão ou durante sua visualização individual, com uma nota textual opcional. | [UC10](use-cases/uc-010-view-card-and-manage-flag.md) | A definir | A definir | Alta | Aprovado |
| RF-014 | Editar nota da flag | O sistema deve permitir que o usuário edite a nota opcional associada à flag de um card. | [UC10](use-cases/uc-010-view-card-and-manage-flag.md) | A definir | A definir | Alta | Aprovado |
| RF-015 | Remover flag do card | O sistema deve permitir que o usuário remova a flag diretamente durante a revisão ou na visualização individual do card. | [UC10](use-cases/uc-010-view-card-and-manage-flag.md) | A definir | A definir | Alta | Aprovado |
| RF-016 | Visualizar cards com flag | O sistema deve permitir que o usuário identifique e visualize os cards que possuem flag dentro de um deck. | [UC05](use-cases/uc-005-view-deck-details.md) | A definir | A definir | Alta | Aprovado |
| RF-017 | Iniciar sessão de revisão | O sistema deve permitir que o usuário inicie uma sessão de revisão a partir de um deck aberto. Se a meta diária global já tiver sido alcançada, o sistema deve avisar e permitir que o usuário decida se deseja estudar o deck mesmo assim. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-018 | Exibir frente do card | Durante uma sessão, o sistema deve apresentar inicialmente a frente do card e manter o verso oculto. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-019 | Revelar verso do card | O sistema deve permitir que o usuário revele o verso do card por meio de uma ação de toque, utilizando uma animação de giro. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-020 | Avaliar card | Após revelar o verso, o sistema deve permitir que o usuário avalie o card como Errei, Difícil, Bom ou Fácil, correspondentes a Again, Hard, Good e Easy. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-021 | Atualizar agendamento do card | Após cada avaliação, o sistema deve calcular e armazenar o próximo estado de agendamento do card. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-022 | Persistir avaliação imediatamente | O sistema deve persistir cada avaliação concluída antes de apresentar o próximo card, sem depender do encerramento da sessão. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-023 | Encerrar sessão antecipadamente | O sistema deve permitir que o usuário saia da sessão a qualquer momento, preservando todas as avaliações já concluídas. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-024 | Desfazer avaliações da sessão | Durante a sessão ativa, o sistema deve permitir desfazer avaliações confirmadas em sequência, uma por vez e em ordem inversa, até esgotar as avaliações ainda não desfeitas dessa sessão. A sessão e seu Undo terminam após a confirmação da última avaliação elegível e antes da exibição do resumo; Estudar mais inicia outra sessão e não permite desfazer avaliações da sessão encerrada. O Undo não deve exibir carregamento nem atraso artificial. Enquanto a operação estiver pendente, novas avaliações e pedidos de desfazer devem ser bloqueados sem mudança visual nos controles; card, contagens e sequência só refletem a reversão após confirmação do salvamento. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-025 | Finalizar sessão e exibir resumo | Após a confirmação da última avaliação, quando não restar card elegível na rodada, o sistema deve encerrar a sessão e seu Undo imediatamente e exibir o resumo. Não deve aguardar nem antecipar um card agendado para minutos depois. O resumo deve mostrar cards distintos estudados nessa sessão, quantos eram novos, quantidades de Errei/Difícil/Bom/Fácil e progresso da meta diária global considerando todos os decks, com mensagens variadas conforme o estudo e a meta. Somente avaliações confirmadas e não desfeitas entram nos valores. Se restarem devidos excluídos pela capacidade, deve mostrar a quantidade e oferecer Estudar mais em uma nova sessão, mantendo a continuação somente de devidos. Deve permitir voltar ao deck ou à biblioteca; uma saída antecipada não mostra o resumo de sessão concluída. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RF-026 | Exibir disponibilidade de cards | O sistema deve exibir, de maneira neutra, em cada card visual de deck na biblioteca inicial, a quantidade de cards devidos somada à quantidade de cards novos elegíveis que seriam sugeridos automaticamente conforme a RN-006, respeitando as continuações exclusivas de devidos da RN-008. Cards novos disponíveis apenas por escolha voluntária não entram nessa contagem. Para a contagem mostrada antes de iniciar a sessão, o limite por rodada é considerado ativo por padrão. Ao iniciar a sessão, a quantidade sugerida é recalculada conforme a escolha de limite feita pelo usuário e o estado atual do deck. A data da próxima revisão não deve ser exibida na Fase 1. | [UC03](use-cases/uc-003-view-deck-library.md) | A definir | A definir | Alta | Aprovado |
| RF-027 | Exibir informações avançadas do FSRS | A área separada de informações avançadas do FSRS foi retirada da aplicação por decisão do responsável, consolidada nesta revisão de 2026-10-31. O identificador é preservado para rastreabilidade; essa área não integra as telas da Fase 1. | [UC05](use-cases/uc-005-view-deck-details.md) | A definir | A definir | Alta | Descartado |
| RF-028 | Configurar início do dia de estudo | O sistema deve permitir que o usuário altere globalmente o horário que determina o início de um novo dia de estudo. | [UC09](use-cases/uc-009-configure-global-study-settings.md) | A definir | A definir | Alta | Aprovado |
| RN-001 | Importação integral | Um arquivo JSON somente pode ser aceito quando sua estrutura completa for válida e todos os dados necessários puderem ser importados. Uma importação inválida não pode produzir decks ou cards parcialmente importados. | [UC04](use-cases/uc-004-import-deck.md) | A definir | A definir | Alta | Aprovado |
| RN-002 | Tipo de card da Fase 1 | Na Fase 1, cada card importado deve possuir conteúdo textual de frente e verso. A aplicação não gera conteúdo de estudo nem permite criar ou editar o conteúdo importado. | [UC04](use-cases/uc-004-import-deck.md) | A definir | A definir | Alta | Aprovado |
| RN-003 | Unicidade da flag | Cada card pode possuir no máximo uma flag. A flag pode conter uma nota textual opcional e editável; sua remoção também deve remover a nota associada. | [UC10](use-cases/uc-010-view-card-and-manage-flag.md) | A definir | A definir | Alta | Aprovado |
| RN-004 | Vínculo da sessão ao deck | Cada sessão de revisão deve pertencer ao deck a partir do qual foi iniciada. Colocar o aplicativo em segundo plano, enquanto seu processo permanece em execução, não encerra a sessão: ao retornar, o usuário mantém a mesma sessão, rodada, fila, estado de apresentação do card e disponibilidade de desfazer em sequência as avaliações da sessão, preservando o contexto temporal e a escolha de limite por rodada. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-005 | Prioridade dos cards devidos | Ao montar uma rodada, o sistema deve considerar os cards que já estão devidos no deck aberto, incluindo atrasados. Somente são elegíveis como devidos os cards cujo instante agendado seja menor ou igual ao instante de preparação da rodada; estar agendado para mais tarde no mesmo dia de estudo não os torna devidos antecipadamente. Com o limite por rodada ativo, seleciona devidos até essa capacidade; com ele desativado, seleciona todos os devidos do deck. Esses cards devem aparecer antes dos novos. Cards de outros decks não entram nessa seleção. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-006 | Sugestão diária de cards novos | A quantidade de novos sugerida automaticamente em uma rodada deve ser a menor entre: os novos ainda disponíveis no deck e a quantidade que falta para atingir a sugestão diária adaptada do deck, descontados os novos já estudados nele naquele dia. Quando o limite por rodada estiver ativo, a sugestão também não pode exceder as vagas não ocupadas pelos devidos. Com o limite desativado, a capacidade da rodada não restringe essa sugestão. O usuário pode escolher estudar mais novos, respeitando a prioridade dos devidos e, quando ativo, o limite por rodada. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-007 | Limite de cards distintos por rodada | Se o usuário escolher aplicar o limite na sessão, cada rodada desse deck deve apresentar no máximo a quantidade global configurada de cards distintos. Se optar por desativá-lo, a rodada não tem teto de cards distintos; a quantidade global continua sendo a meta diária de estudo. Cumprir essa meta no dia não reduz a capacidade de rodadas seguintes nem interrompe uma rodada em andamento. Reavaliações de um mesmo card na rodada não aumentam a contagem de cards distintos. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-008 | Excesso de cards devidos | Com o limite ativo, se os devidos excederem a capacidade, a sessão deve incluir somente devidos até esse limite. Ao concluí-la, deve informar quantos restam e oferecer Estudar mais em uma nova sessão somente de devidos. Cada nova sessão reapresenta a escolha de limite, ativo por padrão. Reabrir o deck no mesmo dia enquanto restar o excedente preserva essa continuação somente de devidos, independentemente da escolha de limite; sem teto, todos os devidos restantes podem entrar. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-009 | Desativação do limite por rodada | Em cada sessão, o limite de cards distintos por rodada começa ativo e o usuário pode escolher desativá-lo antes da seleção dos cards. Essa escolha vale para a rodada da sessão atual e não modifica a configuração global da meta diária, que continua sendo acompanhada. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-010 | Avaliação após revelação | As opções de avaliação somente podem ser disponibilizadas depois que o usuário revelar o verso do card. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-011 | Cálculo pelo FSRS v6 | O próximo estado de agendamento deve ser calculado pelo FSRS v6, por meio de ts-fsrs, considerando o estado atual do card, a data da revisão, a avaliação escolhida e a retenção desejada do deck. A aplicação não deve substituir o algoritmo por intervalos manuais. Antes do cálculo e da gravação, deve validar que o instante da avaliação não antecede a última revisão salva do card, quando existente. Se anteceder, deve preservar o estado e as contagens confirmadas, manter o card disponível e solicitar a correção do relógio do dispositivo antes de uma nova tentativa com instante atualizado, sem salvar a avaliação rejeitada nem fabricar um horário. Um instante igual ao da última revisão não é rejeitado por essa validação cronológica. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-012 | Comportamento de Again | A aplicação não deve obrigar um card avaliado como Again a retornar repetidamente até uma resposta correta. Seu reagendamento e eventual retorno devem seguir o comportamento validado do FSRS v6. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-013 | Escopo do undo | Cada Undo deve reverter a avaliação confirmada mais recente ainda não desfeita da sessão ativa, restaurando card, agendamento, posição e contagens atribuíveis sem apagar contribuições sustentadas por outras avaliações. Pode ser repetido até esgotar a sequência da sessão. O segundo plano com processo ativo preserva essa sequência enquanto a sessão continuar ativa. A última avaliação elegível confirmada encerra a sessão e o Undo antes do resumo. Estudar mais inicia outra sessão e outra sequência; não existe Undo atravessando sessões concluídas. Uma nova avaliação confirmada durante a sessão ativa passa a ser o alvo mais recente; avaliações já desfeitas permanecem desfeitas. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-014 | Virada global do dia de estudo | O dia de estudo deve começar no horário global configurado, utilizando 04:00 como padrão e o horário local do dispositivo como referência. Se uma transição de fuso omitir o horário configurado, a virada ocorre no primeiro horário local válido posterior; se esse horário ocorrer duas vezes, vale a primeira ocorrência. A repetição de horários locais não cria uma segunda virada. O intervalo do dia de estudo inclui sua virada inicial e exclui a seguinte. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-015 | Sessão durante a virada do dia | Uma sessão deve preservar o dia de estudo e o contexto de fuso horário determinados em seu início até seu encerramento, mesmo que atravesse a virada do dia ou o fuso horário do dispositivo seja alterado. A próxima sessão determina seu dia de estudo usando o fuso horário então vigente no dispositivo e o horário global de virada salvo. Se uma mudança de fuso fizer essa sessão corresponder a uma data de estudo já utilizada, o sistema reutiliza as contagens diárias, o estado adaptativo e a continuação exclusiva de devidos daquela data, sem executar outra adaptação diária por causa da mudança de fuso. Cada avaliação continua utilizando seu próprio instante de revisão para o cálculo do agendamento. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-016 | Exclusão dos dados do deck | A exclusão de um deck deve remover seus cards, tags associadas, flags e notas, estado de agendamento, dados necessários ao undo e resumos diários usados para adaptar a sugestão de novos desse deck. A Fase 1 não pressupõe a existência de histórico completo de revisões. | [UC07](use-cases/uc-007-delete-deck.md) | A definir | A definir | Alta | Aprovado |
| RN-020 | Adaptação da sugestão de novos | A sugestão automática diária de novos de cada deck deve usar a referência adaptativa `A_deck`, inicialmente igual à referência configurada `R_deck`, e seguir integralmente o detalhamento da RN-020 abaixo. A adaptação diária ocorre no máximo uma vez por dia de estudo do deck; entradas posteriores no mesmo dia reutilizam o valor persistido, salvo mudança de configuração. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-021 | Contagem diária do estudo | O sistema deve contar cada card distinto com avaliação salva no dia de estudo, considerando todos os decks, apenas uma vez, mesmo que seja reavaliado. Em cada deck, deve contar separadamente os cards que nunca haviam sido estudados e receberam sua primeira avaliação nesse dia. As contagens passam a valer quando a avaliação é salva. Abrir e fechar um deck sem salvar avaliação não registra um dia estudado e, portanto, não acrescenta esse dia ao histórico da RN-020. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RN-022 | Importação de decks duplicados | A duplicidade deve ser identificada pelo conteúdo dos cards, independentemente do nome do arquivo ou do título do deck. Ao identificar uma duplicata, o sistema deve avisar e permitir cancelar ou confirmar a importação. Se o usuário confirmar, deve criar um deck independente com sufixo numérico incremental no nome de exibição, como Deck (1), Deck (2) e assim por diante a cada cópia repetida, preservando os decks existentes e seu progresso. A criação da cópia permanece integral conforme a RN-001. | [UC04](use-cases/uc-004-import-deck.md) | A definir | A definir | Alta | Aprovado |
| RNF-001 | Operação offline | Todos os fluxos obrigatórios da Fase 1 devem permanecer utilizáveis sem conexão com a internet. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-002 | Operação local-first | A Fase 1 deve funcionar sem conta, backend, armazenamento em nuvem ou sincronização, mantendo localmente os dados necessários aos fluxos obrigatórios. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-003 | Consistência da persistência | A persistência de uma avaliação não pode deixar o card, o agendamento e os dados necessários ao undo em estados parciais ou incompatíveis. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RNF-004 | Continuidade após reinício | Fechar e reabrir a aplicação deve preservar decks, cards, tags, flags, notas, configurações e o progresso de agendamento. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-005 | Tratamento compreensível de erros | A aplicação deve apresentar mensagens compreensíveis para erros de importação, persistência e operações inválidas, sem ocultar falhas que possam afetar dados do usuário. Na importação de decks JSON, a notificação deve distinguir arquivo inválido, problema de leitura e falha de salvamento, explicar o próximo passo e oferecer a ação Saiba mais com informações adicionais sobre a causa conhecida. Cancelar o seletor de arquivos não deve gerar alerta de erro. Na avaliação de cards, falhas ou resultados de persistência ainda incertos devem ser comunicados por uma notificação de erro com a ação Saiba mais, que disponibilize informações adicionais sobre a operação e seu estado conhecido. Um resultado ainda incerto não pode ser apresentado como falha ou sucesso confirmado. Em falhas confirmadas no salvamento automático de configurações, a aplicação deve preservar os valores anteriormente salvos e manter a escolha tentada visível como não salva enquanto a tela estiver aberta, com as ações Tentar novamente e Saiba mais, sem desfazer alterações anteriores já confirmadas. Em falhas confirmadas na exclusão de um deck, a aplicação deve preservar o deck e seus dados, retornar aos detalhes e oferecer Tentar novamente e Saiba mais na notificação; uma nova tentativa exige nova confirmação explícita de exclusão. Em falhas confirmadas ao adicionar ou remover flag ou editar sua nota, deve preservar a flag e a nota salvas, manter o texto tentado disponível enquanto o editor estiver aberto e oferecer Tentar novamente e Saiba mais. Durante a revisão, essa recuperação deve manter o mesmo card e a sessão ativa, sem alterar avaliações, agendamento ou contagens de estudo. Em falhas confirmadas de Undo, deve preservar o estado salvo e o mesmo alvo, oferecendo Tentar novamente e Saiba mais. Quando faltar a confirmação de uma operação interrompida, deve conferir internamente o estado persistido antes de liberar outra operação, sem repetir automaticamente o Undo nem exigir uma tela ou decisão do usuário sobre resultado incerto. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-006 | Acessibilidade | As interações obrigatórias da Fase 1 devem ser acessíveis e não podem depender exclusivamente de cor, animação ou conhecimento prévio do FSRS. Os critérios específicos serão detalhados nos respectivos casos de teste. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-007 | Adaptação a smartphones Android | A interface da Fase 1 deve permanecer utilizável nas resoluções de smartphones Android definidas como suportadas pelo projeto. Tablets não fazem parte desta fase. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-008 | Duração da animação de giro | A animação de giro utilizada para revelar o verso do card deve possuir duração de 200 ms. | [UC08](use-cases/uc-008-conduct-study-session.md) | A definir | A definir | Alta | Aprovado |
| RNF-009 | Entrega Android | A Fase 1 deve ser disponibilizada como um development build Android instalável e utilizável para o fluxo obrigatório de estudo. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-010 | Critério de usabilidade | Os participantes da avaliação devem conseguir concluir as tarefas representativas dentro dos limites que serão definidos previamente no protocolo de pesquisa. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-011 | Critério de satisfação | A avaliação com usuários deve alcançar o limiar de satisfação que será definido previamente no protocolo de pesquisa. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-012 | Funcionalidade essencial sem paywall | Os fluxos essenciais de estudo local devem permanecer gratuitos e não podem ser condicionados a assinatura ou pagamento. | A definir | A definir | A definir | Alta | Aprovado |

### Recuperação de inicialização, leitura e conclusão do onboarding

Falhas de inicialização ou leitura devem preservar os dados e o contexto disponível, oferecer Tentar novamente e Saiba mais e impedir o uso de dados indisponíveis como se fossem válidos. Uma falha nunca deve aparecer como biblioteca vazia, ausência de cards ou progresso zero. Falhas de preparação não criam uma sessão utilizável a partir de informações inconsistentes. Concluir ou pular onboarding só libera a biblioteca após confirmação de salvamento; uma falha mantém a intenção para tentar novamente e não contabiliza a conclusão. Os detalhes constam de UC01, UC02, UC03, UC05, UC08 e UC10.

### Configurações e salvamento automático — UC06 e UC09

As configurações de deck (RF-006, RF-007, RF-009 e RF-010) e as preferências globais de estudo (RF-008 e RF-028) devem ser salvas automaticamente, sem ações gerais de Salvar ou Cancelar. Selecionar uma opção inicia sua gravação; em sliders, a gravação ocorre ao concluir o ajuste e soltar o controle. Nome e descrição são textos livres e iniciam sua gravação ao sair do campo, respeitando somente os limites máximos definidos em RF-006. Criar uma tag é outra entrada textual, com as regras de RF-010; a ação Criar e selecionar aciona sua gravação e associação ao deck.

Os controles não textuais devem oferecer apenas escolhas válidas, respeitando as regras existentes, inclusive a meta global sem máximo. Isso elimina a etapa de correção de entrada inválida pelo usuário nesses controles, mas não elimina a validação interna. A referência de novos por deck deve indicar se segue o padrão global ou se foi sobrescrita pelo usuário, preservando a política de RF-009 e RN-020.

Cada gravação deve preservar a consistência entre a configuração alterada e seus valores dependentes. Uma falha não pode desfazer outras alterações já confirmadas. Voltar é navegação e preserva alterações salvas; não representa cancelamento em lote. Um valor pendente ou com falha não pode ser apresentado como salvo. Os fluxos e retornos estão detalhados em [UC06](use-cases/uc-006-edit-deck-settings.md) e [UC09](use-cases/uc-009-configure-global-study-settings.md).

### RN-020 — Adaptação da sugestão de novos

Esta regra formaliza a política de ajuste adaptativo aprovada na [seção 6.4 do UC08](use-cases/uc-008-conduct-study-session.md). `G` é a meta diária global e, quando o limite por rodada está ativo, também a capacidade máxima de cards distintos por rodada (RF-008); `R_deck` é a referência diária de novos configurada para o deck (RF-009); `A_deck` é a referência adaptativa diária, inicialmente igual a `R_deck`; e `D` é o conjunto de cards devidos no deck na preparação da rodada. As contagens de estudo usadas para identificar os dias estudados seguem a RN-021.

A regra adaptativa atualiza `A_deck` no máximo uma vez por dia de estudo do respectivo deck. Reabrir o deck durante o mesmo dia não provoca uma nova adaptação. Caso o usuário altere explicitamente `R_deck`, essa referência passa a ser manual e `A_deck` é reiniciada com o novo valor. Quando `G` mudar, o sistema recalcula `R_deck` como o inteiro mais próximo de `G / 3` e reinicia `A_deck = R_deck` somente nos decks cuja referência de novos continua automática. Nos decks com referência editada manualmente, `R_deck` e `A_deck` são preservadas. Esse recálculo é uma mudança de configuração distinta da adaptação diária. Se esta já ocorreu no dia, entradas posteriores reutilizam o valor vigente sem executá-la novamente.

O passo de adaptação é:

`step = max(1, ceil(R_deck / 5))`

O sistema utiliza a primeira sessão do deck em cada um dos últimos cinco dias distintos em que houve estudo, de modo a construir um histórico de demanda. `lightHistory` será verdadeiro quando existirem cinco dias nesse histórico e, em pelo menos três deles, a primeira sessão tiver começado com menos de `R_deck` cards devidos.

`overdueNow` corresponde à quantidade de cards que já estavam devidos antes do início do dia de estudo atual e continuam sem avaliação correspondente.

O sistema considera `F[1..10]`, representando as quantidades de cards do deck atual agendados para cada um dos próximos dez dias de estudo. Cards de outros decks não entram nessa projeção. Esses valores constituem uma fotografia do agendamento existente, e não uma previsão exata dos futuros reagendamentos.

São calculados:

- `earlyAverage = média(F[1..5])`
- `lateAverage = média(F[6..10])`
- `peak = max(F[1..10])`

As condições são:

- `futureCapacity`: `lateAverage < R_deck` e `peak + A_deck ≤ G`.
- `noSharpIncrease`: `lateAverage ≤ earlyAverage + step`.
- `lightToday`: `|D| < R_deck` e `overdueNow = 0`.

Na primeira sessão do deck no dia:

- Se `R_deck = 0`, então `A_deck = 0`.
- Se `lightHistory`, `lightToday`, `futureCapacity` e `noSharpIncrease` forem verdadeiros, então `A_deck = min(G, A_deck + step)`.
- Caso contrário, `A_deck = max(R_deck, A_deck − step)`.

A atualização é persistida para que novas entradas no deck, durante o mesmo dia de estudo, reutilizem o valor já calculado. Abrir o deck e sair sem avaliação confirmada pode ajustar essa referência, mas não acrescenta um dia estudado ao histórico nem altera as contagens diárias de estudo.

## Fase 2 — Extensões condicionais do TCC

Os requisitos desta seção são desejados, mas sua implementação depende da estabilidade da Fase 1, da capacidade restante do projeto e de autorização explícita.

| ID Requisito | Nome do Requisito | Descrição do Requisito | Caso de Uso | Elemento de Design | Caso de Teste | Prioridade | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RF-029 | Pesquisar decks | O sistema deve permitir que o usuário pesquise decks da biblioteca local por texto. | A definir | A definir | A definir | Média | Aprovado |
| RF-030 | Manter perfil e configurações locais | O sistema deve disponibilizar uma estrutura ampliada de perfil e configurações locais do usuário. | A definir | A definir | A definir | Média | Aprovado |
| RF-031 | Importar deck CSV | O sistema deve permitir a importação de decks a partir de arquivos CSV válidos. | A definir | A definir | A definir | Média | Aprovado |
| RF-032 | Importar deck APKG | O sistema deve permitir a importação dos conteúdos compatíveis de decks APKG. | A definir | A definir | A definir | Média | Aprovado |
| RF-033 | Exportar, realizar backup e restaurar | O sistema deve permitir exportar decks e realizar backup e restauração locais conforme os formatos que forem aprovados. | A definir | A definir | A definir | Média | Aprovado |
| RF-034 | Personalizar aparência dos decks | O sistema deve permitir personalizações visuais, incluindo a atribuição de cores aos decks. | A definir | A definir | A definir | Média | Aprovado |
| RF-035 | Utilizar modo escuro | O sistema deve oferecer suporte a modo escuro como parte da personalização visual. | A definir | A definir | A definir | Média | Aprovado |
| RF-036 | Visualizar analytics e estatísticas | O sistema deve disponibilizar estatísticas de estudo e informações analíticas em nível de usuário. | A definir | A definir | A definir | Média | Aprovado |
| RF-037 | Utilizar cards com imagens | O sistema deve suportar cards que contenham imagens nos formatos que forem definidos. | A definir | A definir | A definir | Média | Aprovado |
| RF-038 | Utilizar cards cloze | O sistema deve suportar cards do tipo cloze deletion. | A definir | A definir | A definir | Média | Aprovado |
| RF-039 | Utilizar cards de resposta digitada | O sistema deve suportar um tipo de card no qual o usuário digita uma resposta e a aplicação realiza uma comparação segundo regras ainda a definir. | A definir | A definir | A definir | Média | Aprovado |
| RF-040 | Definir metas adicionais e lembretes locais | O sistema deve permitir que o usuário defina metas de estudo complementares à meta diária global e lembretes locais. | A definir | A definir | A definir | Média | Aprovado |
| RF-041 | Emitir notificações locais | O sistema deve poder emitir notificações locais relacionadas ao estudo de acordo com preferências do usuário. Gatilhos, frequência, conteúdo, horários silenciosos e relação com decks ainda serão definidos. | A definir | A definir | A definir | Média | Em discussão |
| RF-042 | Exibir feedback pós-sessão | O sistema poderá apresentar feedback pós-sessão ampliado além dos quatro blocos mínimos do resumo da Fase 1 em RF-025. Analytics históricos e análises ampliadas permanecem condicionais à Fase 2. | A definir | A definir | A definir | Média | Aprovado |
| RF-043 | Gerenciar flags em área centralizada | O sistema deve disponibilizar uma área centralizada para visualizar e gerenciar flags fora dos cards individuais. | A definir | A definir | A definir | Média | Aprovado |
| RF-044 | Consultar histórico completo de revisões | O sistema deve permitir que o usuário consulte um histórico completo de revisões quando o modelo de retenção desse histórico for definido. | A definir | A definir | A definir | Média | Aprovado |
| RF-045 | Disponibilizar versão PWA | O sistema deve poder ser utilizado como Progressive Web App dentro das limitações que forem definidas para a Fase 2. | A definir | A definir | A definir | Média | Aprovado |
| RN-017 | Exclusão do histórico do deck | Quando o histórico completo existir, a exclusão de um deck também deve remover seu histórico de revisões associado, conforme a política de confirmação e recuperação que for definida. | A definir | A definir | A definir | Média | Aprovado |
| RNF-013 | Adaptação a tablets e web | As interfaces da Fase 2 devem ser adaptadas aos tablets e aos ambientes web suportados pela PWA. | A definir | A definir | A definir | Média | Aprovado |

## Fase 3 — Roadmap pós-TCC

Os requisitos desta seção registram direções futuras do produto. Eles estão fora do escopo do TCC e não justificam implementação, dependências, schemas ou infraestrutura durante as Fases 1 e 2.

| ID Requisito | Nome do Requisito | Descrição do Requisito | Caso de Uso | Elemento de Design | Caso de Teste | Prioridade | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RF-046 | Criar e editar decks e cards | O sistema deve permitir que o usuário crie e edite decks e cards dentro da aplicação. | A definir | A definir | A definir | Baixa | Aprovado |
| RF-047 | Autenticar usuário | O sistema deve permitir autenticação de usuários com OAuth 2.0 e OpenID Connect por meio da infraestrutura que vier a ser aprovada. | A definir | A definir | A definir | Baixa | Aprovado |
| RF-048 | Sincronizar dados na nuvem | O sistema deve permitir backup remoto e sincronização dos dados do usuário entre dispositivos. | A definir | A definir | A definir | Baixa | Aprovado |
| RF-049 | Explorar decks públicos | O sistema deve disponibilizar uma área Discover para que usuários encontrem decks públicos. | A definir | A definir | A definir | Baixa | Aprovado |
| RF-050 | Publicar decks | O sistema deve permitir que usuários publiquem decks para acesso público conforme as regras de publicação aprovadas. | A definir | A definir | A definir | Baixa | Aprovado |
| RF-051 | Armazenar decks publicados remotamente | O sistema deve armazenar no servidor os decks que forem publicados pelos usuários. | A definir | A definir | A definir | Baixa | Aprovado |
| RN-018 | Limite de publicação | Cada usuário pode manter no máximo três decks publicados simultaneamente. | A definir | A definir | A definir | Baixa | Aprovado |
| RN-019 | Ordenação por relevância | A área Discover deve ordenar decks públicos por um algoritmo simples de relevância cujos critérios ainda serão definidos. | A definir | A definir | A definir | Baixa | Em discussão |
| RNF-014 | Sincronização em segundo plano | Operações de sincronização e envio de dados devem ocorrer sem bloquear a navegação do usuário. | A definir | A definir | A definir | Baixa | Aprovado |
| RNF-015 | Segurança e privacidade dos serviços remotos | Contas, dados sincronizados e decks publicados devem ser protegidos segundo os requisitos de segurança e privacidade que forem definidos antes da implementação da Fase 3. | A definir | A definir | A definir | Baixa | Em discussão |

## Decisões abertas

As seguintes decisões ainda precisam ser resolvidas antes da definição final dos comportamentos correspondentes:

1. Definir os limiares de usabilidade e satisfação no protocolo de pesquisa.
2. Definir o funcionamento detalhado das notificações locais da Fase 2.
3. Especificar o contrato JSON e as faixas, valores padrão e passos dos controles de retenção e referência de novos no trabalho de domínio, sem inventar tais valores na UI.

## Integração futura com GitHub Issues e Projects

Quando o acompanhamento operacional for criado:

- cada requisito deverá apontar para uma GitHub Issue correspondente ou para a Issue que coordene sua implementação;
- as Issues deverão referenciar o identificador permanente do requisito;
- o GitHub Project deverá manter o status operacional, responsáveis e iterações;
- esta especificação deverá registrar a baseline e a data da última sincronização;
- Pull Requests e testes deverão referenciar os requisitos que implementam ou verificam.

O conteúdo normativo do requisito permanece neste documento. Issues e o GitHub Project não devem manter uma segunda definição divergente do mesmo comportamento.
