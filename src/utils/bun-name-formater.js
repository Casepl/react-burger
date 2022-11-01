const bunNameFormatter = (name, direction) => {
  if (!name) {
    return '';
  }

  return name + (direction === 'top' ? ' (вeрх)' : ' (низ)');
};

export default bunNameFormatter;
