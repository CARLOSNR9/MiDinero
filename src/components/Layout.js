import React from 'react';
import Header from './Header';

function Layout({ children, balance, isAuthenticated }) {
  return (
    <div>
      <Header balance={balance} isAuthenticated={isAuthenticated} />
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
