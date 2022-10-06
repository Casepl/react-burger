import PropTypes from "prop-types";

const ingredients = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string,
    "image_mobile": PropTypes.string,
});

const props = PropTypes.arrayOf(ingredients);


export default props;
