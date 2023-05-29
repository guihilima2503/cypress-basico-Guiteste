/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  
    })
    
    // Exercicio 1
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id="firstName"]').type('Guilherme')
        cy.get('input[id="lastName"]').type('Mendes Lima')
        cy.get('input[id="email"]').type('Guilherme.lima@nimbi.com.br')
        cy.get('textarea[id="open-text-area"]').type('Estou testando pela primeira vez')
        cy.get('button[class="button"]').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    // Exercicio 1.1
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Mendes Lima')
        cy.get('#email').type('Guilherme.lima@nimbi.com.br')
        cy.get('#open-text-area')
        .type('Estou testando pela primeira vez kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', {delay:0})
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    // Exercicio 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Mendes Lima')
        cy.get('#email').type('Guilherme.lima.nimbi.com.br')
        cy.get('#open-text-area')
        .type('Estou testando pela primeira vez kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', {delay:0})
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    // Exercicio 3
    it('Campo telefone continua vazio preenchico com valor não-numerico', function() {
        cy.get('#phone').type('Guilherme').should('have.value', '')
    })

    // Exercicio 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longtext = 'Estou testando pela primeira vez kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Mendes Lima')
        cy.get('#email').type('Guilherme@lima.nimbi.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longtext, {delay:0})
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    // Exercicio 5    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        const longtext = 'Estou testando pela primeira vez kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
        cy.get('#firstName').type('Guilherme').should('have.value', 'Guilherme').clear().should('have.value', '')
        cy.get('#lastName').type('Mendes Lima').should('have.value', 'Mendes Lima').clear().should('have.value', '')
        cy.get('#email').type('Guilherme.lima.nimbi.com.br').should('have.value', 'Guilherme.lima.nimbi.com.br').clear().should('have.value', '')
        cy.get('#phone').type('11999999').should('have.value', '11999999').clear().should('have.value', '')

    })

    // Exercicio 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
       // cy.get('.button').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    // Exercicio 7
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //Seleção de opções de campos de seleção suspensa
    //Exercicio 1
    it('Seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    //Exercicio 2
    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    //Exercicio 3
    it('Seleciona um produto (Blog) por seu indice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //Marcando inputs do tipo radio
    //Exercicio 1
    it('Marca o tipo de atendimento "feedback"', function() {
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    //Exercicio 2
    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check().should('be.checked')
        })
    })

    //Marcando e desmarcando inputs do tipo checkbox
    //Exercicio 1
    it('Marca ambos checkboxes, depois desmarca o ultimo', function() {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.checked')
    })

    //Fazendo upload de arquivos com cypress
    //Exercicio 1
    it('Selecione um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //Exercicio 2
    it('Selecione um arquivo simulando drag-and-drop', function() {
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //Exercicio 2
    it('Selecione um arquivo simulando uma fixtures a qual foi dada um alias', function() {
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]').should('not.have.value').selectFile('@samplefile', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    
    })
    
    //Lidando com links que abrem em outra aba
    //Exercicio 1
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a').should('have.attr','target','_blank')    
    })

    //Exercicio 2
    it('acessa a pagina da política de privacidade removendo o target e clicando no link', function() {
        cy.get('a').invoke('removeAttr','target').click()
    })

    

    



  })