//component for plotting bar in chart
const BarPlot = ({
  x0,
  index,
  barPlotWidth,
  dataY,
  dataYMin,
  dataYRange,
  yAxisLength,
  day,
  y0,
  xAxisY,
}) => {
  const x = x0 + index * barPlotWidth;

  const yRatio = (dataY - dataYMin) / dataYRange;

  const y = y0 + (1 - yRatio) * yAxisLength;
  const height = yRatio * yAxisLength;

  const sidePadding = 10;
  return (
    <g key={index}>
      {y && (
        <rect
          x={x + sidePadding / 2}
          y={y}
          width={barPlotWidth - sidePadding}
          height={height}
          rx="5"
          ry="5"
          style={{
            stroke: "rgb(255, 255, 255)",
            opacity: "0.8",
            fill: "#ADA2FF",
          }}
        />
      )}
      <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
        {day}
      </text>
    </g>
  );
};

export default BarPlot;
