import React, { FC, ReactNode } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';
import { NavLink, useMatch, useLocation } from 'react-router-dom';

type TMenuProps = {
    children?: ReactNode;
}

const Menu: FC<TMenuProps> = ({ children }) => {
    return (
        <nav className={styles.menu}>
            {children}
        </nav>
    )
}

type TMenuItemProps = {
    children?: ReactNode;
}

const MenuItem: FC<TMenuItemProps> = ({ children }) => {
    return (
        <NavLink to="/" className={styles.link}>
            {children}
        </NavLink>
    )
}

const Profile = () => {
    const {state, pathname } = useLocation();
    const match = useMatch('/profile/*'); 

    return (
        <NavLink to="/profile" state={{ from: { pathname: pathname }}} className={styles.link}>
                <div className = "ml-5">
                    <ProfileIcon type={ match ? "primary" : "secondary" }/>
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
                            <BurgerIcon type={ matchHome ? "primary" : "secondary"}/>
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
                <NavLink to="/">
                    <Logo />
                </NavLink>
                <Profile />
        </header>
    )
}

export default AppHeader;