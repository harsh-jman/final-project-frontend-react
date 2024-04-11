import React from "react";
import TemperatureRecommendationForm from "../components/ml.component";

const App = () => {
  const handleRecommendation = (result) => {
    // Handle the recommendation result here
    console.log("Recommendation Result:", result);
  };

  return (
    <div
      style={{
        paddingTop: "90px",
        width: "95%",
        margin: "auto",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <TemperatureRecommendationForm onRecommend={handleRecommendation} />
    </div>
  );
};

export default App;
