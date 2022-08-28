import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { routerJump } from '@/components/Router';
import './Header.scss';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-wp">
        <Link className="header-logo" to={routerJump.Home()}>
          Broccoli & Co.
        </Link>
      </div>
    </header>
  );
};

export default Header;
