import React from 'react';
import { getCategoryImage, getCategoryBackground } from '../../../utils/recipeHelpers';

const RecipeCard3 = ({ recipe, onSelect, onEdit, onDelete }) => {
    return (
        <div className="recipe-card version3">
            <div 
                className="card-image"
                style={{ background: getCategoryBackground(recipe.category) }}
            >
                <div className="category-emoji">
                    {getCategoryImage(recipe.category)}
                </div>
                <div className="image-overlay"></div>
            </div>
            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{recipe.title}</h3>
                    <span 
                        className="category"
                        style={{ background: getCategoryBackground(recipe.category) }}
                    >
                        {recipe.category}
                    </span>
                </div>
                <p className="card-description">{recipe.description}</p>
                <div className="recipe-meta detailed">
                    <div className="meta-item-detailed">
                        <span className="label">Tiempo:</span>
                        <span className="value">{recipe.prepTime}</span>
                    </div>
                    <div className="meta-item-detailed">
                        <span className="label">Dificultad:</span>
                        <span className="value">{recipe.difficulty}</span>
                    </div>
                </div>
                <div className="card-actions compact">
                    <button onClick={() => onSelect(recipe)} className="action-btn compact primary">
                        Ver Receta
                    </button>
                    <button onClick={() => onEdit(recipe)} className="action-btn compact secondary">
                        Editar
                    </button>
                    <button onClick={() => onDelete(recipe.id)} className="action-btn compact danger">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard3;