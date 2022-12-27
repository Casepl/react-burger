const credential = require('../fixtures/credential.json');
describe('Check burger constructor', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    function dropIngredientsOrder() {
        cy.get('[data-test-id="burger-constructor-drop"').as('dropArea');

        cy.get('[data-test-id="bun"]').first().trigger('dragstart');

        cy.get('@dropArea').trigger('drop');

        cy.get('[data-test-id="sauce"]').first().trigger('dragstart');

        cy.get('@dropArea').trigger('drop');

        cy.get('[data-test-id="main"]').first().trigger('dragstart');

        cy.get('@dropArea').trigger('drop');
    }

    function login() {
        cy.get('input[name="email"]').type(credential.login);
        cy.get('input[name="password"]').type(credential.password);
        cy.get('[data-test-id="login-button"]').click();
    }

    it('should be drag and drop ingredients', function() {
        dropIngredientsOrder();
        cy.get('@dropArea').find('[data-test-id="bun"]')
          .should('have.length', 2);
        cy.get('@dropArea').find('[data-test-id="sauce"]')
          .should('have.length', 1);
        cy.get('@dropArea').find('[data-test-id="main"]')
          .should('have.length', 1);
    });

    it('should open modal ingredients', function() {
        cy.get('[data-test-id="bun"]').first().click();
        cy.get('[class^=modal_header-root__]').find('p').as('modalHeader');
        cy.get('@modalHeader').contains('Детали ингредиента')
    });


    it('should create order and close modal', function() {
        dropIngredientsOrder();
        cy.get('[data-test-id="order-button"]').as('orderButton');
        cy.get('@orderButton').click();
        login();
        cy.get('@orderButton').click();
        cy.get('[data-test-id="order-id"]', { timeout: 17000 }).should('be.visible');
        cy.get('[data-test-id="order-id"]').should('not.be.empty');
        cy.get('[data-test-id="modal-close-button"').as('modalCloseButton');
        cy.get('@modalCloseButton').click();
        cy.get('@modalCloseButton').should('not.exist');
    });
});
