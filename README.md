# GoBarber
Aplicação de gerenciamentos de atendimentos em barbearias desenvolvida durante o curso Bootcamp GoStack da Rocketseat.


# Recuperação de senha

**RF - Requisitos Funcionais**
Funcionalidades
- O usuário deve poder recuperar sua senha informando o e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha.

**RNF - Requisitos Não Funcionais**
Tecnologias e decisões utilizadas nas funcionalidades
- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN - Regras de Negócio**
- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetá-la;

# Atualização do perfil

**RF**
- O usuário deve poder atualizar seu nome, email e senha;

**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel de prestador
**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação semper que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços
**RF**
- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro horario às 8h, último às 17h);
- O usuário não pode agendar em um horário ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar um serviço consigo mesmo;

