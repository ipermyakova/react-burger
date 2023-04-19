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
    path: string;
}

const MenuItem: FC<TMenuItemProps> = ({ children, path }) => {
    return (
        <NavLink to={path} className={styles.link}>
            {children}
        </NavLink>
    )
}

const Profile = () => {
    const { state, pathname } = useLocation();
    const isProfile = useMatch('/profile/*');

    return (
        <NavLink to="/profile" state={{ from: { pathname: pathname } }} className={styles.link}>
            <div className="ml-5">
                <ProfileIcon type={isProfile ? "primary" : "secondary"} />
            </div>
            <div className="ml-2 mr-5">
                <p className={isProfile ? styles.title : styles.title_secondary}>Личный кабинет</p>
            </div>
        </NavLink>
    )
}

const AppHeader = () => {
    const { state, pathname } = useLocation();
    const isConstructor = useMatch('/');
    const isFeed = useMatch('/feed/*');

    return (
        <header className={styles.header}>
            <Menu>
                <MenuItem path="/">
                    <div className="ml-5">
                        <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                    </div>
                    <div className="ml-2 mr-5">
                        <p className={isConstructor ? styles.title : styles.title_secondary}>Конструктор</p>
                    </div>
                </MenuItem>
                <MenuItem path="/feed">
                    <div className="ml-5">
                        <ListIcon type={isFeed ? "primary" : "secondary"} />
                    </div>
                    <div className="ml-2 mr-5">
                        <p className={isFeed ? styles.title : styles.title_secondary}>Лента заказов</p>
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