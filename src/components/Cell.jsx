const Cell = ({ hoveredNumber, cellIndex, cellNumber, closestIndices }) => {
  const isActive = hoveredNumber?.index === cellIndex;
  const isNeighbor = closestIndices.includes(cellIndex);

  return (
    <div
      data-number={cellNumber}
      data-index={cellIndex}
      className="cell"
      style={{
        background: isActive
          ? `linear-gradient(to right, green ${cellNumber}%, transparent ${cellNumber}%)`
          : isNeighbor
          ? 'lightgreen'
          : '',
      }}
    >
      {cellNumber}
    </div>
  );
};

export default Cell;
