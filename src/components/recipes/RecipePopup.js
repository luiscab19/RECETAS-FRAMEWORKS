import React from 'react';
import Modal from '../common/Modal';
import { getCategoryImage, getCategoryBackground } from '../../utils/recipeHelpers';

const RecipePopup = ({ recipe, onClose }) => {
    if (!recipe) return null;

    return (
        <Modal onClose={onClose} className="recipe-popup-modal">
            <div className="popup-header">
                <h2>{recipe.title}</h2>
                <div className="popup-meta">
                    <span className="meta-tag category">{recipe.category}</span>
                    <span className="meta-tag time">Tiempo: {recipe.prepTime}</span>
                    <span className="meta-tag difficulty">Dificultad: {recipe.difficulty}</span>
                </div>
            </div>
            
            <div className="popup-body">
                <div 
                    className="popup-image"
                    style={{ background: getCategoryBackground(recipe.category) }}
                >
                    <div className="popup-emoji">
                        {getCategoryImage(recipe.category)}
                    </div>
                </div>
                
                <div className="popup-details">
                    <div className="detail-section">
                        <h3 className="section-title">Descripción</h3>
                        <p className="section-content">{recipe.description}</p>
                    </div>
                    
                    <div className="detail-section">
                        <h3 className="section-title">Ingredientes</h3>
                        <ul className="ingredients-list">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="ingredient-item">
                                    <span className="ingredient-name">{ingredient.name}</span>
                                    <span className="ingredient-quantity">{ingredient.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="detail-section">
                        <h3 className="section-title">Preparación</h3>
                        <ol className="steps-list">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="step-item">
                                    <span className="step-number">{index + 1}.</span>
                                    <span className="step-text">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    
                    {recipe.comments && (
                        <div className="detail-section">
                            <h3 className="section-title">Notas del Chef</h3>
                            <p className="section-content notes">{recipe.comments}</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default RecipePopup;