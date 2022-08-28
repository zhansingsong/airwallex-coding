import React from 'react';
import Layout from '@/components/Layout/Layout';
import Invite from './Invite/Invite';
import './Home.scss';

const Home = () => {
  return (
    <Layout>
      <div className="home" data-testid="home">
        <Invite></Invite>
      </div>
    </Layout>
  );
};

export default Home;
