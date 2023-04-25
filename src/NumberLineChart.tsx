import EChart from './EChart';

export function NumberLineChart() {
  const data = [
    [2017, NaN],
    [2018, 5],
    [2018, 2],
    [2019, 8.72],
    [2020, 8.62],
    [2021, 8.15],
    [2022, 8.25],
    [2023, NaN],
  ];

  return (
    <div>
      <div style={{ width: '600px', height: '400px' }}>
        <EChart
          title={{
            text: 'Post money valuation',
            subtext: 'USD in millions',
            left: 20
          }}
          xAxis={{
            min: 2017,
            max: 2023,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: (value: number, index: number) => index === 0 || index === data.length - 2 ? '' : value.toString()
            }
          }}
          yAxis={{
            splitLine: {
              show: true
            },
            interval: 5,
          }}
          series={[
            {
              data,
              type: 'line',
            },
          ]}
        />
      </div>
      <p></p>
    </div>
  );
}
