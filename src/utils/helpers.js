export const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating ? '★' : '☆'
  ).join('');
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price);
};