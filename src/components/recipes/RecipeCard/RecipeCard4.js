import React from 'react';
import { getCategoryImage, getCategoryBackground } from '../../../utils/recipeHelpers';

const RecipeCard4 = ({ recipe, onSelect, onEdit, onDelete }) => {
    return (
        <div className="recipe-card version4">
            <div 
                className="card-image premium"
                style={{ background: getCategoryBackground(recipe.category) }}
            >
                <div className="category-emoji x-large">
                    {getCategoryImage(recipe.category)}
                </div>
                <div className="image-overlay">
                    <h3 className="card-title overlay">{recipe.title}</h3>
                    <span className="category overlay">{recipe.category}</span>
                </div>
            </div>
            <div className="card-content">
                <p className="card-description">{recipe.description}</p>
                <div className="recipe-stats">
                    <div className="stat">
                        <span className="stat-text">Tiempo: {recipe.prepTime}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-text">Dificultad: {recipe.difficulty}</span>
                    </div>
                </div>
                <div className="card-actions premium">
                    <button onClick={() => onSelect(recipe)} className="btn-full">
                        Ver Receta Completa
                    </button>
                    <div className="quick-actions">
                        <button onClick={() => onEdit(recipe)} title="Editar" className="quick-btn">
                            Editar
                        </button>
                        <button onClick={() => onDelete(recipe.id)} title="Eliminar" className="quick-btn">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard4;