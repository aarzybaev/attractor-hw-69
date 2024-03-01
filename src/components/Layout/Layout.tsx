import React from 'react';
import Navbar from '../Navbar/Navbar';
import SerialForm from '../../containers/Serial/SerialForm';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="container-fluid">
        <SerialForm/>
        {children}
      </main>
    </>
  );
};

export default Layout;