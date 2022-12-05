export const formatPrice = prices => {
    return prices.toLocaleString('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    });
};