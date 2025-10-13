import React from 'react';
import { getCategoryImage, getCategoryBackground } from '../../../utils/recipeHelpers';

const RecipeCard1 = ({ recipe, onSelect, onEdit, onDelete }) => {
    return (
        <div className="recipe-card version1">
            <div 
                className="card-image"
                style={{ 
                    background: getCategoryBackground(recipe.category),
                    position: 'relative'
                }}
            >
                <div className="category-emoji">
                    {getCategoryImage(recipe.category)}
                </div>
                <div className="card-category">
                    {recipe.category}
                </div>
                <div className="image-overlay"></div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{recipe.title}</h3>
                <p className="card-description">{recipe.description}</p>
                <div className="recipe-meta">
                    <span className="meta-item">
                        Tiempo: {recipe.prepTime}
                    </span>
                    <span className={`meta-item difficulty-${recipe.difficulty.toLowerCase()}`}>
                        Dificultad: {recipe.difficulty}
                    </span>
                </div>
                <div className="card-actions">
                    <button onClick={() => onSelect(recipe)} className="action-btn view-btn">
                        Ver
                    </button>
                    <button onClick={() => onEdit(recipe)} className="action-btn edit-btn">
                        Editar
                    </button>
                    <button onClick={() => onDelete(recipe.id)} className="action-btn delete-btn">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard1;