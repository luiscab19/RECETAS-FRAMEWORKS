import React from 'react';
import { getCategoryImage, getCategoryBackground } from '../../../utils/recipeHelpers';

const RecipeCard2 = ({ recipe, onSelect, onEdit, onDelete }) => {
    return (
        <div className="recipe-card version2">
            <div 
                className="card-image-horizontal"
                style={{ background: getCategoryBackground(recipe.category) }}
            >
                <div className="image-content">
                    <div className="category-emoji-large">
                        {getCategoryImage(recipe.category)}
                    </div>
                    <div className="image-overlay-horizontal">
                        <div className="quick-info">
                            <span className="time-badge">{recipe.prepTime}</span>
                            <span className={`difficulty-badge ${recipe.difficulty.toLowerCase()}`}>
                                {recipe.difficulty}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="card-content-horizontal">
                <div className="card-header-horizontal">
                    <div className="title-section">
                        <h3 className="card-title-main">{recipe.title}</h3>
                        <span 
                            className="category-pill"
                            style={{ background: getCategoryBackground(recipe.category) }}
                        >
                            {recipe.category}
                        </span>
                    </div>
                    <div className="action-icons">
                        <button onClick={() => onEdit(recipe)} className="icon-btn edit" title="Editar">
                            Editar
                        </button>
                        <button onClick={() => onDelete(recipe.id)} className="icon-btn delete" title="Eliminar">
                            Eliminar
                        </button>
                    </div>
                </div>
                
                <p className="card-description-expanded">{recipe.description}</p>
                
                <div className="recipe-features">
                    <div className="feature">
                        <span className="feature-text">Tiempo: {recipe.prepTime}</span>
                    </div>
                    <div className="feature">
                        <span className="feature-text">Dificultad: {recipe.difficulty}</span>
                    </div>
                    <div className="feature">
                        <span className="feature-text">{recipe.category}</span>
                    </div>
                </div>
                
                <button onClick={() => onSelect(recipe)} className="view-recipe-btn">
                    Ver Receta Completa
                </button>
            </div>
        </div>
    );
};

export default RecipeCard2;