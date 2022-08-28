import React from 'react';
import Router from '@/components/Router';
import Ctx from '@/components/Context';
import './App.scss';

function App() {
  return (
    <div className="app" id="app" data-testid="app">
      <Ctx>
        <Router />
      </Ctx>
    </div>
  );
}

export default App;
