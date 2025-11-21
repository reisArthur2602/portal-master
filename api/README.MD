### 🧩 Módulo de Autenticação

- [x] Autenticação — /auth/login
      Usuário acessar o sistema utilizando email e senha.

- [x] Criação de Conta — /auth/criar-conta
      Criação de conta com nome, email e senha para novos usuários.

- [x] Pegar Dados do user logado — /auth/profile
      Criação de conta com nome, email e senha para novos usuários.

### 👥 Módulo de Usuários

- [x] Listar Usuários — /usuarios
      Exibe a lista de todos os usuários cadastrados.

- [x] Convidar Usuário — /usuarios/convites/novo
      Envio de convites por email para novos colaboradores.

- [x] Listar Convites Pendentes — /usuarios/convites
      Exibe convites enviados que ainda não foram aceitos.

- [x] Revogar Convite — /usuarios/convites/:id/revogar
      Permite cancelar um convite antes de ser utilizado.

- [x] Aceitar Convite — /usuarios/convites/:id/aceitar
      Permite aceitar um convite

- [x] Gerenciar Funções (Roles) — /usuarios/:id/role
      Ajuste de permissões do usuário (Admin, Técnico, Recepção, etc.).

### 🧑‍⚕️ Módulo de Pacientes

- [x] Criar Paciente — /pacientes/criar
      Cadastro de novos pacientes.

- [x] Listar Pacientes — /pacientes
      Lista completa com filtros por nome, CPF e registro.

- [] Deletar Paciente — /pacientes/:id/deletar
  Remoção definitiva do paciente.

- [x] Buscar Dados do Paciente — /pacientes/:id
      Exibe todas as informações do paciente e exames associados.

### 🧪 Módulo de Exames

- [x] Listar Exames — /exames
      Inclui filtros por registro, CPF, status e data.

- [] Criar Exame — /exames/criar
  Cadastro de novo exame com informações e anexos.

- [x] Buscar Exame — /exames/:id
      Exibe dados completos, anexos e histórico do exame.

- [x] Atualizar Status do Exame — /exames/:id/status
      Permite modificar o status

### 📊 Módulo de Dashboard

- [ ] Visão Geral do Dashboard — /dashboard
- Exames prontos
- Exames pendentes
- Exames entregues hoje
- Exames aguardando retirada
- Total de exames entregues

### ⚙️ Módulo de Configurações

- [ ] Configurar FTP — /configuracoes/ftp
      Campos para atualizar host, porta, usuário e senha do servidor FTP.

- [ ] Configurar Orthanc — /configuracoes/orthanc
      Ajustes de conexão com o servidor DICOM/Orthanc (URL, credenciais, portas, etc.).
