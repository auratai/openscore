const Steps = ({ data }: { data: any[] }) => {
  // Array of line points: [x1, y1, x2, y2]
  const lines = [
    /* First Place */
    // Top line (shorter)
    [230, 30, 370, 30],
    // Bottom line (longer)
    [200, 80, 400, 80],
    // Left connecting line
    [230, 30, 200, 80],
    // Right connecting line
    [370, 30, 400, 80],
    // Left vertical line from bottom
    [200, 80, 200, 240],
    // Right vertical line from bottom
    [400, 80, 400, 290],

    /* Second Place */
    // Top line (shorter)
    [20, 130, 200, 130],
    // Bottom line (longer)
    [0, 170, 200, 170],
    // Left connecting line
    [20, 130, 0, 170],
    // Left vertical line from bottom
    [0, 170, 0, 240],

    /* Third Place */
    // Top line (shorter)
    [400, 170, 540, 170],
    // Bottom line (longer)
    [400, 210, 600, 210],

    // Right connecting line
    [540, 170, 600, 210],

    // Right vertical line from bottom
    [600, 210, 600, 290],
  ];

  return (
    <div className="flex items-center justify-center p-8 relative">
      <svg width="600" height="300" viewBox="0 0 600 300">
        {lines.map((line, index) => {
          // Calculate opacity based on y position - higher y means lower opacity
          const avgY = (line[1] + line[3]) / 2;
          const maxY = 300; // SVG height
          const opacity = Math.max(0.3, 1 - (avgY / maxY) * 0.7); // Opacity from 1.0 to 0.3
          
          return (
            <g key={index}>
              {/* Glow effect */}
              <line
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="#00ff00"
                strokeWidth="8"
                opacity={opacity * 0.3}
                filter="blur(3px)"
              />
              {/* Main neon line */}
              <line
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="#00ff00"
                strokeWidth="2"
                opacity={opacity}
                filter="drop-shadow(0 0 6px #00ff00)"
              />
              {/* Highlight line */}
              <line
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="#7fff7f"
                strokeWidth="1"
                opacity={opacity * 0.8}
              />
            </g>
          );
        })}
        
        {/* Data Overlays */}
        {data.map((entry, index) => {
          let position;
          let imagePosition;
          if (index === 0) {
            // 1st place - center top
            position = { x: 300, y: 135 };
            imagePosition = { x: 300, y: 55 };
          } else if (index === 1) {
            // 2nd place - left
            position = { x: 100, y: 230 };
            imagePosition = { x: 100, y: 150 };
          } else {
            // 3rd place - right
            position = { x: 500, y: 260 };
            imagePosition = { x: 500, y: 180 };
          }

          return (
            <g key={index}>
              {/* Image */}
              {entry.image && (
                <image
                  href={entry.image}
                  x={imagePosition.x - 30}
                  y={imagePosition.y - 50}
                  width="60"
                  height="60"
                  className="rounded-lg object-cover"
                  style={{
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              )}
              
              {/* Rank */}
              <text
                x={position.x}
                y={position.y - 20}
                textAnchor="middle"
                className="text-sm font-bold fill-current"
                style={{ fontSize: '14px' }}
              >
                [{entry.rank}]
              </text>
              
              {/* Name */}
              <text
                x={position.x}
                y={position.y}
                textAnchor="middle"
                className="text-sm font-medium fill-current"
                style={{ fontSize: '12px' }}
              >
                {entry.name}
              </text>
              
              {/* Value */}
              <text
                x={position.x}
                y={position.y + 15}
                textAnchor="middle"
                className="text-sm font-bold fill-blue-400"
                style={{ fontSize: '14px' }}
              >
                ${entry.value}
              </text>
              
              {/* Label */}
              <text
                x={position.x}
                y={position.y + 30}
                textAnchor="middle"
                className="text-xs fill-gray-400"
                style={{ fontSize: '10px' }}
              >
                {entry.sortByColumnDisplayName || 'SCORE'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Steps;