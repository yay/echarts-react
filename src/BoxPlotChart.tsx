import React, { useEffect, useState } from 'react';
import EChart, { useChartApiRef } from './EChart';
import { ECElementEvent, GraphicComponentOption } from 'echarts';
import './BloomTheme';

export function BoxPlotChart() {
  const chartApiRef = useChartApiRef();

  const [graphic, setGraphic] = useState<GraphicComponentOption>();

  const onMouseOver = (params: ECElementEvent) => {
    const chartApi = chartApiRef.current;
    if (!chartApi || !params.data) return;

    const data = params.data as [number, number, number, number, number, number];
    const {
      value, // same as data
      encode, // indexes of x and y components in the `data` and `value` arrays
      seriesId,
      seriesIndex,
      dataIndex, // the index of the data point
      componentIndex, // the index of the component (for the same `dataIndex`)
    } = params;
    const min = Math.min(...data.slice(1));
    const max = Math.max(...data.slice(1));
    const width = 9;
    const gap = 3;
    const bandwidth = 73; // TODO: How to obtain this value?
    const componentCount = 2; // TODO: How to obtain this value?
    const pixelTop = chartApi.convertToPixel({ seriesId }, [dataIndex, min]);
    const pixelBottom = chartApi.convertToPixel({ seriesId }, [dataIndex, max]);
    const height = Math.abs(pixelBottom[1] - pixelTop[1]);
    const pixel = chartApi.convertToPixel({ seriesIndex, dataIndex, dataIndexInside: componentIndex }, [
      dataIndex,
      min,
    ]);

    setGraphic({
      type: 'group',
      children: [
        {
          type: 'rect', // type 'roundrect' doesn't exist: https://echarts.apache.org/en/option.html#%2Fsearch%2Fgraphic.type
          // Unfortunatelly, we would have to approximated with 4 lines and 4 arcs if we really want to have that shape.
          z: 100,
          x: pixel[0] - width / 2 - bandwidth / 2 + (componentIndex * bandwidth) / (componentCount - 1) - gap,
          y: pixel[1] - height - gap,
          // left: pixel[0],
          // top: 300, //pixel[1],
          shape: {
            width: width + gap * 2,
            height: height + gap * 2,
            borderRadius: 3,
          },
          style: {
            fill: undefined,
            stroke: 'white',
            lineWidth: 1,
          },
        },
      ],
    });
  };
  const onMouseOut = (params: ECElementEvent) => {
    setGraphic({ type: 'group' });
  };

  useEffect(() => {
    if (!chartApiRef.current) return;

    console.log('BoxPlot useEffect after return');

    chartApiRef.current.on('mouseover', onMouseOver);
    chartApiRef.current.on('mouseout', onMouseOut);
  }, [chartApiRef.current]);

  const onSaveChartClick = () => {
    if (!chartApiRef.current) return;

    const dataUrl = chartApiRef.current.getDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'chart.png';
    a.click();
  };

  return (
    <div>
      <div style={{ width: '600px', height: '400px' }}>
        <EChart
          ref={chartApiRef}
          backgroundColor="#292b2a"
          // theme="bloom"
          title={{
            text: 'Post money valuation',
            left: '5%',
            top: 10,
          }}
          dataset={[
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
          ]}
          graphic={graphic}
          tooltip={{
            // trigger: 'item',
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          }}
          xAxis={{
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          }}
          yAxis={{
            type: 'value',
            // name: 'Axis title',
            interval: 10,
            splitArea: {
              show: false,
            },
          }}
          dataZoom={[
            {
              type: 'inside',
              start: 0,
              end: 100,
            },
          ]}
          series={[
            {
              name: 'category0',
              type: 'boxplot',
              datasetIndex: 3,
              boxWidth: [5, 5],
              itemStyle: {
                color: '#267fca',
                borderColor: '#26679c',
              },
              // emphasis: {
              //   disabled: false,
              //   focus: 'self',
              // },
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
              // emphasis: {
              //   disabled: false,
              //   focus: 'self',
              // },
            },
          ]}
        />
      </div>
      <p></p>
      <button onClick={onSaveChartClick}>Save chart</button>
    </div>
  );
}

function generateData() {
  let data = [];
  for (let i = 0; i < 3; i++) {
    let cate = [];
    for (let j = 0; j < 100; j++) {
      cate.push(Math.random() * 40 + Math.random() * Math.random() * 40);
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
