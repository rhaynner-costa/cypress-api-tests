describe("Testes da api de listagem", () => {

    it.skip("Modelo", () => {

        /*teste aqui*/

        cy.request({
            method: "",
            url: "",
            headers: {

            },
            body: {
                /*somente no metodo post, no metodo get essas informaçoes são enviadas na url*/
            }
        }).then((response) => {
            cy.log(response.body)
        })

    })

    it("teste 2 - lista retorna 200 na pagina 1", () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users?page=1",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'

            },
            body: {
                /*somente no metodo post, no metodo get essas informaçoes são enviadas na url*/
            }

        }).then((response) => {
            cy.log(response.body);
            expect(response.status).to.eq(200);
            expect(response.body.data[0].id).to.eq(1);

        })

    });

    it('Teste 3 - Lista retorna 200 na pagina 2', ()=>{
        cy.getApi('https://reqres.in/api/users?page=2').then((response)=>{
            expect(response.status).to.eq(200);
        
        })
    })

})