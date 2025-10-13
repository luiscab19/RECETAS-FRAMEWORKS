export const getCategoryImage = (category) => {
    const images = {
        'Postre': '🎂',
        'Plato Fuerte': '🍛',
        'Entrada': '🥗',
        'Merienda': '☕'
    };
    return images[category] || '🍽️';
};

export const getCategoryBackground = (category) => {
    const backgrounds = {
        'Postre': 'linear-gradient(135deg, #D4AF37, #FFD700)',
        'Plato Fuerte': 'linear-gradient(135deg, #8B5CF6, #EC4899)',
        'Entrada': 'linear-gradient(135deg, #10B981, #3B82F6)',
        'Merienda': 'linear-gradient(135deg, #F59E0B, #EF4444)'
    };
    return backgrounds[category] || 'linear-gradient(135deg, #6B7280, #9CA3AF)';
};

export const categories = ['Todas', 'Postre', 'Plato Fuerte', 'Entrada', 'Merienda'];