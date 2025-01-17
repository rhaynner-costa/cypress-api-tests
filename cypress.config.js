/// <reference types="cypress"/>

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://reqres.in/api/",
    specPattern: "cypress/**/**/*.cy.{js,jsx,ts,tsx}",
  },
  env: {
    API_CEP: "https://viacep.com.br/ws",
  },
});
