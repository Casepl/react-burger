import {SyntheticEvent, useCallback, useRef} from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeComponent } from
    '../../services/actions/burger-constructor';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element.module.css';

import type {
  ConstructorElementProps
} from '../../constants/burgers-prop-type';

import type { Identifier } from "dnd-core";

interface ElementProps {
  item: ConstructorElementProps
  index: number,
  moveCard: (dragIndex: number, hoverIndex: number) => void
}


const Element = ({ item, index, moveCard }: ElementProps ) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop<{index: number}, unknown, {handlerId: Identifier | null}>({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },

    hover(dragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      dragItem.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const preventDefault = (e: SyntheticEvent) => e.preventDefault();

  drag(drop(ref));

  const handleDeleteClick = useCallback(() =>{
    dispatch(removeComponent({ dragId: item.dragId }));
  }, [dispatch, item.dragId]);

  return (
    <div
        ref={ref}
        data-test-id={`${item.type}`}
        style={{ opacity }}
        onDrop={preventDefault}
        data-handler-id={handlerId}
        className={styles.container}>
      <div className="mr-2">
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        key={item._id}
        text={item.name}
        price={item.price}
        handleClose={handleDeleteClick}
        thumbnail={item.image_mobile}
      />
    </div>
  )
}

export default Element;


