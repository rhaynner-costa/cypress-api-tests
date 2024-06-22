/// <reference types="Cypress"/>

describe("Testes da api de listagem", () => {
    it('Teste 1 - Valida o statuscode 200 da listagem na pagina 1', () => {
        cy.getApi('/users?page=1').should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.page).is.equal(1)
            expect(response.body.per_page, 'number of results per page').is.equal(6)
            expect(response.body.support.text).is.equal('To keep ReqRes free, contributions towards server costs are appreciated!')
            expect(response.body.support.url).is.equal('https://reqres.in/#support-heading')
            expect(response.body.total).is.not.be.null
            expect(response.body.total_pages).is.not.be.null
        })

    })

    it('Teste e - Valida dados validos no responseBody da request', () => {
        cy.getApi('/users?page=2').should((response) => {
            expect(response.status).to.equal(200)
            console.log(response)
            expect(response.body.page).is.equal(2)
            expect(response.body.per_page, 'number of results per page').is.equal(6)
            expect(response.body.per_page).is.not.be.null
            expect(response.body.support.text).is.equal('To keep ReqRes free, contributions towards server costs are appreciated!')
            expect(response.body.support.url).is.equal('https://reqres.in/#support-heading')
            expect(response.body.total).is.not.be.null
            expect(response.body.total_pages).is.not.be.null
        })

    })

    it('Teste 3 - Valida dados validos no array da listagem', () => {
        cy.getApi('/users?page=1').should((response) => {
            expect(response.status).to.equal(200)
            Cypress._.each(response.body.data, (dataUser) => {
                expect(dataUser).to.have.all.keys('avatar', 'email', 'first_name', 'id', 'last_name')
                expect(dataUser.avatar).is.not.be.null
                expect(dataUser.email).is.not.be.null
                expect(dataUser.first_name).is.not.be.null
                expect(dataUser.id).is.not.be.null
                expect(dataUser.last_name).is.not.be.null
            })

        })

    })

    it('Teste 4 - Valida se a lista retornou vazia', () => {
        cy.getApi('/users?page=99').should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.data).is.empty
            expect(response.body.per_page, 'number of results per page').is.equal(6)
            expect(response.body.per_page).is.not.be.null
            expect(response.body.support.text).is.equal('To keep ReqRes free, contributions towards server costs are appreciated!')
            expect(response.body.support.url).is.equal('https://reqres.in/#support-heading')
            expect(response.body.total).is.not.be.null
            expect(response.body.total_pages).is.not.be.null

        })

    })

    //teste de contrato

})