import React from 'react';

interface BarDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarDataPoint[];
  orientation?: 'vertical' | 'horizontal';
}

const BarChart: React.FC<BarChartProps> = ({ data, orientation = 'vertical' }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = ['#16a34a', '#0284c7', '#ea580c', '#7c3aed', '#dc2626', '#059669'];

  if (orientation === 'horizontal') {
    return (
      <div className="w-full h-full flex flex-col justify-center">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-24 text-sm text-gray-600 text-right">
                {item.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-2"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color || colors[index % colors.length]
                  }}
                >
                  <span className="text-white text-xs font-medium">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 640 320" className="w-full h-full">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="60"
            y1={40 + (i * 50)}
            x2="600"
            y2={40 + (i * 50)}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => {
          const value = maxValue - (i * maxValue / 4);
          return (
            <text
              key={i}
              x="55"
              y={45 + (i * 50)}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {Math.round(value).toLocaleString()}
            </text>
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const barWidth = 480 / data.length * 0.8;
          const barSpacing = 480 / data.length;
          const barHeight = (item.value / maxValue) * 200;
          const x = 60 + index * barSpacing + (barSpacing - barWidth) / 2;
          const y = 240 - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color || colors[index % colors.length]}
                rx="4"
              />
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="text-xs fill-gray-700 font-medium"
              >
                {item.value.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((item, index) => {
          const barSpacing = 480 / data.length;
          const x = 60 + index * barSpacing + barSpacing / 2;
          
          return (
            <text
              key={index}
              x={x}
              y="270"
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {item.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;