import React, { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({ category, amount: parseFloat(amount.replace(/\./g, '')), date });
    setCategory('');
    setAmount('');
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setAmount(formattedValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Categoría:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
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
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <button type="submit">Agregar Gasto</button>
    </form>
  );
}

export default ExpenseForm;
