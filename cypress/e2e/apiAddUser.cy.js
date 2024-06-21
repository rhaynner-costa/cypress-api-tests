/// <reference types="Cypress"/>

describe("API tests that add new users", () => {
      //add a new user
    it('Test 1 - Validate status code 201 when adding a new user', ()=>{
      cy.request({
        method:'POST',
        url: 'https://reqres.in/api/users',
        body: {
            "name": "Rhaynner",
            "job": "Manager"
        }
      }).then((response)=>{
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal('Rhaynner')
        expect(response.body.job).to.equal('Manager')
        expect(response.body.id).not.be.null

      })

    })
 

})





 
    //adicionar um novo usuario, enviando o nome no body em branco
    //adicionar um novo usuario, enviando o job no body em branco
    //test do jasonSchema
    //vaiidar o status code
    //validar a data de cadastrado, deve ser iqual a data de hoje
    //validar se retornou o id 
    //fazer o assert no nome do usuario cadastrado
    //fazer o asser no cadastro do JOb