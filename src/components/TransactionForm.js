import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../GlobalState';

function TransactionForm({ onAddTransaction, currentTransaction }) {
  const { categories } = useGlobalState();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (currentTransaction) {
      setCategory(currentTransaction.category);
      setDescription(currentTransaction.description);
      setType(currentTransaction.type);
      setAmount(currentTransaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setDate(new Date(currentTransaction.date).toISOString().split('T')[0]);
    }
  }, [currentTransaction]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.toUpperCase());
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
        category,
        description,
        type,
        amount: parseFloat(amount.replace(/\./g, '')),
        date: date // Usar la fecha tal cual está en el input
    };
    onAddTransaction(transaction);
    setCategory('');
    setDescription('');
    setType('income');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Categoría:
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Seleccionar Categoría</option>
          {categories.sort().map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <label>
        Descripción:
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </label>
      <label>
        Tipo:
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </label>
      <label>
        Cantidad (COP $):
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          required
        />
      </label>
      <label>
        Fecha:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">{currentTransaction ? 'Actualizar Transacción' : 'Agregar Transacción'}</button>
    </form>
  );
}

export default TransactionForm;
