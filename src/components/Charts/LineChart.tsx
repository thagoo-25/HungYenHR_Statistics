import React from 'react';

interface DataPoint {
  month: string;
  value: number;
  target?: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, color = '#16a34a' }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.target || 0)));
  const minValue = Math.min(...data.map(d => Math.min(d.value, d.target || 0)));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return ((maxValue - value) / range) * 240 + 20; // 240 is chart height, 20 is padding
  };

  const getX = (index: number) => {
    return (index / (data.length - 1)) * 560 + 40; // 560 is chart width, 40 is padding
  };

  const pathData = data.map((point, index) => {
    const x = getX(index);
    const y = getY(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const targetPathData = data.filter(d => d.target).map((point, index) => {
    const x = getX(index);
    const y = getY(point.target!);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 640 320" className="w-full h-full">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="40"
            y1={20 + (i * 60)}
            x2="600"
            y2={20 + (i * 60)}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => {
          const value = maxValue - (i * range / 4);
          return (
            <text
              key={i}
              x="35"
              y={25 + (i * 60)}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {Math.round(value).toLocaleString()}
            </text>
          );
        })}

        {/* Main line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Target line */}
        {targetPathData && (
          <path
            d={targetPathData}
            fill="none"
            stroke="#6b7280"
            strokeWidth="2"
            strokeDasharray="5,5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points */}
        {data.map((point, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(point.value)}
            r="4"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* X-axis labels */}
        {data.map((point, index) => (
          <text
            key={index}
            x={getX(index)}
            y="310"
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {point.month}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default LineChart;