import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useGlobalState } from '../GlobalState';

function Categorias() {
  const { isAuthenticated, balance, categories, setCategories } = useGlobalState();
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categories.includes(category.toUpperCase())) {
      setCategories([...categories, category.toUpperCase()]);
    }
    setCategory('');
  };

  return (
    <Layout>
      <h2>Registrar Categoría</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Categoría:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value.toUpperCase())}
            required
          />
        </label>
        <button type="submit">Agregar Categoría</button>
      </form>
      <h2>Categorías Registradas</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </Layout>
  );
}

export default Categorias;








