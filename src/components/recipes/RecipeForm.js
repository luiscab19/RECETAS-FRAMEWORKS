import React, { useState } from 'react';
import Modal from '../common/Modal';

const RecipeForm = ({ recipe, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: recipe?.id || Date.now().toString(),
        title: recipe?.title || '',
        description: recipe?.description || '',
        category: recipe?.category || 'Plato Fuerte',
        ingredients: recipe?.ingredients || [{ name: '', quantity: '' }],
        steps: recipe?.steps || [''],
        comments: recipe?.comments || '',
        prepTime: recipe?.prepTime || '',
        difficulty: recipe?.difficulty || 'Fácil'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index][field] = value;
        setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    };

    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: '', quantity: '' }]
        }));
    };

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            const updatedIngredients = [...formData.ingredients];
            updatedIngredients.splice(index, 1);
            setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
        }
    };

    const handleStepChange = (index, value) => {
        const updatedSteps = [...formData.steps];
        updatedSteps[index] = value;
        setFormData(prev => ({ ...prev, steps: updatedSteps }));
    };

    const addStep = () => {
        setFormData(prev => ({
            ...prev,
            steps: [...prev.steps, '']
        }));
    };

    const removeStep = (index) => {
        if (formData.steps.length > 1) {
            const updatedSteps = [...formData.steps];
            updatedSteps.splice(index, 1);
            setFormData(prev => ({ ...prev, steps: updatedSteps }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar que todos los ingredientes tengan nombre y cantidad
        const validIngredients = formData.ingredients.every(ing => 
            ing.name.trim() && ing.quantity.trim()
        );
        
        // Validar que todos los pasos tengan contenido
        const validSteps = formData.steps.every(step => step.trim());
        
        if (!validIngredients) {
            alert('Todos los ingredientes deben tener nombre y cantidad');
            return;
        }
        
        if (!validSteps) {
            alert('Todos los pasos deben tener contenido');
            return;
        }
        
        // Filtrar ingredientes vacíos
        const filteredIngredients = formData.ingredients.filter(ing => 
            ing.name.trim() && ing.quantity.trim()
        );
        
        // Filtrar pasos vacíos
        const filteredSteps = formData.steps.filter(step => step.trim());
        
        onSave({
            ...formData,
            ingredients: filteredIngredients,
            steps: filteredSteps
        });
    };

    return (
        <Modal onClose={onCancel} className="recipe-form-modal">
            <div className="modal-header">
                <h2>{recipe ? 'Editar Receta' : 'Nueva Receta Gourmet'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
                <div className="form-grid">
                    <div className="input-group">
                        <label>Título de la Receta *</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                            className="form-input"
                            placeholder="Ej: Tarta de Chocolate"
                        />
                    </div>

                    <div className="input-group">
                        <label>Descripción *</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                            className="form-textarea"
                            placeholder="Describe brevemente tu receta..."
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Categoría *</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="form-select">
                                <option value="Postre">🎂 Postre</option>
                                <option value="Plato Fuerte">🍛 Plato Fuerte</option>
                                <option value="Entrada">🥗 Entrada</option>
                                <option value="Merienda">☕ Merienda</option>
                            </select>
                        </div>
                        
                        <div className="input-group">
                            <label>Dificultad *</label>
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="form-select">
                                <option value="Fácil">⭐ Fácil</option>
                                <option value="Media">⭐⭐ Media</option>
                                <option value="Difícil">⭐⭐⭐ Difícil</option>
                            </select>
                        </div>
                        
                        <div className="input-group">
                            <label>Tiempo de Preparación *</label>
                            <input 
                                type="text" 
                                name="prepTime" 
                                value={formData.prepTime} 
                                onChange={handleChange} 
                                placeholder="Ej: 30 min, 1 hora"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="ingredients-section">
                        <label>Ingredientes *</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-row">
                                <input
                                    type="text"
                                    placeholder="Ingrediente"
                                    value={ingredient.name}
                                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                    className="form-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Cantidad"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                    className="form-input"
                                />
                                <button type="button" onClick={() => removeIngredient(index)} className="remove-btn">
                                    <span>−</span>
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient} className="add-btn">
                            <span>+</span> Agregar Ingrediente
                        </button>
                    </div>

                    <div className="steps-section">
                        <label>Pasos de Preparación *</label>
                        {formData.steps.map((step, index) => (
                            <div key={index} className="step-row">
                                <span className="step-number">{index + 1}.</span>
                                <textarea
                                    placeholder={`Describe el paso ${index + 1}`}
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                    className="form-textarea step-textarea"
                                    rows="2"
                                />
                                <button type="button" onClick={() => removeStep(index)} className="remove-btn">
                                    <span>−</span>
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addStep} className="add-btn">
                            <span>+</span> Agregar Paso
                        </button>
                    </div>

                    <div className="input-group">
                        <label>Comentarios Adicionales (opcional)</label>
                        <textarea 
                            name="comments" 
                            value={formData.comments} 
                            onChange={handleChange} 
                            className="form-textarea"
                            placeholder="Notas, variaciones, sugerencias de acompañamiento..."
                            rows="2"
                        />
                    </div>
                </div>
            </form>

            <div className="modal-footer">
                <button type="submit" onClick={handleSubmit} className="btn-primary">
                    <span>💾</span>
                    {recipe ? 'Actualizar Receta' : 'Guardar Receta'}
                </button>
                <button type="button" onClick={onCancel} className="btn-secondary">
                    Cancelar
                </button>
            </div>
        </Modal>
    );
};

export default RecipeForm;