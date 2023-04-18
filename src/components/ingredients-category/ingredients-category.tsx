import React, { FC, ReactNode, useMemo } from 'react';
import styles from './ingredients.category.module.css';
import { mapToColums } from '../../utils/utils';
import { TIngredient } from '../../services/types/data';
import Ingredient from '../burger-ingredient/burger-ingredient';
import { useSelector } from '../../hooks/hooks';

type TIngredientsProps = {
    children?: ReactNode;
}

const Ingredients: FC<TIngredientsProps> = ({ children }) => {
    return (
        <div className={styles.items}>
            {children}
        </div>
    )
}

type TIngredientsCategoryProps = {
    readonly title: string,
    refElement: React.RefObject<HTMLHeadingElement> | undefined,
    readonly ingredients: ReadonlyArray<TIngredient>

}
const IngredientsCategory: FC<TIngredientsCategoryProps> = ({ title, refElement, ingredients }) => {

    const { ingredientsConstructor } = useSelector(store => ({
        ingredientsConstructor: store?.ingredientsConstructor,
    }))

    const ingredientsWithCount = useMemo(() => {
        const { bun, ingredients } = ingredientsConstructor
        const counter = ingredients.reduce((acc: any, item) => {
            const count = acc[item._id] || 0
            acc[item._id] = count + 1
            return acc
        }, {})
        if (bun) counter[bun._id] = 2

        return counter;
    }, [ingredientsConstructor])

    return (
        <>
            <div className="mt-10 mb-6">
                <h2 className={styles.tab_title} ref={refElement}>{title}</h2>
            </div>
            <div className={styles.items_container}>
                {mapToColums(ingredients).map((items, index) => {
                    return (
                        <Ingredients key={index}>
                            {items.first && <div className="ml-4 mb-8">
                                <Ingredient key={items.first._id} ingredient={items.first} count={ingredientsWithCount[items.first._id]} />
                            </div>}
                            {items.second && <div className="ml-6 mb-8">
                                <Ingredient key={items.second._id} ingredient={items.second} count={ingredientsWithCount[items.second._id]} />
                            </div>}
                        </Ingredients>)
                })}
            </div>
        </>
    )
}

export default IngredientsCategory