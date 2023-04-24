import React, { FC } from 'react';
import styles from './burger.ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { actions } from '../../services/actions';
import { TIngredient } from '../../services/types/data';
import { useDispatch } from '../../hooks/hooks';
import { Item } from '../../pages/feed';

type TBurgerIngredientProps = {
    readonly ingredient: TIngredient;
    count: number
}

const BurgerIngredient: FC<TBurgerIngredientProps> = ({ ingredient, count }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredient",
        item: { ...ingredient },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const handleClick = () => {
        const ingredientId = ingredient._id;
        dispatch(actions.addIngredientDetails(ingredient));
        navigate(`/ingredients/${ingredientId}`, { state: { background: location } })
    }

    return (
        <div onClick={handleClick} className={styles.item}>
            {count && <Counter count={count} size="default" extraClass='m-1'></Counter>}
            < div style={{ opacity }}>
                <div className={styles.item_drag} ref={dragRef} data-testid={`burger_ingredient_${ingredient.type}`}>
                    <img src={ingredient.image} />
                    <div className={styles.items}>
                        <div className="mt-2 mb-2">
                            <p className={styles.price}>{ingredient.price}</p>
                        </div>
                        <div className="ml-2">
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                    <p className={styles.text}>{ingredient.name}</p>
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredient
