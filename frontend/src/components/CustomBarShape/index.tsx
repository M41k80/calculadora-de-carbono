type CustomBarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
};

const CustomBarShape = ({ x, y, width, height, index }: CustomBarProps) => {
  if (
    x == null ||
    y == null ||
    width == null ||
    height == null ||
    index == null
  )
    return null;

  const color = index === 0 ? "#EA5105" : "#D1D1D1";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        rx={4}
        ry={4}
      />
      <text
        x={x + width / 2}
        y={y - 10}
        textAnchor="middle"
        fill="#fff"
        fontSize={12}
        fontWeight="bold"
      >
        co2
      </text>
    </g>
  );
};

export default CustomBarShape;
