import React, { useEffect, useState } from 'react';
import EChart, { EChartProps, type EChartAPI } from './EChart';

function generateData() {
  let data = [];
  for (let i = 0; i < 3; i++) {
    let cate = [];
    for (let j = 0; j < 100; j++) {
      cate.push(20 + Math.random() * 30);
    }
    data.push(cate);
  }
  return data;
}

const data0 = generateData();
const data1 = generateData();
const data2 = generateData();
const transformOptions = {
  transform: {
    type: 'boxplot',
    config: {
      itemNameFormatter: (params: any) => {
        return params.value + 2018;
      },
    },
  },
};

const chartOptions: EChartProps = {
  backgroundColor: '#292b2a',
  width: 300,
  height: 200,
  title: {
    text: 'Post money valuation',
    left: '15%',
  },
  dataset: [
    {
      source: data0,
    },
    {
      source: data1,
    },
    {
      source: data2,
    },
    {
      fromDatasetIndex: 0,
      ...transformOptions,
    },
    {
      fromDatasetIndex: 1,
      ...transformOptions,
    },
    {
      fromDatasetIndex: 2,
      ...transformOptions,
    },
  ],
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    nameGap: 30,
    splitArea: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    name: 'Axis title',
    interval: 10,
    min: 20,
    splitArea: {
      show: false,
    },
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
    },
  ],
  series: [
    {
      name: 'category0',
      type: 'boxplot',
      datasetIndex: 3,
      boxWidth: [5, 5],
      itemStyle: {
        color: '#267fca',
        borderColor: '#26679c',
      },
      emphasis: {
        disabled: false,
        focus: 'self',
      },
    },
    {
      name: 'category1',
      type: 'boxplot',
      datasetIndex: 4,
      boxWidth: [5, 5],
      itemStyle: {
        color: '#ad6cb8',
        borderColor: '#9962a4',
      },
      emphasis: {
        disabled: false,
        focus: 'self',
      },
    },
  ],
};

export function BoxPlotChart() {
  const chartApiRef = React.createRef<EChartAPI>();

  useEffect(() => {
    const chartApi = chartApiRef.current;
    if (!chartApi) return;
    chartApi.on('mouseover', (params) => {
      const data = params.data as [number, number, number, number, number, number];
      const option = chartApi.getOption();
      // chartApi.convertToPixel();

      option.graphic = [
        {
          type: 'group',
          left: '10%',
          top: 'center',
          children: [
            {
              type: 'rect',
              z: 100,
              left: 'center',
              top: 'middle',
              shape: {
                width: 240,
                height: 90,
              },
              style: {
                fill: '#fff',
                stroke: '#555',
                lineWidth: 1,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: 'rgba(0,0,0,0.2)',
              },
            },
            {
              type: 'text',
              z: 100,
              left: 'center',
              top: 'middle',
              style: {
                fill: '#333',
                width: 220,
                overflow: 'break',
                text: 'xAxis represents temperature in °C, yAxis represents altitude in km, An image watermark in the upper right, This text block can be placed in any place',
                font: '14px Microsoft YaHei',
              },
            },
          ],
        },
      ];
      chartApi.setOption(option);
    });

    // chartApi.on('mouseout', (params) => {
    //   const option = chartApi.getOption();
    //   option.graphic = {
    //     // elements: [] // remove the rectangle
    //   };
    //   // chartApi.setOption(option, true); // using "not merge" so that the graphic elements will be removed
    // });
  }, []);

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
      <div style={{ width: '400px', height: '400px' }}>
        <EChart ref={chartApiRef} {...chartOptions} />
      </div>
      <p></p>
      <button onClick={onSaveChartClick}>Save chart</button>
    </div>
  );
}
