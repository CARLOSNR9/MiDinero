import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import TransactionForm from './components/TransactionForm';
import { useGlobalState } from './GlobalState';

function App() {
  const { isAuthenticated, setIsAuthenticated, transactions, setTransactions, balance, setBalance } = useGlobalState();
  const [alert, setAlert] = useState('');
  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    const totalBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    setBalance(totalBalance);
  }, [transactions, setBalance]);

  useEffect(() => {
    const totalExpenses = transactions.filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    if (totalExpenses > 5000000) {
      setAlert('¡Alerta! Has excedido tu presupuesto mensual de gastos.');
    } else {
      setAlert('');
    }
  }, [transactions]);

  const handleAddTransaction = (transaction) => {
    if (currentTransaction) {
      const updatedTransactions = transactions.map(t => 
        t.id === currentTransaction.id ? { ...transaction, id: currentTransaction.id } : t
      );
      setTransactions(updatedTransactions);
      setCurrentTransaction(null);
    } else {
      setTransactions([...transactions, { ...transaction, id: Date.now() }]);
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const handleEditTransaction = (transaction) => {
    setCurrentTransaction({
      ...transaction,
      date: new Date(transaction.date).toISOString().split('T')[0]
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-CO', options);
};


  return (
    <Layout>
      {isAuthenticated ? (
        <div>
          {alert && <div className="alert">{alert}</div>}
          <h2>Registrar Transacción</h2>
          <TransactionForm
            onAddTransaction={handleAddTransaction}
            currentTransaction={currentTransaction}
          />
          <h2>Resumen</h2>
          <div>
            <h3>Transacciones del mes</h3>
            <ul>
              {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map((transaction) => (
                <li
                  key={transaction.id}
                  style={{ color: transaction.type === 'income' ? 'green' : 'red', cursor: 'pointer' }}
                  onDoubleClick={() => handleEditTransaction(transaction)}
                >
                  {transaction.type === 'income' ? 'Ingreso' : 'Gasto'} - {transaction.category}:{transaction.description} - COP ${transaction.amount.toLocaleString('es-CO')} - {formatDate(transaction.date)}
                  <span
                    style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); handleDeleteTransaction(transaction.id); }}
                  >
                    ❌
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <h2>Saldo Restante</h2>
          <div>
            <h3>COP ${balance.toLocaleString('es-CO')}</h3>
          </div>
        </div>
      ) : (
        <Login onLogin={setIsAuthenticated} />
      )}
    </Layout>
  );
}

export default App;
