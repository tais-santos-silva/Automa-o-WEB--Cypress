/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import '../support/acessarPage-commands'

const { beforeEach } = require("mocha")

Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para prevenir o Cypress de falhar o teste em erros não capturados
  if (err.message.includes('Navigation cancelled from')) {
    console.log('🚀 TO INFINITY AND BEYOND 🚀')
    return false
  }
})

describe('Criar conta', () => {
    let email;
    let senha;
    let nome;

    beforeEach(() =>{
      cy.acessRegister()
      nome  = faker.person.fullName();  
      senha = faker.internet.password();
      email = faker.internet.email();
      senha = faker.internet.password();
    })

    it('Cadastro de usuário com sucesso', () => {
        cy.get('#user').type(nome);
        cy.get('#email').type(email);
        cy.get('#password').type(senha);
        cy.get('#btnRegister').click()
        cy.get('#swal2-title').should('be.visible').should('have.text', 'Cadastro realizado!')
        cy.get('#swal2-html-container').should('be.visible').should('have.text', 'Bem-vindo Tais Santos')
        
    })

    it('Cadastro de usuário com nome vazio', () => {
        cy.get('#email').type(email)
        cy.get('#password').type(senha)
        cy.get('#btnRegister').click()
        cy.get('#errorMessageFirstName').should('be.visible').and('have.text', 'O campo nome deve ser prenchido')

    })

    it('Cadastro de usuário com e-mail vazio', () => {
        cy.get('#user').type(nome)
        cy.get('#password').type(senha)
        cy.get('#btnRegister').click()
        cy.get('#errorMessageFirstName').should('be.visible').and('have.text', 'O campo e-mail deve ser prenchido corretamente')
    })

    it('Cadastro de usuário com senha vazia', () => {
        cy.get('#user').type(nome)
        cy.get('#email').type(email)
        cy.get('#btnRegister').click()
        cy.get('#errorMessageFirstName').should('be.visible').and('have.text', 'O campo senha deve ter pelo menos 6 dígitos')
    })

    it('Cadastro de usuário com todos os campos vazios', () => {
        cy.get('#btnRegister').click()
        cy.get('#errorMessageFirstName').should('be.visible').should('have.text', 'O campo nome deve ser prenchido')
        //cy.get('#errorMessageEmail') .should('be.visible').and('have.text', 'O campo e-mail deve ser preenchido corretamente')
        //cy.get('.errorLabel').should('be.visible').and('have.text', 'O campo senha deve ter pelo menos 6 dígitos')


    })

    it('Cadastro de usuário com e-mail inválido', () => {
        cy.get('#user').type('Tais Santos') 
        cy.get('#email').type('taiss4379@gmail') 
        cy.get('#password').type('123456789Senha') 
        cy.get('#btnRegister').click()
        cy.get('#errorMessageFirstName').should('be.visible').and('have.text', 'O campo e-mail deve ser prenchido corretamente')
    })

    it('Cadastro de usuário com senha inválida', () => {
        cy.get('#user').type('Tais Santos') 
        cy.get('#email').type('taiss4379@gmail.com') 
        cy.get('#password').type('12') 
        cy.get('#btnRegister').click()
        cy.get('#errorMessageFirstName').should('be.visible').and('have.text', 'O campo senha deve ter pelo menos 6 dígitos')
        
    })
})
