import React from 'react';
import { getCategoryImage, getCategoryBackground } from '../../../utils/recipeHelpers';

const RecipeCard2 = ({ recipe, onSelect, onEdit, onDelete }) => {
    // Función para determinar los puntos de dificultad activos
    const getDifficultyDots = (difficulty) => {
        const dots = [false, false, false];
        switch(difficulty.toLowerCase()) {
            case 'fácil': dots[0] = true; break;
            case 'media': dots[0] = dots[1] = true; break;
            case 'difícil': dots.fill(true); break;
            default: dots[0] = true;
        }
        return dots;
    };

    const difficultyDots = getDifficultyDots(recipe.difficulty);

    return (
        <div className="recipe-card version2">
            <div className="card-content-minimal">
                <div className="card-header-minimal">
                    <div className="title-section-minimal">
                        <h3 className="card-title-minimal">{recipe.title}</h3>
                        <span 
                            className="category-badge-minimal"
                            style={{ background: getCategoryBackground(recipe.category) }}
                        >
                            {recipe.category}
                        </span>
                    </div>
                    <div 
                        className="category-icon-minimal"
                        style={{ background: getCategoryBackground(recipe.category) }}
                    >
                        {getCategoryImage(recipe.category)}
                    </div>
                </div>
                
                <p className="card-description-minimal">{recipe.description}</p>
                
                <div className="stats-grid-minimal">
                    <div className="stat-item-minimal">
                        <span className="stat-value-minimal">{recipe.prepTime}</span>
                        <span className="stat-label-minimal">Tiempo</span>
                    </div>
                    <div className="stat-item-minimal">
                        <span className="stat-value-minimal">{recipe.ingredients.length}</span>
                        <span className="stat-label-minimal">Ingredientes</span>
                    </div>
                    <div className="stat-item-minimal">
                        <span className="stat-value-minimal">{recipe.steps.length}</span>
                        <span className="stat-label-minimal">Pasos</span>
                    </div>
                </div>
                
                <div className="difficulty-indicator-minimal">
                    <div className="difficulty-dots-minimal">
                        {difficultyDots.map((active, index) => (
                            <div 
                                key={index} 
                                className={`difficulty-dot-minimal ${active ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                    <span className="difficulty-text-minimal">{recipe.difficulty}</span>
                </div>
                
                <div className="floating-actions-minimal">
                    <button onClick={() => onSelect(recipe)} className="action-btn-minimal btn-primary-minimal">
                        Ver Receta
                    </button>
                    <button onClick={() => onEdit(recipe)} className="action-btn-minimal btn-secondary-minimal">
                        Editar
                    </button>
                    <button onClick={() => onDelete(recipe.id)} className="action-btn-minimal btn-danger-minimal">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard2;