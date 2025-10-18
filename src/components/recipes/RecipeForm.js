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

    // Límites de caracteres
    const CHARACTER_LIMITS = {
        title: 60,
        description: 160,
        ingredientName: 40,
        ingredientQuantity: 20,
        step: 200,
        comments: 300
    };

    // Contadores de caracteres
    const [characterCount, setCharacterCount] = useState({
        title: formData.title.length,
        description: formData.description.length,
        comments: formData.comments.length
    });

    // Función para truncar texto si excede el límite
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength);
    };

    // FUNCIÓN CORREGIDA - Ahora permite espacios normales
    const sanitizeText = (text, maxLength) => {
        // Solo eliminar caracteres realmente peligrosos, mantener espacios normales
        const sanitized = text
            .replace(/[<>{}]/g, '') // Solo caracteres peligrosos
            .replace(/[\\/]/g, ''); // Eliminar barras que puedan causar problemas
        
        return truncateText(sanitized, maxLength);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // PARA PERMITIR ESPACIOS: No sanitizar en tiempo real, solo validar límites
        let processedValue = value;
        
        // Solo truncar si excede el límite, pero permitir todos los caracteres normales
        switch (name) {
            case 'title':
                if (value.length > CHARACTER_LIMITS.title) {
                    processedValue = value.substring(0, CHARACTER_LIMITS.title);
                }
                break;
            case 'description':
                if (value.length > CHARACTER_LIMITS.description) {
                    processedValue = value.substring(0, CHARACTER_LIMITS.description);
                }
                break;
            case 'comments':
                if (value.length > CHARACTER_LIMITS.comments) {
                    processedValue = value.substring(0, CHARACTER_LIMITS.comments);
                }
                break;
            case 'prepTime':
                if (value.length > 20) {
                    processedValue = value.substring(0, 20);
                }
                break;
            default:
                processedValue = value;
        }

        setFormData(prev => ({ ...prev, [name]: processedValue }));
        
        // Actualizar contadores
        if (['title', 'description', 'comments'].includes(name)) {
            setCharacterCount(prev => ({
                ...prev,
                [name]: processedValue.length
            }));
        }
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...formData.ingredients];
        let processedValue = value;

        // Permitir espacios en ingredientes - solo truncar si es necesario
        if (field === 'name' && value.length > CHARACTER_LIMITS.ingredientName) {
            processedValue = value.substring(0, CHARACTER_LIMITS.ingredientName);
        } else if (field === 'quantity' && value.length > CHARACTER_LIMITS.ingredientQuantity) {
            processedValue = value.substring(0, CHARACTER_LIMITS.ingredientQuantity);
        }

        updatedIngredients[index][field] = processedValue;
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
        // Permitir espacios en pasos - solo truncar si es necesario
        const processedValue = value.length > CHARACTER_LIMITS.step 
            ? value.substring(0, CHARACTER_LIMITS.step)
            : value;
        updatedSteps[index] = processedValue;
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

    // Validación del formulario (solo al enviar)
    const validateForm = () => {
        const errors = [];

        if (!formData.title.trim()) {
            errors.push('El título es obligatorio');
        } else if (formData.title.length < 3) {
            errors.push('El título debe tener al menos 3 caracteres');
        }

        if (!formData.description.trim()) {
            errors.push('La descripción es obligatoria');
        } else if (formData.description.length < 10) {
            errors.push('La descripción debe tener al menos 10 caracteres');
        }

        const validIngredients = formData.ingredients.every(ing => 
            ing.name.trim() && ing.quantity.trim()
        );
        if (!validIngredients) {
            errors.push('Todos los ingredientes deben tener nombre y cantidad');
        }

        const validSteps = formData.steps.every(step => step.trim());
        if (!validSteps) {
            errors.push('Todos los pasos deben tener contenido');
        }

        if (!formData.prepTime.trim()) {
            errors.push('El tiempo de preparación es obligatorio');
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Sanitizar solo al enviar el formulario
        const sanitizedData = {
            ...formData,
            title: sanitizeText(formData.title, CHARACTER_LIMITS.title),
            description: sanitizeText(formData.description, CHARACTER_LIMITS.description),
            comments: sanitizeText(formData.comments, CHARACTER_LIMITS.comments),
            prepTime: formData.prepTime.replace(/[<>{}]/g, '').substring(0, 20),
            ingredients: formData.ingredients.map(ing => ({
                name: sanitizeText(ing.name, CHARACTER_LIMITS.ingredientName),
                quantity: sanitizeText(ing.quantity, CHARACTER_LIMITS.ingredientQuantity)
            })),
            steps: formData.steps.map(step => sanitizeText(step, CHARACTER_LIMITS.step))
        };
        
        const errors = validateForm();
        
        if (errors.length > 0) {
            alert(`Errores de validación:\n${errors.join('\n')}`);
            return;
        }
        
        // Filtrar ingredientes y pasos vacíos
        const filteredIngredients = sanitizedData.ingredients.filter(ing => 
            ing.name.trim() && ing.quantity.trim()
        );
        
        const filteredSteps = sanitizedData.steps.filter(step => step.trim());
        
        onSave({
            ...sanitizedData,
            ingredients: filteredIngredients,
            steps: filteredSteps
        });
    };

    const CharacterCounter = ({ current, max, isError = false }) => (
        <div className={`character-counter ${isError ? 'error' : ''}`}>
            {current}/{max}
        </div>
    );

    return (
        <Modal onClose={onCancel} className="recipe-form-modal">
            <div className="modal-header">
                <h2>{recipe ? 'Editar Receta' : 'Nueva Receta Gourmet'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
                <div className="form-grid">
                    <div className="input-group">
                        <div className="input-header">
                            <label>Título de la Receta *</label>
                            <CharacterCounter 
                                current={characterCount.title} 
                                max={CHARACTER_LIMITS.title}
                                isError={characterCount.title >= CHARACTER_LIMITS.title}
                            />
                        </div>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                            className="form-input"
                            placeholder="Ej: Tarta de Chocolate"
                            maxLength={CHARACTER_LIMITS.title}
                        />
                        {characterCount.title >= CHARACTER_LIMITS.title && (
                            <div className="warning-message">
                                ⚠️ Límite de caracteres alcanzado
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="input-header">
                            <label>Descripción *</label>
                            <CharacterCounter 
                                current={characterCount.description} 
                                max={CHARACTER_LIMITS.description}
                                isError={characterCount.description >= CHARACTER_LIMITS.description}
                            />
                        </div>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                            className="form-textarea"
                            placeholder="Describe brevemente tu receta..."
                            rows="3"
                            maxLength={CHARACTER_LIMITS.description}
                        />
                        {characterCount.description >= CHARACTER_LIMITS.description && (
                            <div className="warning-message">
                                ⚠️ Límite de caracteres alcanzado
                            </div>
                        )}
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
                                maxLength={20}
                            />
                        </div>
                    </div>

                    <div className="ingredients-section">
                        <label>Ingredientes *</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-row">
                                <div className="ingredient-input-group">
                                    <input
                                        type="text"
                                        placeholder="Ingrediente"
                                        value={ingredient.name}
                                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                        className="form-input"
                                        maxLength={CHARACTER_LIMITS.ingredientName}
                                    />
                                    <div className="ingredient-counter">
                                        {ingredient.name.length}/{CHARACTER_LIMITS.ingredientName}
                                    </div>
                                </div>
                                <div className="ingredient-input-group">
                                    <input
                                        type="text"
                                        placeholder="Cantidad"
                                        value={ingredient.quantity}
                                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                        className="form-input"
                                        maxLength={CHARACTER_LIMITS.ingredientQuantity}
                                    />
                                    <div className="ingredient-counter">
                                        {ingredient.quantity.length}/{CHARACTER_LIMITS.ingredientQuantity}
                                    </div>
                                </div>
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
                                <div className="step-input-group">
                                    <textarea
                                        placeholder={`Describe el paso ${index + 1}`}
                                        value={step}
                                        onChange={(e) => handleStepChange(index, e.target.value)}
                                        className="form-textarea step-textarea"
                                        rows="2"
                                        maxLength={CHARACTER_LIMITS.step}
                                    />
                                    <div className="step-counter">
                                        {step.length}/{CHARACTER_LIMITS.step}
                                    </div>
                                </div>
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
                        <div className="input-header">
                            <label>Comentarios Adicionales (opcional)</label>
                            <CharacterCounter 
                                current={characterCount.comments} 
                                max={CHARACTER_LIMITS.comments}
                                isError={characterCount.comments >= CHARACTER_LIMITS.comments}
                            />
                        </div>
                        <textarea 
                            name="comments" 
                            value={formData.comments} 
                            onChange={handleChange} 
                            className="form-textarea"
                            placeholder="Notas, variaciones, sugerencias de acompañamiento..."
                            rows="2"
                            maxLength={CHARACTER_LIMITS.comments}
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