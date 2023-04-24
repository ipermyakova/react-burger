describe('service is available', function() {
    before(function() {
        cy.visit('http://localhost:3000/react-burger');
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
        cy.get('[data-testid=constructor_element__0]').as('constructor_sauce')
        cy.get('@constructor_sauce').contains('Соус Spicy-X')

        cy.get('[data-testid=constructor_element__1]').as('constructor_main')
        cy.get('@constructor_main').contains('Биокотлета из марсианской Магнолии')

        cy.get('[data-testid=constructor_element__]').first().as('constructor_bun_1')
        cy.get('@constructor_bun_1').contains('Краторная булка N-200i')
        cy.get('[data-testid=constructor_element__]').last().as('constructor_bun_2')
        cy.get('@constructor_bun_2').contains('Краторная булка N-200i')

        //Перетаскивание элементов внутри конструктора
        cy.get('@constructor_main').trigger('dragstart', {dataTransfer});
        cy.get('@constructor_sauce').trigger('drop', {dataTransfer});

        cy.get('[data-testid=constructor_element__0]').contains('Биокотлета из марсианской Магнолии')

        cy.get('[data-testid=constructor_element__1]').contains('Соус Spicy-X')

        //Удаление элемента в конструкторе
        cy.get('[data-testid=constructor_element__0]').within(()=> {
            cy.get('[class^=constructor-element__action]').click()
        })

        cy.get('[data-testid=constructor_element__0]').contains('Соус Spicy-X')
        cy.get('[data-testid=constructor_element__1]').should('not.exist')
        cy.get('@main').trigger('dragstart', {dataTransfer});
        cy.get('@constructor').trigger('drop', {dataTransfer});


        //Оформление заказа
        cy.get('[class^=burger_constructor_price__]').should('have.text', '3024');
        cy.get('button').contains('Оформить заказ').click();

        //Авторизация
        cy.get('form').within(() => {
            cy.get('[type="email"]').clear({force: true}).type('ipermyakova8@gmail.com')
            cy.get('[type="password"]').clear({force: true}).type('qweasd')
        })
        cy.get('form').submit()
        cy.wait(2000)

        cy.contains('Соберите бургер');
        cy.get('button').contains('Оформить заказ').click();
        cy.wait(16000)

        //Открытие модального окна с данными о заказе
        cy.contains('идентификатор заказа');
        cy.contains('Ваш заказ начали готовить');
        cy.contains('Дождитесь готовности на орбитальной станции');
        cy.get('[class^=modal_modal_close__]').click(); 
        cy.get('[class^=modal_modal_body__]').should('not.exist');

        //Проверка удаления данных из контруктора
        cy.get('[data-testid=constructor_element__]').should('not.exist')
        cy.get('[data-testid=constructor_element__0]').should('not.exist')
        cy.get('[data-testid=constructor_element__1]').should('not.exist')
        cy.get('button').contains('Оформить заказ').should('be.disabled')
    });
})
