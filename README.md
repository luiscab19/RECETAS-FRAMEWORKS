# Mi Libro de Recetas Personal

Una aplicación React para guardar y organizar tus recetas de cocina de forma privada.

##  Características

- **Agregar Recetas** - Guarda tus propias creaciones culinarias
- **Buscar** - Encuentra rápidamente entre tus recetas
- **Categorías** - Organiza por tipo de comida
- **100% Privado** - Solo tú ves tus recetas

## Tecnologías

- **React** 
- **CSS Modules** - Estilos componentizados
- **Local Storage** - Persistencia de datos
- **Create React App** - Tooling de desarrollo

## Instalación

```bash
# Clonar proyecto
git clone [tu-repo]
cd mi-app-recetas

# Instalar dependencias
npm install

# Ejecutar
npm start
```

## Uso

1. **Agregar receta** - Completa el formulario con ingredientes y pasos
2. **Buscar** - Usa la barra de búsqueda para filtrar
3. **Categorizar** - Organiza tus recetas por tipo
4. **Editar/Eliminar** - Modifica tus recetas cuando quieras

## Estructura Principal

```
src/
├── components/
│   ├── RecipeForm/     # Formulario agregar/editar
│   ├── RecipeList/     # Listado y búsqueda
│   └── RecipeCard/     # Tarjeta individual
├── hooks/
│   └── useLocalStorage # Persistencia de datos
└── styles/            # CSS modules
```

## Persistencia

Tus recetas se guardan automáticamente en el **localStorage** del navegador, así no se pierden al recargar.

---

**Desarrollado por Luis Carlos ALvarez**
