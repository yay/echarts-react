import React, { useState } from 'react';
import EChart, { type EChartAPI } from './EChart';

export function LineChart() {
  const [points, setPoints] = useState([150, 230, 224, 218, 135, 147, 260]);
  const chartApiRef = React.createRef<EChartAPI>();

  const onClick = () => {
    const points: number[] = [];
    for (let i = 0; i < 7; i++) {
      points.push(100 + Math.random() * 200);
    }
    setPoints(points);
  };

  const onSaveChartClick = () => {
    if (chartApiRef.current) {
      const dataUrl = chartApiRef.current.getDataURL();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'chart.png';
      a.click();
    }
  };

  return (
    <div>
      <div style={{ width: '600px', height: '400px' }}>
        <EChart
          ref={chartApiRef}
          xAxis={{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          }}
          yAxis={{
            type: 'value',
          }}
          series={[
            {
              data: points,
              type: 'line',
            },
          ]}
          tooltip={{
            trigger: 'axis'
          }}
        />
      </div>
      <p></p>
      <button onClick={onClick}>Refresh</button>
      <button onClick={onSaveChartClick}>Save chart</button>
    </div>
  );
}
