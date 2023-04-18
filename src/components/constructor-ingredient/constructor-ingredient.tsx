import React, { useRef, FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { actions } from '../../services/actions';
import { useDrop, useDrag } from "react-dnd";
import { TIngredient } from '../../services/types/data';
import { SyntheticEvent } from 'react';
import styles from './constructor.ingredient.module.css';
import { useDispatch } from '../../hooks/hooks';

type TElement = 'top' | 'bottom'

type TRenderName = {
    [key in TElement]: string
}

const renderName: TRenderName = {
    top: "(верх)",
    bottom: "(низ)",
}

type TConstructorIngredientProps = {
    item: TIngredient,
    index?: number,
    elementType?: TElement,
    moveItem?: (dragIndex: number, hoverIndex: number) => void
}

type TDropObjectProps = {
    index: number;
}

const ConstructorIngredient: FC<TConstructorIngredientProps> = ({ item, index, elementType, moveItem }) => {

    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const handleDelete = () => {
        if (item.dragId) {
            dispatch(actions.removeIngredientConstructor(item.dragId))
        }
    }

    const [{ isDrag }, drag] = useDrag({
        type: 'sort',
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [_, drop] = useDrop<TDropObjectProps>({
        accept: 'sort',
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() }
        },
        drop(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index || 0;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoudingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoudingRect.bottom - hoverBoudingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }
            const hoverClientY = clientOffset.y - hoverBoudingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            if(moveItem) {
                moveItem(dragIndex, hoverIndex);
            }
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
        <section className="mb-4">
            <div ref={dragDropRef} style={{ opacity }} onDrop={onDropHandler}>
                <div className={`${styles.items} mb-4`} >
                    {item.type !== 'bun' ? <div className="mr-2">
                        <DragIcon type="primary" /></div> : <div className="mr-8" />}
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
        </section>)

}

export default ConstructorIngredient
