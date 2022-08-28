import React from 'react';
import classnames from 'classnames';
import './Footer.scss';

const Footer = () => {
  const klass = classnames('footer');
  return (
    <footer className={klass}>
      <div className="footer-wp">
        <p>Made with ♥ in Melbourne.</p>
        <p>© 2022 Broccoli & Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
