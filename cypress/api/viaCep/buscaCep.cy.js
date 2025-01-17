const APIC_CEP = Cypress.env("API_CEP");

const cep = ["74843170", "01001000"];

describe("Teste Automatizados da API consultar CEP", () => {
  cep.forEach((cep) => {
    it(`Consulta um cep valido CEP - ${cep}`, () => {
      cy.request({
        method: "GET",
        url: `${APIC_CEP}/${cep}/json/`,
        failOnStatusCode: true,
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
});
