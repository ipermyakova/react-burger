import React, { useRef, FC, RefObject, ReactNode, useMemo } from 'react';
import styles from './burger.ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/data';
import IngredientsCategory from '../../components/ingredients-category/ingredients-category'

type TType = 'bun' | 'sauce' | 'main';

type TBurgerIngredientsProps = {
    readonly ingredients: ReadonlyArray<TIngredient>
}

const BurgerIngredients: FC<TBurgerIngredientsProps> = ({ ingredients }) => {

    const [current, setCurrent] = React.useState<string>('bun');

    const nameBunRef = useRef<HTMLHeadingElement>(null);
    const nameSauceRef = useRef<HTMLHeadingElement>(null);
    const nameMainRef = useRef<HTMLHeadingElement>(null);

    const handleScroll = () => {

        const topBun = nameBunRef.current ? Math.abs(nameBunRef.current?.getBoundingClientRect().top) : 0;
        const topSauce = nameSauceRef.current ? Math.abs(nameSauceRef.current?.getBoundingClientRect().top) : 0;
        const topMain = nameMainRef.current ? Math.abs(nameMainRef.current?.getBoundingClientRect().top) : 0;

        if (topBun < topSauce && topBun < topMain) {
            setCurrent('bun');
        } else if (topSauce < topBun && topSauce < topMain) {
            setCurrent('sauce');
        } else {
            setCurrent('main')
        }
    };

    const getNameRef = (name: string): RefObject<HTMLHeadingElement> => name === 'bun' ? nameBunRef : name === 'sauce' ? nameSauceRef : nameMainRef;

    const handleClick = (value: string) => {
        setCurrent(value);
        getNameRef(value).current?.scrollIntoView();
    };

    const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients])
    const mains = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients])
    const sauces = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients])

    return (
        <section className={styles.container}>
            <div className="mt-10 mb-5">
                <h2 className={styles.main_title}>Соберите бургер</h2>
            </div>
            <nav>
                <div style={{ display: 'flex' }}>
                    <Tab value="bun" active={current === 'bun'} onClick={handleClick}>Булки</Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>Соусы</Tab>
                    <Tab value="main" active={current === 'main'} onClick={handleClick}>Начинки</Tab>
                </div>
            </nav>
            <div className={styles.types_container} onScroll={handleScroll}>
                <IngredientsCategory title="Булки" ingredients={buns} refElement={nameBunRef} />
                <IngredientsCategory title="Соусы" ingredients={sauces} refElement={nameSauceRef} />
                <IngredientsCategory title="Начинки" ingredients={mains} refElement={nameMainRef} />
            </div>
        </section>
    )
}

export default BurgerIngredients;