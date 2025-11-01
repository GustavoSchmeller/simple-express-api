🧩 API REST com Express, Supabase, Bcrypt e Sessões

🚧 Projeto em desenvolvimento — novas funcionalidades e melhorias estão sendo implementadas.

Esta é uma API RESTful simples, desenvolvida em Node.js com Express, Supabase (como banco de dados PostgreSQL), Bcrypt para criptografia de senhas e express-session para controle de sessões.
O objetivo é criar uma base sólida para um sistema de autenticação e gerenciamento de usuários.

🚀 Tecnologias utilizadas

Node.js
Express.js
Supabase
Bcrypt
Express-session
Dotenv

⚙️ Configuração do ambiente

1️⃣ Instalação das dependências
npm install express dotenv @supabase/supabase-js
npm install bcrypt express-session

2️⃣ Configuração das variáveis de ambiente
Crie um arquivo .env na raiz do projeto com as chaves do seu Supabase:

SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-api

▶️ Execução

Para iniciar o servidor local:

node index.js
(Saída esperada: "Servidor rodando")

📚 Endpoints disponíveis
👤 Usuários (pessoa)

Método	Rota	Descrição

POST	/pessoa	Cadastra uma nova pessoa (com senha criptografada)
GET	/pessoa	Lista todas as pessoas
GET	/pessoa/:id	Retorna uma pessoa específica
PUT	/pessoa/:id	Atualiza uma pessoa existente
DELETE	/pessoa/:id	Exclui uma pessoa pelo ID

🔐 Autenticação

Método	Rota	Descrição
POST	/login	Realiza login com validação de senha
POST	/logout	Encerra a sessão do usuário

🧠 Estrutura de tabelas (Supabase)

Tabela pessoa
Campo	Tipo	Descrição
id	int (auto increment)	Identificador único
nome	text	Nome do usuário
idade	int	Idade (mínimo 18 anos)
curso	text	Curso ou área
senha	text	Hash da senha gerada com bcrypt

🔐 Criptografia e Sessão

As senhas são criptografadas com bcrypt antes de serem salvas no banco.
No login, a senha digitada é comparada com o hash do banco usando bcrypt.compare.
Após autenticação bem-sucedida, os dados essenciais são armazenados em req.session.data.
No logout, a sessão é encerrada e o cookie connect.sid é limpo.

🧩 Estrutura sugerida de pastas
project/
│
├── index.js                   # Rotas principais e servidor
│
├── controllers/
│   ├── pessoaController.js    # CRUD de pessoas
│   └── authController.js      # Login e logout
│
├── config/
│   └── supabase.js            # Conexão com Supabase
│
├── .env                       # Variáveis de ambiente
├── package.json
└── README.md

📘 Exemplo de uso
Cadastro de pessoa
POST /pessoa
Content-Type: application/json

{
  "nome": "Maria",
  "idade": 25,
  "curso": "Sistemas de Informação",
  "senha": "minhasenha123"
}

Login
POST /login
Content-Type: application/json

{
  "nome": "Maria",
  "senha": "minhasenha123"
}

Logout
POST /logout

⚠️ Observações

O projeto ainda está em fase de construção — endpoints e validações podem mudar.

O retorno de mensagens ainda está sendo aprimorado.

Recomenda-se configurar CORS e middlewares de segurança em ambientes reais.

💡 Melhorias futuras (planejadas)

 Middleware global de autenticação para rotas protegidas

 Implementação de tokens JWT

 Validações adicionais com biblioteca yup ou zod

 Testes automatizados com Jest

 Documentação via Swagger

📜 Licença

Este projeto está sob a licença MIT — livre para uso, modificação e aprendizado.](https://chatgpt.com/c/6906895a-e7ec-8330-939c-f0edb71ba940)
