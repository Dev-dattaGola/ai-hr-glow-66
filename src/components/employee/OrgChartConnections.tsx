
import { useMemo } from 'react';

interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'vertical' | 'horizontal' | 'curved';
  color?: string;
}

interface OrgChartConnectionsProps {
  connections: Connection[];
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const OrgChartConnections = ({ connections, containerRef }: OrgChartConnectionsProps) => {
  const svgPaths = useMemo(() => {
    return connections.map((connection, index) => {
      const { from, to, type, color = '#e5e7eb' } = connection;
      
      let pathData = '';
      
      switch (type) {
        case 'vertical':
          pathData = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
          break;
        case 'horizontal':
          pathData = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
          break;
        case 'curved':
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          pathData = `M ${from.x} ${from.y} Q ${midX} ${from.y} ${midX} ${midY} T ${to.x} ${to.y}`;
          break;
      }
      
      return (
        <path
          key={index}
          d={pathData}
          stroke={color}
          strokeWidth={2}
          fill="none"
          className="transition-all duration-300"
        />
      );
    });
  }, [connections]);

  if (connections.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    >
      {svgPaths}
      
      {/* Connection dots */}
      {connections.map((connection, index) => (
        <g key={`dots-${index}`}>
          <circle
            cx={connection.from.x}
            cy={connection.from.y}
            r={3}
            fill="#3b82f6"
            className="opacity-75"
          />
          <circle
            cx={connection.to.x}
            cy={connection.to.y}
            r={3}
            fill="#3b82f6"
            className="opacity-75"
          />
        </g>
      ))}
      
      {/* Directional arrows */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#6b7280"
            className="opacity-60"
          />
        </marker>
      </defs>
    </svg>
  );
};
