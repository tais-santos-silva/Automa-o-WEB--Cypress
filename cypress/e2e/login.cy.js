/// <reference types="cypress" />
import '../support/login.commands.js'

describe ('Login', () => {

beforeEach (() => {
    cy.acessLogin()
})

 
it ('Cadastro de dados com sucesso', () => {
    cy.get('#fname').type('Taís')
    cy.get('#lname').type('Santos')
    cy.get('#cname').type('Tais santos silva')
    cy.get('#email').type('taiss4379@gmail.com')
    cy.get('#country').select('usa')
    cy.get('#city').select('Afeganistão')
    cy.get('#zip').type('122223')
    cy.get('#faddress').type('')
    cy.get('#messages').type('')
    cy.get('.form-check-label').type('')
    cy.get('.theme-btn-one').click()
})

})