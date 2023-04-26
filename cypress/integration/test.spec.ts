import { BURGER_TEST_URL } from './constants';

describe('service is available', function() {
    before(function() {
        cy.visit(BURGER_TEST_URL);
    });

    it('Открытие модального окна с описанием ингредиента', function(){
        cy.get('[class^=burger_ingredient_item__]').first().click();

        cy.contains('Детали ингредиента');
        cy.contains('Краторная булка N-200i');
        cy.contains('Калории, ккал');
        cy.contains('420');
        cy.contains('Белки, г');
        cy.contains('80');
        cy.contains('Жиры, г');
        cy.contains('24');
        cy.contains('Углеводы, г');
        cy.contains('53');

        cy.get('[class^=modal_modal_close__]').click();
        cy.get('[class^=modal_modal_body__]').should('not.exist');

    });

    it('Перетаскивание ингредиентов в конструктор и оформление заказа', function() {
        Cypress.on('uncaught:exception', (er, runnable) => {
            return false;
        })
        const dataTransfer = new DataTransfer();
        cy.get('[data-testid="burger_ingredient_bun"]').first().as('bun');
        cy.get('@bun').contains('Краторная булка N-200i')

        cy.get('[data-testid="burger_ingredient_sauce"]').first().as('sauce');
        cy.get('@sauce').contains('Соус Spicy-X');

        cy.get('[data-testid="burger_ingredient_main"]').first().as('main');
        cy.get('@main').contains('Биокотлета из марсианской Магнолии');

        cy.get('[data-testid=construtor]').as('constructor');

        //Перетаскивание ингредиентов, проверка счетчика
        cy.get('@bun').trigger('dragstart', {dataTransfer});
        cy.get('@constructor').trigger('drop', {dataTransfer});
        cy.get('@bun').parent().parent().find('div').first().find('p').should('have.text', '2')

        cy.get('@sauce').trigger('dragstart', {dataTransfer});
        cy.get('@constructor').trigger('drop', {dataTransfer});
        cy.get('@sauce').parent().parent().find('div').first().find('p').should('have.text', '1')

        cy.get('@main').trigger('dragstart', {dataTransfer});
        cy.get('@constructor').trigger('drop', {dataTransfer});
        cy.get('@main').parent().parent().find('div').first().find('p').should('have.text', '1')

        //Проверка, что элементы были добавлены в конструктор
        cy.get('[data-testid=constructor_element__0]').as('first_element')
        cy.get('@first_element').contains('Соус Spicy-X')

        cy.get('[data-testid=constructor_element__1]').as('second_element')
        cy.get('@second_element').contains('Биокотлета из марсианской Магнолии')

        cy.get('[data-testid=constructor_element__]').as('bun_elements')
        cy.get('[data-testid=constructor_element__]').first().contains('Краторная булка N-200i')
        cy.get('[data-testid=constructor_element__]').last().contains('Краторная булка N-200i')

        cy.get('[class^=burger_constructor_items_constructor__]').as('mains_container')
        cy.get('@mains_container').children().should('have.length', 2)

        //Перетаскивание элементов внутри конструктора
        cy.get('@second_element').trigger('dragstart', {dataTransfer})
        cy.get('@first_element').trigger('drop', {dataTransfer})

        cy.get('[data-testid=constructor_element__0]').as('new_first_element')
        cy.get('@new_first_element').contains('Биокотлета из марсианской Магнолии')
        cy.get('[data-testid=constructor_element__1]').as('new_second_element')
        cy.get('@new_second_element').contains('Соус Spicy-X')

        //Удаление элемента в конструкторе
        cy.get('@new_second_element').within(()=> {
            cy.get('[class^=constructor-element__action]').click()
        })

        cy.get('@mains_container').children().should('have.length', 1)

        cy.get('@sauce').trigger('dragstart', {dataTransfer});
        cy.get('@constructor').trigger('drop', {dataTransfer});

        cy.get('@mains_container').children().should('have.length', 2)


        //Оформление заказа
        cy.get('[class^=burger_constructor_price__]').should('have.text', '3024');
        cy.get('button').contains('Оформить заказ').as('order_button');
        cy.get('@order_button').click();

        //Авторизация
        cy.get('form').within(() => {
            cy.get('[type="email"]').clear({force: true}).type('ipermyakova8@gmail.com')
            cy.get('[type="password"]').clear({force: true}).type('qweasd')
        })
        cy.get('form').submit()
        cy.wait(2000)

        cy.contains('Соберите бургер');
        cy.get('@order_button').click();
        cy.wait(16000)

        //Открытие модального окна с данными о заказе
        cy.contains('идентификатор заказа');
        cy.contains('Ваш заказ начали готовить');
        cy.contains('Дождитесь готовности на орбитальной станции');
        cy.get('[class^=modal_modal_close__]').click(); 
        cy.get('[class^=modal_modal_body__]').should('not.exist');

        //Проверка удаления данных из контруктора
        cy.get('@bun_elements').should('not.exist')
        cy.get('@mains_container').children().should('have.length', 0)
        cy.get('@order_button').should('be.disabled')
    });
})
