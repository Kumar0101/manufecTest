import React from 'react';
import FlavanoidsStatistics from './meanMedMode';
import GammaStatistics from './gamaStats';
const App: React.FC = () => {

  return (
<>
    <FlavanoidsStatistics />
    <GammaStatistics/>
</>
  );
};

export default App;
