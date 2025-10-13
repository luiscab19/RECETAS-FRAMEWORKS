import React, { useState, useEffect } from 'react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import Controls from './components/layout/Controls';
import RecipeGrid from './components/recipes/RecipeGrid';
import RecipeForm from './components/recipes/RecipeForm';
import RecipePopup from './components/recipes/RecipePopup';
import AdminPanel from './components/admin/AdminPanel';
import AnimatedBackground from './components/common/AnimatedBackground';

const RecipeApp = () => {
  const [user, setUser] = useState(null);
  const [allRecipes, setAllRecipes] = useLocalStorage('recipes', {});
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cardVersion, setCardVersion] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useLocalStorage('recipeUsers', []);

  const isAdmin = user && user.username === 'admin';

  // Obtener recetas del usuario actual
  const userRecipes = user ? allRecipes[user.username] || [] : [];

  // Cargar usuario actual al iniciar
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    // Inicializar array de recetas para el nuevo usuario
    setAllRecipes(prev => ({
      ...prev,
      [userData.username]: []
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const handleSaveRecipe = (recipeData) => {
    if (!user) return;

    const recipeWithUser = {
      ...recipeData,
      userId: user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingRecipe) {
      setAllRecipes(prev => ({
        ...prev,
        [user.username]: prev[user.username].map(r => 
          r.id === recipeData.id ? recipeWithUser : r
        )
      }));
    } else {
      setAllRecipes(prev => ({
        ...prev,
        [user.username]: [...(prev[user.username] || []), recipeWithUser]
      }));
    }
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      setAllRecipes(prev => ({
        ...prev,
        [user.username]: prev[user.username].filter(r => r.id !== id)
      }));
    }
  };

  const filteredRecipes = userRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todas' || recipe.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Para el admin, mostrar estadísticas de todas las recetas
  const getAllRecipesCount = () => {
    return Object.values(allRecipes).flat().length;
  };

  const getAllUsersRecipes = () => {
    return Object.entries(allRecipes).map(([username, recipes]) => ({
      username,
      recipeCount: recipes.length
    }));
  };

  if (!user) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="app">
      <AnimatedBackground />
      
      <Header 
        user={user}
        isAdmin={isAdmin}
        onShowAdmin={() => setShowAdminPanel(true)}
        onNewRecipe={() => setShowForm(true)}
        onLogout={handleLogout}
      />

      <Controls 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        cardVersion={cardVersion}
        onCardVersionChange={setCardVersion}
      />

      <main className="recipes-container">
        <div className="user-recipes-info">
          <h2>Mis Recetas ({filteredRecipes.length})</h2>
          <p className="user-greeting-subtitle">
            Hola {user.username}, estas son tus recetas personales
          </p>
        </div>
        <RecipeGrid 
          recipes={filteredRecipes}
          cardVersion={cardVersion}
          onSelectRecipe={setSelectedRecipe}
          onEditRecipe={handleEditRecipe}
          onDeleteRecipe={handleDeleteRecipe}
          onNewRecipe={() => setShowForm(true)}
        />
      </main>

      {showForm && (
        <RecipeForm
          recipe={editingRecipe}
          onSave={handleSaveRecipe}
          onCancel={() => {
            setShowForm(false);
            setEditingRecipe(null);
          }}
        />
      )}

      {selectedRecipe && (
        <RecipePopup
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {showAdminPanel && isAdmin && (
        <AdminPanel 
          users={registeredUsers} 
          allRecipes={allRecipes}
          onClose={() => setShowAdminPanel(false)}
          currentUser={user}
        />
      )}
    </div>
  );
};

export default RecipeApp;