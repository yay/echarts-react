import React, { FC, useEffect, useRef, useState } from 'react';
import { LineChart } from './LineChart';
import { BoxPlotChart } from './BoxPlotChart';
import { NumberLineChart } from './NumberLineChart';

// eCharts kitchensink: https://echarts.apache.org/examples/en/index.html

function App() {
  return (
    <div>
      <LineChart />
      <p></p>
      <NumberLineChart />
      <p></p>
      <BoxPlotChart />
    </div>
  );
}

export default App;
