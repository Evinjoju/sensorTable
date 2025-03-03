import React from "react";
import SensorTable from "./components/SensorTable";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Sensor Data Table</h2>
      <SensorTable />
    </div>
  );
};

export default App;
