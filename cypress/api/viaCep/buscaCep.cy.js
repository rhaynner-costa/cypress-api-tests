const APIC_CEP = Cypress.env("API_CEP");

const cep = ["74843170", "01001000"];

describe("Teste Automatizados da API consultar CEP", () => {
  cep.forEach((cep) => {
    it(`Consulta um cep valido CEP - ${cep}`, () => {
      cy.api({
        //cy.request({
        method: "GET",
        url: `${APIC_CEP}/${cep}/json/`,
        //failOnStatusCode: false,
      }).then((resp) => {
        if (resp.status !== 200) {
          cy.log(`Erro ao buscar o CEP ${cep}: Status ${resp.status}`);
        } else {
          expect(resp.status).to.equal(200);
          const responseCep = resp.body.cep.replace("-", ""); // Remove o caractere '-' do CEP
          expect(responseCep).to.equal(cep);
          expect(responseCep).to.be.a("string");
          expect(responseCep).not.to.be.null;
          expect(resp.body.logradouro).to.be.a("string");
          expect(resp.body.logradouro).not.to.be.null;
          expect(resp.body.bairro).to.be.a("string");
          expect(resp.body.bairro).not.to.be.null;
          expect(resp.body.localidade).to.be.a("string");
          expect(resp.body.localidade).not.to.be.null;
          expect(resp.body.uf).to.be.a("string");
          expect(resp.body.uf).not.to.be.null;
        }
      });
    });
  });

  it("Valida os headers da api que busca o cep", () => {
    cy.api({
      method: "GET",
      url: `${APIC_CEP}/01001000/json/`,
    }).then((resp) => {
      if (resp.status !== 200) {
        cy.log(`Erro ao buscar o CEP 74843170: Status ${resp.status}`);
      } else {
        expect(resp.status).to.equal(200);
        expect(resp.headers).to.have.property(
          "content-type",
          "application/json; charset=utf-8"
        );
      }
    });
  });
});
