import React, { Suspense } from 'react';
import List from './list.jsx';

const App = () => {
  return <Suspense fallback={<div>hi</div>}><List /></Suspense>
};


export default App;