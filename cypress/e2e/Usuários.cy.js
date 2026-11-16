/// <reference types="cypress"/>

let token

describe('GET - Teste de API - Gestão de Usuário', () => {

    beforeEach(() => {
        cy.geraToken("admin@biblioteca.com", "admin123").then(tkn => {
            token = tkn
        })
    });

    it('Deve listar Usuários com sucesso', () => {
        cy.api({
            method: "GET",
            url: "users",
            headers: { "Authorization": token }
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.users).to.be.an("array")
        })
    });

    it('Deve validar propriedades de um Usuário', () => {
        cy.api({
            method: "GET",
            url: "users",
            headers: { "Authorization": token }
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.users[0]).to.have.property("id")
            expect(response.body.users[0]).to.have.property("name")
            expect(response.body.users[0]).to.have.property("email")
        })
    });

    it('Deve listar um usuário com sucesso utilizando um ID', () => {
        cy.api({
            method: "GET",
            url: "users/2",
            headers: { "Authorization": token }
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("id")
            expect(response.body).to.have.property("name")
            expect(response.body).to.have.property("email")
        })
    });

    it('Deve listar usuário com sucesso usando filtro - parâmetros', () => {
        cy.api({
            method: "GET",
            url: "users/2",
            headers: { "Authorization": token },
            qs: {
                page: 1,
                limit: 20,
                search: "usuario"
            }
        }).should(response => {
            expect(response.status).to.equal(200)
        })
    });

});

describe('Post - Teste de API - Gestão de usuários', () => {

    it('Deve Cadastrar usuário com sucesso', () => {
        let email = `thiago${Date.now()}@email.com`
        cy.api({
            method: "post",
            url: "users",
            body: {
                "name": "Maria Santos",
                "email": email,
                "password": "senha123"
            }
        }).should(response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Usuário criado com sucesso.")
        })
    });

    it('Deve validar um usuário cadastrado com e-mail inválido', () => {
        cy.api({
            method: "POST",
            url: "users",
            body: {
                "name": "Maria Santos",
                "email": "Maarii.demail.com",
                "password": "senha123"
            },
            failOnStatusCode: false
        }).should(response => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal("Formato de email inválido.")
        })
    });

});

describe('PUT - Teste de API - Gestão de usuários', () => {

    it('Deve atualizar um usuário com sucesso', () => {
        cy.api({
            method: "PUT",
            url: "users/44",
            headers: { "Authorization": token },
            body: {
                "name": "João Nascimento",
                "email": "joao.novo@email.com",
                "password": "novaSenha123"
            }
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Usuário atualizado com sucesso.")
        })
    });

    it('Deve atualizar um usuario com sucesso - de forma dinânmica', () => {
        let email = `thiago${Date.now()}@email.com`
        cy.cadastrarUsuario('joão Nascimento', email, 'novaSenha123').then(userId => {
            cy.api({
                method: "PUT",
                url: "users/" + userId,
                headers: { "Authorization": token },
                body: {
                    name: "João Nascimento",
                    email: email,
                    password: "novaSenha123"
                }
            }).should(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal("Usuário atualizado com sucesso.")
            })
        })
    });
});

describe('DELETE - Teste de api - Gestão de usuários', () => {

    it.skip('Deve excluir um usuário com sucesso', () => {
        cy.api({
            method: "DELETE",
            url: "users/90",
            headers: { "Authorization": token },
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Usuário removido com sucesso.")
        })
    });

    it('Deve excluir um usuario - De forma dinânmica', () => {
        let email = `thiago${Date.now()}@email.com`
        cy.cadastrarUsuario('Thiago para deletar', email, 'senha231').then(userId => {
            cy.api({
                method: "DELETE",
                url: `users/${userId}`,
                headers: { "Authorization": token },
            }).should(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal("Usuário removido com sucesso.")
            })
        })
    });
});