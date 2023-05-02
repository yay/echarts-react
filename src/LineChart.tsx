import React, { useEffect, useState } from 'react';
import EChart, { useChartApiRef } from './EChart';
import './BloomTheme';

export function LineChart() {
  const [points, setPoints] = useState([150, 230, 224, 218, 135, 147, 260]);
  const chartApiRef = useChartApiRef();
  const [theme, setTheme] = useState('dark');

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

  useEffect(() => {
    // Can't change theme dynamically ATM:
    // https://github.com/apache/echarts/issues/18198
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      const colorScheme = e.matches ? 'dark' : 'light';
      setTheme(colorScheme);
    });
  }, []);

  return (
    <div>
      <div style={{ width: '600px', height: '400px' }}>
        <EChart
          ref={chartApiRef}
          theme="bloom"
          // theme={theme}
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
            trigger: 'axis',
          }}
        />
      </div>
      <p></p>
      <button onClick={onClick}>Refresh</button>
      <span>&nbsp;</span>
      <button onClick={onSaveChartClick}>Save chart</button>
    </div>
  );
}
