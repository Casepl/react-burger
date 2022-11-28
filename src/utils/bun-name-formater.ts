const bunNameFormatter = (name: string, direction?: string) => {
  if (!name) {
    return '';
  }

  return name + (direction === 'top' ? ' (вeрх)' : ' (низ)');
};

export default bunNameFormatter;
