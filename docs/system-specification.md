# Especificação do Sistema

> **Status do documento:** Em elaboração<br>
> **Última revisão:** 2026-08-31<br>
> **Idioma:** Português brasileiro, por se tratar também de uma entrega acadêmica<br>
> **Baseline atual:** Fase 1 — entrega obrigatória do TCC<br>
> **Sincronização com GitHub Projects:** Ainda não iniciada

## Propósito

Este documento registra os requisitos funcionais (RF), as regras de negócio (RN) e os requisitos não funcionais (RNF) do Flashcard App. Ele também funciona como matriz inicial de rastreabilidade, relacionando cada requisito aos futuros casos de uso, elementos de design e casos de teste.

A Fase 1 representa a entrega obrigatória do TCC. A Fase 2 contém extensões condicionais, que somente poderão avançar quando a Fase 1 estiver estável e houver autorização explícita. A Fase 3 é um roadmap pós-TCC e não autoriza implementação ou infraestrutura antecipada.

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
| RF-001 | Concluir onboarding | O sistema deve apresentar um fluxo inicial de onboarding que prepare o usuário para utilizar as funções essenciais da aplicação. | A definir | A definir | A definir | Alta | Aprovado |
| RF-002 | Importar deck JSON | O sistema deve permitir que o usuário selecione e importe um arquivo JSON válido para adicionar um deck à biblioteca local. | A definir | A definir | A definir | Alta | Aprovado |
| RF-003 | Visualizar biblioteca local | O sistema deve exibir, na tela inicial, os decks importados pelo usuário e armazenados na biblioteca local. | A definir | A definir | A definir | Alta | Aprovado |
| RF-004 | Abrir deck | O sistema deve permitir que o usuário abra um deck da biblioteca para visualizar suas informações, seus cards e iniciar uma sessão de revisão. | A definir | A definir | A definir | Alta | Aprovado |
| RF-005 | Excluir deck | O sistema deve permitir que o usuário exclua um deck da biblioteca local mediante confirmação. | A definir | A definir | A definir | Alta | Aprovado |
| RF-006 | Editar nome do deck | O sistema deve permitir que o usuário altere o nome de exibição de um deck importado. | A definir | A definir | A definir | Alta | Aprovado |
| RF-007 | Configurar retenção desejada | O sistema deve permitir que o usuário configure a retenção desejada individualmente para cada deck. | A definir | A definir | A definir | Alta | Aprovado |
| RF-008 | Configurar limite de cards por sessão | O sistema deve permitir que o usuário configure, por deck, a quantidade máxima de cards inicialmente incluídos em uma sessão. | A definir | A definir | A definir | Alta | Aprovado |
| RF-009 | Configurar limite diário de cards novos | O sistema deve permitir que o usuário configure, por deck, a quantidade máxima de cards novos que podem ser introduzidos em um dia de estudo. | A definir | A definir | A definir | Alta | Aprovado |
| RF-010 | Gerenciar tags do deck | O sistema deve permitir que o usuário adicione e remova tags associadas a um deck. | A definir | A definir | A definir | Alta | Aprovado |
| RF-011 | Filtrar decks por tags | O sistema deve permitir que o usuário selecione tags por meio de chips na tela inicial e visualize apenas os decks correspondentes às tags selecionadas. Quando nenhuma tag estiver selecionada, todos os decks devem ser exibidos. | A definir | A definir | A definir | Alta | Aprovado |
| RF-012 | Visualizar card do deck | O sistema deve permitir que o usuário visualize individualmente os cards de um deck fora de uma sessão de revisão. | A definir | A definir | A definir | Alta | Aprovado |
| RF-013 | Adicionar flag ao card | O sistema deve permitir adicionar uma flag a um card durante uma sessão de revisão ou durante sua visualização individual, com uma nota textual opcional. | A definir | A definir | A definir | Alta | Aprovado |
| RF-014 | Editar nota da flag | O sistema deve permitir que o usuário edite a nota opcional associada à flag de um card. | A definir | A definir | A definir | Alta | Aprovado |
| RF-015 | Remover flag do card | O sistema deve permitir que o usuário remova a flag diretamente durante a revisão ou na visualização individual do card. | A definir | A definir | A definir | Alta | Aprovado |
| RF-016 | Visualizar cards com flag | O sistema deve permitir que o usuário identifique e visualize os cards que possuem flag dentro de um deck. | A definir | A definir | A definir | Alta | Aprovado |
| RF-017 | Iniciar sessão de revisão | O sistema deve permitir que o usuário inicie uma sessão de revisão a partir de um deck aberto. | A definir | A definir | A definir | Alta | Aprovado |
| RF-018 | Exibir frente do card | Durante uma sessão, o sistema deve apresentar inicialmente a frente do card e manter o verso oculto. | A definir | A definir | A definir | Alta | Aprovado |
| RF-019 | Revelar verso do card | O sistema deve permitir que o usuário revele o verso do card por meio de uma ação de toque, utilizando uma animação de giro. | A definir | A definir | A definir | Alta | Aprovado |
| RF-020 | Avaliar card | Após revelar o verso, o sistema deve permitir que o usuário avalie o card como Errei, Difícil, Bom ou Fácil, correspondentes a Again, Hard, Good e Easy. | A definir | A definir | A definir | Alta | Aprovado |
| RF-021 | Atualizar agendamento do card | Após cada avaliação, o sistema deve calcular e armazenar o próximo estado de agendamento do card. | A definir | A definir | A definir | Alta | Aprovado |
| RF-022 | Persistir avaliação imediatamente | O sistema deve persistir cada avaliação concluída antes de apresentar o próximo card, sem depender do encerramento da sessão. | A definir | A definir | A definir | Alta | Aprovado |
| RF-023 | Encerrar sessão antecipadamente | O sistema deve permitir que o usuário saia da sessão a qualquer momento, preservando todas as avaliações já concluídas. | A definir | A definir | A definir | Alta | Aprovado |
| RF-024 | Desfazer última avaliação | Durante uma sessão, o sistema deve permitir que o usuário desfaça a avaliação mais recente e retorne ao card correspondente. | A definir | A definir | A definir | Alta | Aprovado |
| RF-025 | Finalizar sessão | Quando não restarem cards na sessão atual, o sistema deve informar sua finalização e permitir que o usuário retorne às informações do deck ou à biblioteca. | A definir | A definir | A definir | Alta | Aprovado |
| RF-026 | Exibir disponibilidade de cards | O sistema deve informar de maneira neutra a quantidade de cards atualmente disponíveis para revisão em um deck. A forma, a localização da apresentação e a possível exibição da data da próxima revisão ainda serão definidas. | A definir | A definir | A definir | Média | Em discussão |
| RF-027 | Exibir informações avançadas do FSRS | O sistema deve disponibilizar informações avançadas de agendamento em uma área inicialmente recolhida e expansível após as informações principais do deck. | A definir | A definir | A definir | Alta | Aprovado |
| RF-028 | Configurar início do dia de estudo | O sistema deve permitir que o usuário altere globalmente o horário que determina o início de um novo dia de estudo. | A definir | A definir | A definir | Alta | Aprovado |
| RN-001 | Importação integral | Um arquivo JSON somente pode ser aceito quando sua estrutura completa for válida e todos os dados necessários puderem ser importados. Uma importação inválida não pode produzir decks ou cards parcialmente importados. | A definir | A definir | A definir | Alta | Aprovado |
| RN-002 | Tipo de card da Fase 1 | Na Fase 1, cada card importado deve possuir conteúdo textual de frente e verso. O conteúdo importado não pode ser criado ou editado dentro da aplicação. | A definir | A definir | A definir | Alta | Aprovado |
| RN-003 | Unicidade da flag | Cada card pode possuir no máximo uma flag. A flag pode conter uma nota textual opcional e editável; sua remoção também deve remover a nota associada. | A definir | A definir | A definir | Alta | Aprovado |
| RN-004 | Vínculo da sessão ao deck | Cada sessão de revisão deve pertencer ao deck a partir do qual foi iniciada. | A definir | A definir | A definir | Alta | Aprovado |
| RN-005 | Prioridade dos cards devidos | Os cards devidos no dia de estudo devem ter prioridade na composição da sessão. Cards novos somente podem ser adicionados quando houver capacidade disponível segundo os limites configurados. | A definir | A definir | A definir | Alta | Aprovado |
| RN-006 | Limite diário de cards novos | A quantidade de cards novos introduzidos em um dia de estudo não pode ultrapassar o limite configurado para o deck. | A definir | A definir | A definir | Alta | Aprovado |
| RN-007 | Limite de cards por sessão | A composição inicial de uma sessão deve respeitar o limite de cards por sessão configurado para o deck. | A definir | A definir | A definir | Alta | Aprovado |
| RN-008 | Excesso de cards devidos | O comportamento da sessão quando a quantidade de cards devidos ultrapassar o limite configurado ainda deve ser definido, incluindo a possibilidade de continuação opcional. | A definir | A definir | A definir | Alta | Em discussão |
| RN-009 | Desativação do limite da sessão | A possibilidade de o usuário desativar o limite de cards por sessão ainda deve ser avaliada. | A definir | A definir | A definir | Média | Em discussão |
| RN-010 | Avaliação após revelação | As opções de avaliação somente podem ser disponibilizadas depois que o usuário revelar o verso do card. | A definir | A definir | A definir | Alta | Aprovado |
| RN-011 | Cálculo pelo FSRS v6 | O próximo estado de agendamento deve ser calculado pelo FSRS v6, por meio de ts-fsrs, considerando o estado atual do card, a data da revisão, a avaliação escolhida e a retenção desejada do deck. A aplicação não deve substituir o algoritmo por intervalos manuais. | A definir | A definir | A definir | Alta | Aprovado |
| RN-012 | Comportamento de Again | A aplicação não deve obrigar um card avaliado como Again a retornar repetidamente até uma resposta correta. Seu reagendamento e eventual retorno devem seguir o comportamento validado do FSRS v6. | A definir | A definir | A definir | Alta | Aprovado |
| RN-013 | Escopo do undo | O undo deve afetar somente a avaliação mais recente da sessão, restaurar o estado anterior do card e do agendamento, reverter a persistência correspondente e reapresentar o card. | A definir | A definir | A definir | Alta | Aprovado |
| RN-014 | Virada global do dia de estudo | O dia de estudo deve começar no horário global configurado, utilizando 04:00 como padrão e o horário local do dispositivo como referência. | A definir | A definir | A definir | Alta | Aprovado |
| RN-015 | Sessão durante a virada do dia | Uma sessão iniciada antes do horário de virada deve permanecer vinculada ao mesmo dia de estudo até seu encerramento. O novo dia passa a valer na próxima sessão. | A definir | A definir | A definir | Alta | Aprovado |
| RN-016 | Exclusão dos dados do deck | A exclusão de um deck deve remover seus cards, tags associadas, flags e notas, estado de agendamento e dados necessários ao undo. A Fase 1 não pressupõe a existência de histórico completo de revisões. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-001 | Operação offline | Todos os fluxos obrigatórios da Fase 1 devem permanecer utilizáveis sem conexão com a internet. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-002 | Operação local-first | A Fase 1 deve funcionar sem conta, backend, armazenamento em nuvem ou sincronização, mantendo localmente os dados necessários aos fluxos obrigatórios. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-003 | Consistência da persistência | A persistência de uma avaliação não pode deixar o card, o agendamento e os dados necessários ao undo em estados parciais ou incompatíveis. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-004 | Continuidade após reinício | Fechar e reabrir a aplicação deve preservar decks, cards, tags, flags, notas, configurações e o progresso de agendamento. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-005 | Tratamento compreensível de erros | A aplicação deve apresentar mensagens compreensíveis para erros de importação, persistência e operações inválidas, sem ocultar falhas que possam afetar dados do usuário. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-006 | Acessibilidade | As interações obrigatórias da Fase 1 devem ser acessíveis e não podem depender exclusivamente de cor, animação ou conhecimento prévio do FSRS. Os critérios específicos serão detalhados nos respectivos casos de teste. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-007 | Adaptação a smartphones Android | A interface da Fase 1 deve permanecer utilizável nas resoluções de smartphones Android definidas como suportadas pelo projeto. Tablets não fazem parte desta fase. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-008 | Duração da animação de giro | A animação de giro utilizada para revelar o verso do card deve possuir duração de 200 ms. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-009 | Entrega Android | A Fase 1 deve ser disponibilizada como um development build Android instalável e utilizável para o fluxo obrigatório de estudo. | A definir | A definir | A definir | Alta | Aprovado |
| RNF-010 | Critério de usabilidade | Os participantes da avaliação devem conseguir concluir as tarefas representativas dentro dos limites que serão definidos previamente no protocolo de pesquisa. | A definir | A definir | A definir | Alta | Em discussão |
| RNF-011 | Critério de satisfação | A avaliação com usuários deve alcançar o limiar de satisfação que será definido previamente no protocolo de pesquisa. | A definir | A definir | A definir | Alta | Em discussão |
| RNF-012 | Funcionalidade essencial sem paywall | Os fluxos essenciais de estudo local devem permanecer gratuitos e não podem ser condicionados a assinatura ou pagamento. | A definir | A definir | A definir | Alta | Aprovado |

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
| RF-040 | Definir metas e lembretes locais | O sistema deve permitir que o usuário defina metas de estudo e lembretes locais. | A definir | A definir | A definir | Média | Aprovado |
| RF-041 | Emitir notificações locais | O sistema deve poder emitir notificações locais relacionadas ao estudo de acordo com preferências do usuário. Gatilhos, frequência, conteúdo, horários silenciosos e relação com decks ainda serão definidos. | A definir | A definir | A definir | Média | Em discussão |
| RF-042 | Exibir feedback pós-sessão | O sistema deve apresentar feedback pós-sessão mais detalhado do que a confirmação mínima prevista na Fase 1. | A definir | A definir | A definir | Média | Aprovado |
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

As seguintes decisões devem permanecer rastreadas antes de seus requisitos serem promovidos para Aprovado ou detalhados em casos de uso, design e testes:

1. Definir o comportamento quando os cards devidos ultrapassarem o limite de uma sessão.
2. Decidir se o limite de cards por sessão poderá ser desativado.
3. Definir a forma e a localização da quantidade de cards disponíveis.
4. Decidir se a data da próxima revisão será exibida na área avançada do deck.
5. Definir os limiares de usabilidade e satisfação no protocolo de pesquisa.
6. Definir o funcionamento detalhado das notificações locais da Fase 2.

## Integração futura com GitHub Issues e Projects

Quando o acompanhamento operacional for criado:

- cada requisito deverá apontar para uma GitHub Issue correspondente ou para a Issue que coordene sua implementação;
- as Issues deverão referenciar o identificador permanente do requisito;
- o GitHub Project deverá manter o status operacional, responsáveis e iterações;
- esta especificação deverá registrar a baseline e a data da última sincronização;
- Pull Requests e testes deverão referenciar os requisitos que implementam ou verificam.

O conteúdo normativo do requisito permanece neste documento. Issues e o GitHub Project não devem manter uma segunda definição divergente do mesmo comportamento.
