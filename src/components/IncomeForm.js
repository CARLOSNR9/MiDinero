import React, { useState, useEffect } from 'react';

function IncomeForm({ onAddIncome }) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [savedSources, setSavedSources] = useState(() => {
    const saved = localStorage.getItem('incomeSources');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('incomeSources', JSON.stringify(savedSources));
  }, [savedSources]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!savedSources.includes(source)) {
      setSavedSources([...savedSources, source]);
    }
    onAddIncome({ source, amount: parseFloat(amount.replace(/\./g, '')), date });
    setSource('');
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
        Fuente:
        <input
          list="sources"
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <datalist id="sources">
          {savedSources.map((src, index) => (
            <option key={index} value={src} />
          ))}
        </datalist>
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
      <button type="submit">Agregar Ingreso</button>
    </form>
  );
}

export default IncomeForm;
