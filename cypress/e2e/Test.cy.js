
describe ('Funcionalidade Login', () => {
  it('Login com credenciais válidas', () => {
      // Visitar a página
      cy.visit('https://www.saucedemo.com/v1/index.html')
      // Preencher o campo Username
      cy.get('input#user-name').type('standard_user')
      // Preencher o campo Password
      cy.get('input#password').type('secret_sauce')
      // Clicar no botão Login 
      cy.get('input#login-button').click()
  }) 
  it('Login com Username inválido', () => {
       // Visitar a página
       cy.visit('https://www.saucedemo.com/v1/index.html')
       // Preencher o campo Username
       cy.get('input#user-name').type('wrongUsername')
       // Preencher o campo Password
       cy.get('input#password').type('secret_sauce')
       // Clicar no botão Login 
       cy.get('input#login-button').click()
       // Assertion para mensagem de erro 
       cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })
  it('Login com Password inválido', () => {
      // Visitar a página
      cy.visit('https://www.saucedemo.com/v1/index.html')
      // Preencher o campo Username
      cy.get('input#user-name').type('standard_user')
      // Preencher o campo Password
      cy.get('input#password').type('wrongPassword')
      // Clicar no botão Login 
      cy.get('input#login-button').click()
      // Assertion para mensagem de erro 
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')

  })
  it('Login com campo Username vazio', () => {
      // Visitar a página
      cy.visit('https://www.saucedemo.com/v1/index.html')
      // Preencher o campo Password
      cy.get('input#password').type('secret_sauce')
      // Clicar no botão Login 
      cy.get('input#login-button').click()
      // Assertion para mensagem de erro 
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')

  })
  it('Login com campo Password vazio', () => {
      // Visitar a página
      cy.visit('https://www.saucedemo.com/v1/index.html')
      // Preencher o campo Username
      cy.get('input#user-name').type('standard_user')
      // Clicar no botão Login 
      cy.get('input#login-button').click()
      // Assertion para mensagem de erro 
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required')

  })
  it('Login com campos Username e Password vazios', () => {
      // Visitar a página
      cy.visit('https://www.saucedemo.com/v1/index.html')
      // Clicar no botão Login 
      cy.get('input#login-button').click()
      // Assertion para mensagem de erro 
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')

  })
}) 

describe('Teste de funcionalidade AddToCart', () => {
    beforeEach( () => {
      // Visitar a página
      cy.visit('https://www.saucedemo.com/v1/index.html')
      // Preencher o campo Username 
      cy.get('input#user-name').type('standard_user')
      // Preencher o campo Password
      cy.get('input#password').type('secret_sauce')
      // Clicar no botão Login 
      cy.get('input#login-button').click()
    })
    
    it('Adicionando um item ao carrinho', () => {
        // Após login feito, selecionar produto desejado 
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        // Assertion para botão REMOVE
        cy.get('.btn_secondary').contains('REMOVE')
        // Visitar a página do carrinho 
        cy.visit('https://www.saucedemo.com/v1/cart.html')
        // Assertion para adição ao carrinho
        cy.get('.cart_quantity').should('have.text', '1')
        cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')


    })
    it('Removendo item do carrinho', () => {
        // Após login feito, selecionar produto desejado 
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        // Assertion para botão REMOVE
        cy.get('.btn_secondary').contains('REMOVE')
        // Removendo o item do carrinho
        cy.get('.btn_secondary').click()
        // Assertion para botão ADD TO CART
        cy.get(':nth-child(1) > .pricebar > .btn_primary').contains('ADD TO CART')
    })
})

describe ('Checkout com sucesso', () => {
    it('Checkout com sucesso', () => {
      // Realizando Login
      cy.visit('https://www.saucedemo.com/v1/index.html')
      cy.get('input#user-name').type('standard_user')
      cy.get('input#password').type('secret_sauce')
      cy.get('input#login-button').click()
      // Selecionando o item ao carrinho 
      cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
      cy.get('.btn_secondary').contains('REMOVE')
      // Visitar a página do carrinho 
      cy.visit('https://www.saucedemo.com/v1/cart.html')
      // Assertion para adição ao carrinho
      cy.get('.cart_quantity').should('have.text', '1')
      cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
      // Clicar no botão de Checkout
      cy.get('.btn_action').click()
      // Preenchendo dados de Checkout
      cy.get('[data-test="firstName"]').type('Rafael')
      cy.get('[data-test="lastName"]').type('Oliveira') 
      cy.get('[data-test="postalCode"]').type('4760-143')
      // Clicar no botão 'Continue'
      cy.get('.btn_primary').click()
      // Assertions na página 'Overview', antes de finalizar a operação
      cy.get('.summary_quantity').should('have.text', '1')
      cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
      // Clicar no botão 'Finish', para finalizar a operação
      cy.get('.btn_action').click()
      // Assertion para saber se foi finalizado
      cy.get('.subheader').should('have.text', 'Finish')

    })
})
