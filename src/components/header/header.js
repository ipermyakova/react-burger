import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header.module.css'
import { NavLink, useMatch, useLocation } from 'react-router-dom';

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
        <NavLink to="/" className={styles.link}>
            {props.children}
        </NavLink>
    )
}

MenuItem.propTypes = {
    children: PropTypes.array.isRequired
}

const Profile = () => {
    const {state, pathname } = useLocation();
    const match = useMatch('/profile/*'); 

    return (
        <NavLink to="/profile" state={{ from: { pathname: pathname }}} className={styles.link}>
                <div className = "ml-5">
                    <ProfileIcon className = "ml-5" type={ match ? "primary" : "secondary" }/>
                </div>
                <div className="ml-2 mr-5">
                    <p className={ match ? styles.title : styles.title_secondary }>Личный кабинет</p>
                </div>
        </NavLink>
    )
}


const AppHeader = () => {
    const {state, pathname } = useLocation();
    const matchHome = useMatch('/'); 

    return (
        <header className={styles.header}>
                <Menu>
                    <MenuItem>
                        <div className = "ml-5">
                            <BurgerIcon className = "ml-5" type={ matchHome ? "primary" : "secondary"}/>
                        </div>
                        <div className="ml-2 mr-5">
                            <p className={ matchHome ? styles.title : styles.title_secondary }>Конструктор</p>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div className = "ml-5">
                            <ListIcon type="secondary" />
                        </div>
                        <div className="ml-2 mr-5">
                            <p className={ styles.title_secondary }>Лента заказов</p>
                        </div>
                    </MenuItem>
                </Menu>
                <Logo />
                <Profile />
        </header>
    )
}

export default AppHeader;