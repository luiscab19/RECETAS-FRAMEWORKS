import React, { useState } from 'react';
import AnimatedBackground from '../common/AnimatedBackground';

const Login = ({ onLogin, onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const storedUsers = JSON.parse(localStorage.getItem('recipeUsers') || '[]');
        const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '{}');
        
        if (isRegister) {
            if (storedUsers.find(u => u.username === username)) {
                setError('El usuario ya existe');
                return;
            }
            if (username.length < 3) {
                setError('El usuario debe tener al menos 3 caracteres');
                return;
            }
            if (password.length < 4) {
                setError('La contraseña debe tener al menos 4 caracteres');
                return;
            }
            
            const newUser = { 
                username, 
                password,
                registrationDate: new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            
            // Inicializar recetas para el nuevo usuario
            const updatedRecipes = {
                ...storedRecipes,
                [username]: []
            };
            
            localStorage.setItem('recipeUsers', JSON.stringify([...storedUsers, newUser]));
            localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            onRegister(newUser);
        } else {
            const user = storedUsers.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                onLogin(user);
            } else {
                setError('Credenciales incorrectas');
            }
        }
    };

    return (
        <div className="login-container">
            <AnimatedBackground />
            <div className="login-form">
                <div className="login-header">
                    <div className="logo">
                        <span className="logo-icon">🍽️</span>
                        <h1>Gourmet Recipes</h1>
                    </div>
                    <p className="login-subtitle">
                        {isRegister ? 'Crear cuenta exclusiva' : 'Acceso a colección premium'}
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form-content">
                    <div className="input-group">
                        <label>Usuario</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                className="form-input"
                                placeholder="Ingresa tu usuario"
                            />
                            <span className="input-icon">👤</span>
                        </div>
                    </div>
                    
                    <div className="input-group">
                        <label>Contraseña</label>
                        <div className="input-wrapper">
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="form-input"
                                placeholder="Ingresa tu contraseña"
                            />
                            <span className="input-icon">🔒</span>
                        </div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button type="submit" className="login-btn">
                        {isRegister ? 'Crear Cuenta' : 'Acceder'}
                    </button>
                </form>
                
                <div className="login-footer">
                    <button 
                        type="button" 
                        className="switch-btn"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                        }}
                    >
                        {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Crear cuenta'}
                    </button>
                </div>
                
                <div className="demo-credentials">
                    <p><strong>Credenciales de demo:</strong></p>
                    <p>Usuario: <strong>admin</strong> / Contraseña: <strong>1234</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Login;