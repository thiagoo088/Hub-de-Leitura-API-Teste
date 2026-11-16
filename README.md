<h1 align="center">Automação de Testes de API com Cypress</h1>

<p align="center">
  Testes automatizados da gestão de usuários do <b>Hub de Leitura</b>, cobrindo GET, POST, PUT e DELETE.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/QA-API%20Testing-blue?style=for-the-badge" alt="QA" />
</p>

---

## Sobre o projeto

Projeto de estudo em **QA e automação de testes de API**. Os testes validam o comportamento do endpoint `/users`: status HTTP, estrutura das respostas, autenticação por token e mensagens de retorno.

> A API do Hub de Leitura roda localmente (`localhost`) e não está incluída neste repositório. Este projeto serve como demonstração do código e da abordagem de automação.

## Destaques

- **Testes independentes:** nos cenários de PUT e DELETE, o próprio teste cria o usuário antes de usá-lo, sem depender de IDs fixos.
- **Dados dinâmicos:** e-mails únicos gerados com `Date.now()`, evitando conflito entre execuções.
- **Autenticação com token:** comando customizado `geraToken` reaproveitado nos testes.
- **Reutilização de código:** comando customizado `cadastrarUsuario` retorna o ID do usuário criado.
- **Cenário negativo:** cadastro com e-mail inválido validando o erro 400 (`failOnStatusCode: false`).

## Cenários cobertos

| Método | Cenário |
|--------|---------|
| **GET** | Listar usuários |
| **GET** | Validar propriedades de um usuário (`id`, `name`, `email`) |
| **GET** | Buscar usuário por ID |
| **GET** | Listar com parâmetros de filtro |
| **POST** | Cadastrar usuário com sucesso (201) |
| **POST** | Validar e-mail com formato inválido (400) |
| **PUT** | Atualizar usuário existente |
| **PUT** | Atualizar usuário de forma dinâmica |
| **DELETE** | Excluir usuário de forma dinâmica |

## Estrutura

```
cypress/
├── e2e/
│   └── Usuários.cy.js      # testes da gestão de usuários
└── support/
    └── commands.js         # comandos customizados
```

## Autor

**Thiago do Nascimento**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/thiago-nascimento-5b99b4388)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://instagram.com/qa.thiago)
