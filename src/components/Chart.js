import React from "react";
import BarPlot from "./BarPlot";
import "../styles/Chart.scss";
const SVG_WIDTH = 400;
const SVG_HEIGHT = 300;
//chart component in which svg is rendered based on the weekly appointment duration data
function Chart({ weekData }) {
  //weekly data
  const data = [
    ["Sun", weekData.Sun],
    ["Mon", weekData.Mon],
    ["Tue", weekData.Tue],
    ["Wed", weekData.Wed],
    ["Thu", weekData.Thu],
    ["Fri", weekData.Fri],
    ["Sat", weekData.Sat],
  ];
  //helpers for x and y axis
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;
  //finding maximum and minimum values
  const dataYMax = data.reduce(
    (currMax, [x, dataY]) => Math.max(currMax, dataY),
    0
  );
  const dataYMin = data.reduce(
    (currMin, [x, dataY]) => Math.min(currMin, dataY),
    0
  );
  const dataYRange = dataYMax - dataYMin;
  //number of y axis values
  const numYTicks = 5;

  const barPlotWidth = xAxisLength / data.length;

  return (
    <div className="chart">
      <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {/* X axis */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength}
          y2={xAxisY}
          stroke="grey"
        />
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          Day
        </text>

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);

          const yValue = (dataYMax - index * (dataYRange / numYTicks)).toFixed(
            1
          );

          return (
            <g key={index}>
              <text x={x0 - 5} y={y + 5} textAnchor="end">
                {yValue}
              </text>
            </g>
          );
        })}
        <text x={x0} y={y0 - 20} textAnchor="middle">
          Duration
        </text>

        {/* Bar plots */}
        {data.map(([day, dataY], index) => (
          <BarPlot
            day={day}
            x0={x0}
            index={index}
            key={index}
            barPlotWidth={barPlotWidth}
            dataY={dataY}
            dataYMin={dataYMin}
            dataYRange={dataYRange}
            yAxisLength={yAxisLength}
            y0={y0}
            xAxisY={xAxisY}
          />
        ))}
      </svg>
    </div>
  );
}

export default Chart;
