import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header.module.css'

const Menu = (props) => {
    return (
        <nav className={styles.menu}>
            {props.children}
        </nav>
    )
}

const MenuItem = (props) => {
    return (
        <button type='button' className={styles.button}>
            {props.children}
        </button>
    )
}

const Button = () => {
    return (
        <button type='button' className={styles.button}>
                <div className = "ml-5">
                    <ProfileIcon className = "ml-5" type="primary"/>
                </div>
                <div className="ml-2 mr-5">
                    <p className={styles.title}>Личный кабинет</p>
                </div>
        </button>
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
                            <ListIcon type="primary" />
                        </div>
                        <div className="ml-2 mr-5">
                            <p className={styles.title}>Лента заказов</p>
                        </div>
                    </MenuItem>
                </Menu>
                <Logo />
                <Button />
        </header>
    )
}

export default AppHeader;