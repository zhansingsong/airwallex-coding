import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { routerJump } from '@/components/Router';
import './Error.scss';

interface IBookListProps {
  errorTt?: string;
  errorImg?: string;
  errorTxt?: string;
}
const Error: FC<IBookListProps> = ({ errorTt = 404, errorImg, errorTxt }) => {
  return (
    <section className="error">
      {errorImg && <img src={errorImg} className="error-img" alt="error img" />}
      {errorTt && <div className="error-tt">{errorTt}</div>}
      {errorTxt && <p className="error-des">{errorTxt}</p>}
      <Link className="error-button" to={routerJump.Home()}>
        返回首页
      </Link>
    </section>
  );
};

export default Error;
