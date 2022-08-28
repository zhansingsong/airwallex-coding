import React, { FC, ReactNode, useRef } from 'react';
// import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import Header from '@/components/commons/Header/Header';
import Footer from '@/components/commons/Footer/Footer';
import './Layout.scss';

interface ILayout {
  className?: string;
  children?: ReactNode;
}
// 用于页面间管理，如何页面间的过渡切换
const Layout: FC<ILayout> = ({ className, children }) => {
  const nodeRef = useRef(null);
  const klass = classnames('layout', className);
  return (
    // <CSSTransition in timeout={300} appear classNames="page" unmountOnExit nodeRef={nodeRef}>
    <div className={klass} ref={nodeRef}>
      <div className="layout-hd">
        <Header />
      </div>
      <div className="layout-bd">{children}</div>
      <div className="layout-ft">
        <Footer></Footer>
      </div>
    </div>
    // </CSSTransition>
  );
};

export default Layout;
