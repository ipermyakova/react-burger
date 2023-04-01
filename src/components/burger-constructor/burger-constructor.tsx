import React, { useContext, useEffect, useState, useMemo, useReducer, useRef, useCallback, FC } from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import { TotalPriceContext} from  '../../services/appContext';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../services/actions';
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { useLocation, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { useAuth } from '../../services/auth'
import { TIngredient, TTotalPriceState, TAction, TRequestOrder } from '../../services/types/data';
import { RootState } from '../../services/reducers'
import { AppDispatch } from '../../services';
import { SyntheticEvent } from 'react';
import styles from './burger.constructor.module.css';
import { getCookie } from '../../utils/cookie-utils';

type TElement = 'top' | 'bottom'

type TRenderName = {
    [key in TElement] : string
}

const renderName: TRenderName = {
    top: "(верх)",
    bottom: "(низ)",
}

const TotalPrice = () => {
    const { totalPriceState } = useContext(TotalPriceContext); 

    return (
        <div className={styles.total_price}>
            <p className={styles.price}>{totalPriceState.totalPrice}
            </p>
            <div className="ml-2">
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    )
}

type TIngredientProps = {
    item: TIngredient,
    index: number,
    elementType?: TElement,
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

type TDropObjectProps= {
    index: number;
}

const Ingredient: FC<TIngredientProps>  = ({ item, index, elementType, moveItem }) => {

    const dispatch = useDispatch();
    
    const ref = useRef<HTMLDivElement>(null);

    const handleDelete = () => {
        if(item.dragId) {
            dispatch(actions.removeIngredientConstructor(item.dragId))
            dispatch(actions.updateCountIngredients(item._id, "", -1, item.type))
        }
    }

    const [{isDrag}, drag] = useDrag({
        type: 'sort',
        item: {index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }) 
    });

    const [_, drop] = useDrop<TDropObjectProps>({
        accept: 'sort',
        collect(monitor){
            return { handlerId: monitor.getHandlerId()}
        },
        drop(item, monitor) {
            if(!ref.current){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex) {
                return;
            }
            const hoverBoudingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoudingRect.bottom - hoverBoudingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if(!clientOffset) {
                return;
            }
            const hoverClientY = clientOffset.y - hoverBoudingRect.top;

            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
               return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;       
        }

    })

    const dragDropRef = ((item.type !== 'bun') ? drag(drop(ref)) : ref) as React.RefObject<HTMLDivElement>;
    const opacity = isDrag ? 0 : 1;

    const onDropHandler = (e: SyntheticEvent) => {
        e.preventDefault();
    }

    const text = elementType ? `${item.name} ${renderName[elementType]}` : `${item.name}`

    return (
        <div className="mb-4">
            <div ref={dragDropRef} style={{ opacity }} onDrop={onDropHandler}>
             <div className={styles.items} >
                {item.type !== 'bun' ? <div className="mr-2">
                    <DragIcon type="primary" /></div> : <div className="mr-8"/>}
                <ConstructorElement
                    type={elementType}
                    price={item.price}
                    text={text}
                    thumbnail={item.image_mobile}
                    isLocked={elementType === "top" || elementType === "bottom" ? true : false}
                    handleClose={handleDelete}
                />
              </div>
            </div>
        </div>)
}

const totalPriceInitialState = { totalPrice:  0 };

function reducer(state: TTotalPriceState, action: TAction) {
    switch(action.type) {
        case "set":
            return { totalPrice: action.payload};
        case "reset":
            return totalPriceInitialState;
        default: 
            throw new Error(`Wrong type of action: ${action.type}`);        
    }

}

type TBurgerConstructorProps = {
    onDropHandler: (item: TIngredient, itemBunId: string) => void
}

const BurgerConstructor: FC<TBurgerConstructorProps> = ({ onDropHandler }) => {

    const auth = useAuth();

    const { orderData, ingredientsConstructor, isLoading, hasError } = useSelector((store: RootState) => ({
        orderData: store?.order?.orderData,
        isLoading: store?.order?.isLoading,
        hasError: store?.order?.hasError,
        ingredientsConstructor: store?.ingredientsConstructor || []
    }))

    const dispatch: AppDispatch = useDispatch();

    const [itemBunId, setItemBunId] = useState<string>('');

    const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const orderNumber = orderData?.number
        if(!isLoading && !hasError && orderNumber) {
            dispatch(actions.removeIngredientsConstructor());
            navigate(`profile/orders/${orderNumber}`, {state: { background: location }})
        }

    }, [orderData])


    const [ collectedProps , dropTarget] = useDrop<TIngredient>({
        accept: 'ingredient',
        collect: (monitor: DropTargetMonitor<TIngredient, unknown>) => ({
            isHover: monitor.isOver
        }),
        drop(item: TIngredient) {
            onDropHandler(item, itemBunId);
        }
    })

    const onSortHandler = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragItem = ingredientsConstructor[dragIndex];
        const newList = [...ingredientsConstructor];
        newList.splice(dragIndex, 1);
        newList.splice(hoverIndex, 0, dragItem);
        dispatch(actions.updateIngredientConstructor(newList));
    }, [ingredientsConstructor])

    const handleButtonClick = () => {
        if(!getCookie('accessToken') && !auth.user) {
            navigate(`/login`);
        }
        if(ingredientsConstructor) {
            const request = getIngredientsRequest();
            dispatch(actions.sendOrderAction(request));
        }
    };

    const getIngredientsRequest = (): TRequestOrder => {
        const ingredientsId = ingredientsConstructor.filter(item => item.type !== 'bun').map(item => item._id);
        const allIngredientsId = [itemBunId, ...ingredientsId, itemBunId];
        return { ingredients: allIngredientsId };
    }


    const itemFirstBunId = useMemo(()=> ingredientsConstructor?.find((item) => item.type === "bun")?._id, [ingredientsConstructor]) || '';

    const totalPrice = useMemo(() => {
            return  ingredientsConstructor.reduce((acc, item) => { 
                    const itemPrice = (item._id === itemBunId) ? (2 * item.price) : item.price;
                    return acc + itemPrice
                }, 0)
    }, [ingredientsConstructor, itemBunId])

    useEffect(() => {
        setItemBunId(itemFirstBunId);

    }, [itemFirstBunId])

    useEffect(() => {
        totalPriceDispatcher({ type: "set", payload: totalPrice });

    }, [totalPrice])

    return (
        <div className="ml-10">
            <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
            <div className={styles.burger_container}>
                <div className='pl-4 pr-4 pt-25 pb-10'>
                    <section ref={dropTarget} className={`${(collectedProps as {isHover: boolean}).isHover ? styles.on_hover : ''}`}>
                    <div className={styles.items_container}  >
                        {itemBunId && ingredientsConstructor.filter(item => item._id === itemBunId).map((item, index) => 
                            <Ingredient key={item.dragId} item={item} index={index} elementType="top"  moveItem={onSortHandler}/> 
                        )}
                        <div className={styles.items_constructor}> 
                            { ingredientsConstructor.map((item, index) => item._id !== itemBunId 
                                && <Ingredient key={item.dragId} item={item} index={index} moveItem={onSortHandler}/>)}
                        </div>
                        {itemBunId && ingredientsConstructor.filter(item => item._id === itemBunId).map((item, index) => 
                            <Ingredient key={item.dragId} item={item} index={index} elementType="bottom" moveItem={onSortHandler}/> 
                        )}
                    </div>
                    </section>
                </div>
                <div className="pl-4 pr-4">
                    <div className={styles.total_price_container}>
                        {isLoading && <div className="mr-10"><ThreeDots height="80" width="80" radius="9" color = '#8585AD' visible={true}/></div>}
                        <TotalPrice />
                        <div className="ml-10">
                            <Button htmlType="button" disabled={itemBunId === '' || isLoading} type="primary" size="large" onClick={handleButtonClick}>Оформить заказ</Button>
                        </div>
                    </div>    
                </div>
            </div>
            </TotalPriceContext.Provider>
        </div>
    )
}

export default BurgerConstructor;
