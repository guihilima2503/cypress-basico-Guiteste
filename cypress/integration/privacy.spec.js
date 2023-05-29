it('Testa a página da politica de privacidade de forma idependente',function() {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing')
})