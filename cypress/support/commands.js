Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('Mendes Lima')
    cy.get('#email').type('Guilherme.lima@nimbi.com.br')
    cy.get('#open-text-area').type('Estou testando pela primeira vez')
    cy.contains('button', 'Enviar').click()
})