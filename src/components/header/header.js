import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header.module.css'

const Menu = (props) => {
    return (
        <nav className={styles.menu}>
            {props.children}
        </nav>
    )
}
Menu.propTypes = {
    children: PropTypes.array.isRequired
}

const MenuItem = (props) => {
    return (
        <a href="#" className={styles.link}>
            {props.children}
        </a>
    )
}

MenuItem.propTypes = {
    children: PropTypes.array.isRequired
}

const Button = () => {
    return (
        <a href="#" className={styles.link}>
                <div className = "ml-5">
                    <ProfileIcon className = "ml-5" type="primary"/>
                </div>
                <div className="ml-2 mr-5">
                    <p className={styles.title}>Личный кабинет</p>
                </div>
        </a>
    )
}


const AppHeader = () => {
    return (
        <header className={styles.header}>
                <Menu>
                    <MenuItem>
                        <div className = "ml-5">
                            <BurgerIcon className = "ml-5" type="primary"/>
                        </div>
                        <div className="ml-2 mr-5">
                            <p className={styles.title}>Конструктор</p>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div className = "ml-5">
                            <ListIcon type="secondary" />
                        </div>
                        <div className="ml-2 mr-5">
                            <p className={styles.title_secondary}>Лента заказов</p>
                        </div>
                    </MenuItem>
                </Menu>
                <Logo />
                <Button />
        </header>
    )
}

export default AppHeader;