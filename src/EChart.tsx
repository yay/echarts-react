import React, { FC, useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as echarts from 'echarts';

export type EChartAPI = echarts.ECharts;

export interface EChartProps extends echarts.EChartsOption {
  ref?: React.MutableRefObject<EChartAPI | undefined>;
  theme?: string;
}

export const useChartApiRef = () => useRef<EChartAPI>();

export const defaultTheme = 'dark';

const EChart = React.forwardRef<EChartAPI, EChartProps>((props, ref) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [, setChartApi] = useState<EChartAPI>();
  const chartApiRef = useRef() as React.MutableRefObject<EChartAPI>;
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

  useImperativeHandle(ref, () => chartApiRef.current, [chartApiRef]);

  useEffect(() => {
    if (!chartContainerRef.current || chartApiRef.current) return;
    const chart = echarts.init(chartContainerRef.current, props.theme || defaultTheme, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    setChartApi((chartApiRef.current = chart));
    resizeObserver.current.observe(chartContainerRef.current);
  }, [chartApiRef.current]);

  if (chartApiRef.current) {
    chartApiRef.current.setOption(props);
  }

  return <div style={autoSizeStyle} ref={chartContainerRef} />;
}) as FC<EChartProps>;

const autoSizeStyle = { width: '100%', height: '100%' };

export default EChart;
