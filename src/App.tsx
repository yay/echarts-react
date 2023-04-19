import React, { FC, useEffect, useRef, useState } from 'react';
import EChart, { type EChartAPI } from './EChart';
import { LineChart } from './LineChart';
import { BoxPlotChart } from './BoxPlotChart';

// eCharts kitchensink: https://echarts.apache.org/examples/en/index.html

function App() {
  return (
    <div>
      <LineChart />
      <p></p>
      <BoxPlotChart />
    </div>
  );
}

export default App;
