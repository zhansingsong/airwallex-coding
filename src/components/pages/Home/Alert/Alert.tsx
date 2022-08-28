import React, { FC, ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import './Alert.scss';
interface IAlertType {
  title?: string;
  children?: ReactNode;
  onChange?: (visibility: boolean) => void;
  visibility?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const Alert: FC<IAlertType> = ({ title = 'All done', children, visibility = false, onChange = () => {} }) => {
  const [alertVisibility, setAlertVisibility] = useState<boolean>(false);
  const klass = classnames('alert', { 'alert-show': alertVisibility });
  useEffect(() => {
    setAlertVisibility(visibility);
  }, [visibility]);
  const clickCallback = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setAlertVisibility((v) => {
      onChange(!v);
      return !v;
    });
  };
  const clickCloseCallback = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onChange(false);
    setAlertVisibility(false);
  };

  return (
    <div className={klass} role="alert" data-visibility={visibility}>
      <div className="alert-mask"></div>
      <div className="alert-wp">
        <a href="#" className="alert-close" onClick={clickCloseCallback}>
          <i className="iconfont icon-close"></i>
        </a>
        <div className="alert-hd">
          <h3 className="tt">{title}</h3>
        </div>
        <div className="alert-bd">
          {children || (
            <div className="alert-box">
              <p className="alert-box-r1">You will be one of the first to experience</p>
              <p className="alert-box-r2">Broccoli & Co. When we launch.</p>
              <a href="#" className="alert-box-btn" onClick={clickCallback} role="ok-button">
                Ok
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
