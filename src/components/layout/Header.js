import React from 'react';

const Header = ({ user, isAdmin, onShowAdmin, onNewRecipe, onLogout }) => {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-brand">
                    <div className="brand-logo">
                        <span className="logo-icon">🍽️</span>
                        <div className="brand-text">
                            <h1>Gourmet Recipes</h1>
                            <p className="user-greeting">
                                Hola, {user.username} {isAdmin && '👑'}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="header-actions">
                    {isAdmin && (
                        <button onClick={onShowAdmin} className="btn-admin">
                            <span>👥</span>
                            Panel Admin
                        </button>
                    )}
                    <button onClick={onNewRecipe} className="btn-primary">
                        <span>+</span>
                        Nueva Receta
                    </button>
                    <button onClick={onLogout} className="btn-secondary">
                        <span>🚪</span>
                        Salir
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;