import React from 'react';
import Modal from '../common/Modal';

const AdminPanel = ({ users, allRecipes, onClose, currentUser }) => {
    const totalRecipes = Object.values(allRecipes).flat().length;
    const usersWithStats = users.map(user => ({
        ...user,
        recipeCount: allRecipes[user.username]?.length || 0
    }));
    
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
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🍽️</div>
                        <div className="stat-info">
                            <h3>Total Recetas</h3>
                            <span className="stat-number">{totalRecipes}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👑</div>
                        <div className="stat-info">
                            <h3>Administrador</h3>
                            <span className="stat-user">{currentUser.username}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-info">
                            <h3>Recetas/Usuario</h3>
                            <span className="stat-number">
                                {users.length > 0 ? (totalRecipes / users.length).toFixed(1) : 0}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="users-section">
                    <div className="section-header">
                        <h3>Usuarios Registrados</h3>
                        <span className="user-count">{users.length} usuarios</span>
                    </div>
                    
                    <div className="users-list">
                        {usersWithStats.map((user, index) => (
                            <div key={index} className={`user-card ${user.username === currentUser.username ? 'current-user' : ''}`}>
                                <div className="user-avatar">
                                    {user.username === 'admin' ? '👑' : '👤'}
                                </div>
                                <div className="user-info">
                                    <h4 className="username">
                                        {user.username}
                                        {user.username === currentUser.username && <span className="you-badge">Tú</span>}
                                        {user.username === 'admin' && <span className="admin-badge">Admin</span>}
                                    </h4>
                                    <p className="user-date">Registrado: {user.registrationDate || 'Fecha no disponible'}</p>
                                    <div className="user-stats">
                                        <span className="recipe-count">
                                            {user.recipeCount} receta{user.recipeCount !== 1 ? 's' : ''}
                                        </span>
                                        <div className={`user-status ${user.username === currentUser.username ? 'online' : 'offline'}`}>
                                            <span className="status-dot"></span>
                                            {user.username === currentUser.username ? 'Conectado' : 'Desconectado'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="modal-footer">
                <button onClick={onClose} className="btn-primary">
                    Cerrar Panel
                </button>
            </div>
        </Modal>
    );
};

export default AdminPanel;