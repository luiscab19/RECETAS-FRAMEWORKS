import React from 'react';
import { categories } from '../../utils/recipeHelpers';

const Controls = ({ 
    searchTerm, 
    onSearchChange, 
    categoryFilter, 
    onCategoryChange, 
    cardVersion, 
    onCardVersionChange 
}) => {
    return (
        <div className="controls">
            <div className="controls-content">
                <div className="search-section">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="🔍 Buscar recetas..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    
                    <div className="filter-container">
                        <select 
                            value={categoryFilter} 
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="filter-select"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="view-controls">
                    <span className="view-label">Vista:</span>
                    <div className="view-buttons">
                        {[1, 2, 3, 4].map(version => (
                            <button
                                key={version}
                                className={`view-btn ${cardVersion === version ? 'active' : ''}`}
                                onClick={() => onCardVersionChange(version)}
                            >
                                Vista {version}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;