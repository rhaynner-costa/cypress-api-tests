/// <reference types="Cypress"/>

describe("Testes da api de listagem", () => {
    //testar listagem retornando 200
    it('testar listagem retornando 200', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?page=1',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'

            }
        }).then((response)=>{
            expect(response.status).to.equal(200)
           // cy.log(response)
            cy.log(response.body.data[0])
        })

    })


    //testar listagem vazia
    //validar o jasonSchema

})