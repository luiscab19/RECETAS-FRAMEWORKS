import React from 'react';
import Modal from '../common/Modal';

const AdminPanel = ({ users, allRecipes, onClose, currentUser }) => {
    // Contar recetas de manera robusta
    const countTotalRecipes = () => {
        if (!allRecipes || typeof allRecipes !== 'object') return 0;
        
        let total = 0;
        for (const username in allRecipes) {
            if (Object.prototype.hasOwnProperty.call(allRecipes, username)) {
                const userRecipes = allRecipes[username];
                if (Array.isArray(userRecipes)) {
                    total += userRecipes.length;
                }
            }
        }
        return total;
    };

    const totalRecipes = countTotalRecipes();
    
    // Preparar datos de usuarios con estadísticas
    const usersWithStats = users.map(user => {
        const recipeCount = Array.isArray(allRecipes[user.username]) 
            ? allRecipes[user.username].length 
            : 0;
            
        // Truncar nombres de usuario largos
        const displayUsername = user.username.length > 15 
            ? user.username.substring(0, 15) + '...' 
            : user.username;
            
        // Formatear fecha de registro
        const registrationDate = user.registrationDate && user.registrationDate.length > 20
            ? user.registrationDate.substring(0, 20) + '...'
            : user.registrationDate || 'Fecha no disponible';

        return {
            ...user,
            recipeCount,
            displayUsername,
            registrationDate
        };
    });

    // Calcular estadísticas
    const activeUsers = usersWithStats.filter(user => user.recipeCount > 0).length;
    const averageRecipes = activeUsers > 0 ? (totalRecipes / activeUsers).toFixed(1) : '0.0';

    return (
        <Modal onClose={onClose} className="admin-modal">
            <div className="modal-header">
                <div className="modal-title">
                    <h2>👑 Panel de Administración</h2>
                    <p>Gestión de usuarios y recetas del sistema</p>
                </div>
            </div>
            
            <div className="modal-body">
                <div className="admin-stats">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <h3>Total Usuarios</h3>
                            <span className="stat-number">{users.length}</span>
                            <small className="stat-subtitle">
                                {activeUsers} activos
                            </small>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🍽️</div>
                        <div className="stat-info">
                            <h3>Total Recetas</h3>
                            <span className="stat-number">{totalRecipes}</span>
                            <small className="stat-subtitle">
                                En todo el sistema
                            </small>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-info">
                            <h3>Recetas/Usuario</h3>
                            <span className="stat-number">{averageRecipes}</span>
                            <small className="stat-subtitle">
                                Promedio activos
                            </small>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👑</div>
                        <div className="stat-info">
                            <h3>Administrador</h3>
                            <span className="stat-user">
                                {currentUser.username.length > 12 
                                    ? currentUser.username.substring(0, 12) + '...' 
                                    : currentUser.username
                                }
                            </span>
                            <small className="stat-subtitle">
                                Sesión activa
                            </small>
                        </div>
                    </div>
                </div>
                
                <div className="users-section">
                    <div className="section-header">
                        <div className="section-title">
                            <h3>Usuarios Registrados</h3>
                            <div className="section-subtitle">
                                <span className="user-count">{users.length} usuarios</span>
                                <span className="active-count">{activeUsers} con recetas</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="users-list">
                        {usersWithStats.length === 0 ? (
                            <div className="no-users-message">
                                <div className="empty-icon">👤</div>
                                <p>No hay usuarios registrados</p>
                            </div>
                        ) : (
                            usersWithStats.map((user, index) => (
                                <div key={index} className={`user-card ${user.username === currentUser.username ? 'current-user' : ''}`}>
                                    <div className="user-avatar">
                                        {user.username === 'admin' ? '👑' : '👤'}
                                    </div>
                                    <div className="user-info">
                                        <h4 className="username">
                                            {user.displayUsername}
                                            {user.username === currentUser.username && <span className="you-badge">Tú</span>}
                                            {user.username === 'admin' && <span className="admin-badge">Admin</span>}
                                        </h4>
                                        <p className="user-date" title={user.registrationDate}>
                                            {user.registrationDate}
                                        </p>
                                        <div className="user-stats">
                                            <span className={`recipe-count ${user.recipeCount === 0 ? 'zero-recipes' : ''}`}>
                                                {user.recipeCount} receta{user.recipeCount !== 1 ? 's' : ''}
                                            </span>
                                            <div className={`user-status ${user.username === currentUser.username ? 'online' : 'offline'}`}>
                                                <span className="status-dot"></span>
                                                {user.username === currentUser.username ? 'Conectado' : 'Desconectado'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
            <div className="modal-footer">
                <button onClick={onClose} className="btn-primary">
                    Cerrar Panel
                </button>
            </div>

            <style jsx>{`
                .stat-subtitle {
                    display: block;
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    margin-top: 0.2rem;
                    font-weight: 500;
                }

                .section-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    width: 100%;
                }

                .section-subtitle {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.2rem;
                }

                .active-count {
                    font-size: 0.75rem;
                    color: var(--accent-green);
                    font-weight: 500;
                }

                .no-users-message {
                    text-align: center;
                    padding: 2rem;
                    color: var(--text-muted);
                }

                .empty-icon {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    opacity: 0.5;
                }

                .zero-recipes {
                    color: var(--text-muted);
                    opacity: 0.7;
                }

                .user-date {
                    max-width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                @media (max-width: 768px) {
                    .section-title {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .section-subtitle {
                        align-items: flex-start;
                    }

                    .stat-card .stat-info h3 {
                        font-size: 0.8rem;
                    }

                    .stat-number {
                        font-size: 1.1rem;
                    }

                    .user-info {
                        min-width: 0;
                    }

                    .username {
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 480px) {
                    .admin-stats {
                        grid-template-columns: 1fr;
                    }

                    .user-card {
                        padding: 0.75rem;
                    }

                    .user-avatar {
                        width: 32px;
                        height: 32px;
                        font-size: 1rem;
                    }
                }
            `}</style>
        </Modal>
    );
};

export default AdminPanel;