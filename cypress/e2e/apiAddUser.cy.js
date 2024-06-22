/// <reference types="Cypress"/>

describe("API tests that add new users", () => {

  it('Test 1 - Validate status code 201 when adding a new user', () => {

    cy.fixture('users').then((data) => {
      const requestBody = data

      cy.postApi('/users', requestBody).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('name', requestBody.name)
        expect(response.body).to.have.property('job', requestBody.job)
        expect(response.body.id).not.be.null
        expect(response.body.createdAt).not.be.null

      })

    })

  })

  it('Test 2 - Add a new user by sending an empty name in the request body', () => {

    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        "name": "",
        "job": "Manager"
      }
    }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body).to.have.property('name', "")
      expect(response.body).to.have.property('job', 'Manager')
      expect(response.body.id).not.be.null
      expect(response.body.createdAt).not.be.null

    })

  })

  it('Test 3 - Add a new user by sending an empty job in the request body', () => {

    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        "name": "Rhaynner",
        "job": ""
      }
    }).then((response) => {
      expect(response.body.name).to.equal('Rhaynner')
      expect(response.body.job).to.equal('')
      expect(response.body.id).not.be.null
      expect(response.body.createdAt).not.be.null

    })
    
  })

  //teste de contrato

})