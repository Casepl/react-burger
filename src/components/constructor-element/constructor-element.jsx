import { useCallback, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeComponent } from
    '../../services/actions/burger-constructor';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element.module.css';
import {
  ConstructorElementProps
} from '../../constants/burgers-prop-type';
import PropTypes from 'prop-types';


const Element = ({ item, index, moveCard }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const preventDefault = (e) => e.preventDefault();

  drag(drop(ref));

  const handleDeleteClick = useCallback(() =>{
    dispatch(removeComponent({ dragId: item.dragId }));
  }, [dispatch, item.dragId]);

  return (
    <div
        ref={ref}
        style={{ opacity }}
        onDrop={preventDefault}
        data-handler-id={handlerId}
        className={styles.container}>
      <div className="mr-2">
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        key={item._id}
        type={item.type}
        text={item.name}
        price={item.price}
        handleClose={handleDeleteClick}
        thumbnail={item.image_mobile}
      />
    </div>
  )
}

Element.propTypes = {
  item: ConstructorElementProps,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired
}

export default Element;


