import React from 'react';
import RecipeCard1 from './RecipeCard/RecipeCard1';
import RecipeCard2 from './RecipeCard/RecipeCard2';
import RecipeCard3 from './RecipeCard/RecipeCard3';
import RecipeCard4 from './RecipeCard/RecipeCard4';

const RecipeGrid = ({ 
    recipes, 
    cardVersion, 
    onSelectRecipe, 
    onEditRecipe, 
    onDeleteRecipe,
    onNewRecipe 
}) => {
    const renderRecipeCard = (recipe) => {
        const props = {
            recipe,
            onSelect: onSelectRecipe,
            onEdit: onEditRecipe,
            onDelete: onDeleteRecipe
        };

        switch (cardVersion) {
            case 1: return <RecipeCard1 key={recipe.id} {...props} />;
            case 2: return <RecipeCard2 key={recipe.id} {...props} />;
            case 3: return <RecipeCard3 key={recipe.id} {...props} />;
            case 4: return <RecipeCard4 key={recipe.id} {...props} />;
            default: return <RecipeCard1 key={recipe.id} {...props} />;
        }
    };

    if (recipes.length === 0) {
        return (
            <div className="no-recipes">
                <div className="no-recipes-content">
                    <div className="empty-state-icon">🍳</div>
                    <h3>No hay recetas aún</h3>
                    <p>Comienza creando tu primera receta gourmet</p>
                    <button onClick={onNewRecipe} className="btn-primary large">
                        <span>+</span>
                        Crear Primera Receta
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`recipes-grid view-${cardVersion}`}>
            {recipes.map(renderRecipeCard)}
        </div>
    );
};

export default RecipeGrid;