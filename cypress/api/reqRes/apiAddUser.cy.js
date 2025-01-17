import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true, verbose: true });

describe("API tests that add new users", () => {
  it("Teste 1 - Valida o status code 201 quando criado um novo usuario", () => {
    cy.fixture("users").then((data) => {
      const requestBody = data;

      cy.postApi("/users", requestBody).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("name", requestBody.name);
        expect(response.body).to.have.property("job", requestBody.job);
        expect(response.body.id).not.be.null;
        expect(response.body.createdAt).not.be.null;
      });
    });
  });

  it("Teste 2 - Valida a criação de um usuario um nome invalido", () => {
    cy.request({
      method: "POST",
      url: "/users",
      body: {
        name: "",
        job: "Manager",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("name", "");
      expect(response.body).to.have.property("job", "Manager");
      expect(response.body.id).not.be.null;
      expect(response.body.createdAt).not.be.null;
    });
  });

  it("Teste 3 - Valida a criação de um usuario com o cargo invalido", () => {
    cy.request({
      method: "POST",
      url: "/users",
      body: {
        name: "Rhaynner",
        job: "",
      },
    }).then((response) => {
      expect(response.body.name).to.equal("Rhaynner");
      expect(response.body.job).to.equal("");
      expect(response.body.id).not.be.null;
      expect(response.body.createdAt).not.be.null;
    });
  });

  it("Teste 4 - Teste de contrato", () => {
    cy.request({
      method: "POST",
      url: "/users",
      body: {
        name: "Rhaynner",
        job: "Manager",
      },
    }).then((response) => {
      cy.fixture("userSchema").then((schema) => {
        const validate = ajv.compile(schema);

        const valid = validate(response.body);

        if (!valid)
          cy.log(validate.errors).then(() => {
            throw new Error("Falha no contrato");
          });
      });
    });
  });
});
