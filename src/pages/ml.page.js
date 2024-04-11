import React from 'react';
import TemperatureRecommendationForm from '../components/ml.component';

const App = () => {
  const handleRecommendation = (result) => {
    // Handle the recommendation result here
    console.log('Recommendation Result:', result);
  };

  return (
    <div>
      <TemperatureRecommendationForm onRecommend={handleRecommendation} />
    </div>
  );
};

export default App;
