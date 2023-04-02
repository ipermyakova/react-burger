import React, { useRef, FC, RefObject, ReactNode } from 'react';
import styles from './burger.ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { mapToColums, filter} from '../../utils/utils';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../services/actions';
import { TIngredient } from '../../services/types/data';

type TType = 'bun' | 'sauce' | 'main';
type TRenderName = {
    [key in TType]: string; 
}

const renderName: TRenderName = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки"
}

const types: TType[] = ['bun', 'sauce', 'main'];

type TItemProps = {
    readonly item: TIngredient;
}

const Item: FC<TItemProps> = ({ item }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredient",
        item: {...item},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        }) 
    });

    const handleClick = () => {
        const ingredientId = item._id;
        dispatch(actions.addIngredientDetails(item));
        navigate(`/ingredients/${ingredientId}`, {state: { background: location }} )
    }

    return (
        <div onClick={handleClick} className={styles.item}>
            {item.count && <Counter count={item.count} size="default" extraClass='m-1'></Counter>}
            < div style={{ opacity }}>
                <div className={styles.item_drag} ref={dragRef}>
                    <img src={item.image} />
                    <div className={styles.items}>
                        <div className="mt-2 mb-2">
                            <p className={styles.price}>{item.price}</p>
                        </div>
                        <div className="ml-2">
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                    <p className={styles.text}>{item.name}</p>
                </div>
            </div>
        </div>
    )
}

type ItemsProps = {
    children?: ReactNode;
}

const Items: FC<ItemsProps> = ({ children }) => {
    return (
        <div className={styles.items}>
            {children}
        </div>
    )
}

type TBurgerIngredientsProps = {
    readonly ingredients: ReadonlyArray<TIngredient>  
}

const BurgerIngredients: FC<TBurgerIngredientsProps> = ({ ingredients }) => {

    const [current, setCurrent] = React.useState<string>('bun');

    const nameBunRef = useRef<HTMLDivElement>(null);
    const nameSauceRef = useRef<HTMLDivElement>(null);
    const nameMainRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
    
        const topBun = nameBunRef.current ? Math.abs(nameBunRef.current?.getBoundingClientRect().top) : 0;
        const topSauce = nameSauceRef.current ? Math.abs(nameSauceRef.current?.getBoundingClientRect().top) : 0;
        const topMain = nameMainRef.current ? Math.abs(nameMainRef.current?.getBoundingClientRect().top) : 0;

        if(topBun < topSauce && topBun < topMain) {
            setCurrent('bun');
        } else if(topSauce < topBun && topSauce < topMain) {
            setCurrent('sauce');
        } else {
            setCurrent('main')
        }    
    };

    const getNameRef = (name: string): RefObject<HTMLDivElement> => name === 'bun' ? nameBunRef : name === 'sauce' ? nameSauceRef : nameMainRef;

    const handleClick = (value: string) => {
        setCurrent(value);
        getNameRef(value).current?.scrollIntoView();
    };
    
    return (
        <div className={styles.container}>
            <div className="mt-10 mb-5">
                <h2 className={styles.main_title}>Соберите бургер</h2>
            </div>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={handleClick}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClick}>Начинки</Tab>
            </div>
            <div className={styles.types_container} onScroll={handleScroll}>
            {types.map((name, index) => <div key={index} ref={getNameRef(name)}>
                <div className="mt-10 mb-6">
                    <h2 className={styles.tab_title}>{renderName[name]}</h2>
                </div>
                <div className={styles.items_container}>
                        { mapToColums(filter(ingredients, name)).map((items, index) => {
                            return (
                            <Items key={index}>
                             { items.first && <div className="ml-4 mb-8">
                                <Item key={items.first._id} item={items.first}></Item></div>}
                             { items.second && <div className="ml-6 mb-8">
                                <Item key={items.second._id} item={items.second}></Item></div>}
                            </Items>)
                        })}
                </div>
            </div>)}
            </div>
        </div>
    )
}

export default BurgerIngredients;