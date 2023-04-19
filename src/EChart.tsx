import React, { FC, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
// import { EChartsOption } from "echarts/types/dist/shared";
// import { ECBasicOption } from "echarts/types/src/util/types";

interface EChartsOption {
  dataset?: any;
  xAxis?: any;
  yAxis?: any;
  series?: any;
}

type EChartsWrapperOption = {};
export type EChartProps = echarts.EChartsOption & EChartsWrapperOption;
// type EChartProps = EChartsOption;
export type EChartAPI = echarts.ECharts;

const EChart = React.forwardRef<EChartAPI, EChartProps>((props, ref) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [, setChartApi] = useState<EChartAPI>();
  const chartApiRef = useRef<EChartAPI | null>(null);
  const resizeObserver = useRef<ResizeObserver>(
    new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const chartApi = chartApiRef.current;
        if (chartApi) {
          chartApi.resize({
            width,
            height,
          });
        }
      }
    })
  );

  useEffect(() => {
    if (!chartContainerRef.current || chartApiRef.current) return;
    const chart = echarts.init(chartContainerRef.current, 'dark', {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    setChartApi((chartApiRef.current = chart));
    resizeObserver.current.observe(chartContainerRef.current);
  }, []);

  if (typeof ref === 'function') {
    ref(chartApiRef.current);
  } else if (ref) {
    ref.current = chartApiRef.current;
  }

  if (chartApiRef.current) {
    chartApiRef.current.setOption(props);
  }

  return <div style={autoSizeStyle} ref={chartContainerRef} />;
});

const autoSizeStyle = { width: '100%', height: '100%' };

export default EChart;
