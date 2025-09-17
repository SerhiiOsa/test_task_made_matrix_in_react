import { useEffect, useState } from 'react';

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(25);
  const [neighboringCells, setNeighboringCells] = useState(10);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [cellStyle, setCellStyle] = useState({});
  const [hoveredNumber, setHoveredNumber] = useState(null);

  useEffect(() => {
    setRandomNumbers(
      Array.from({ length: rows * cols }, () => {
        return Math.floor(Math.random() * 100 + 1);
      })
    );

    setCellStyle({
      aspectRatio: '1 / 1',
      flex: `0 0 ${100 / cols}%`,
      fontSize: `${3000 / cols}%`,
    });
  }, [rows, cols]);

  const handleMouseEnter = (e, cellNumber, cellIndex) => {
    e.currentTarget.style.background = `linear-gradient(to right, green ${cellNumber}%, transparent ${cellNumber}%)`;
    setHoveredNumber({ number: cellNumber, index: cellIndex });
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = '';
    setHoveredNumber(null);
  };

  const getClosestIndices = (num) => {
    const diffs = randomNumbers.map((n, idx) => ({
      idx,
      diff: Math.abs(n - num),
    }));

    diffs.sort((a, b) => a.diff - b.diff);

    return diffs.slice(0, neighboringCells).map((item) => item.idx);
  };

  const closestIndices =
    hoveredNumber !== null ? getClosestIndices(hoveredNumber.number) : [];

  return (
    <div className="container">
      <div>
        <div className="inputs">
          <label htmlFor="M">Input M (rows)</label>
          <input
            id="M"
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label htmlFor="N">Input N (columns)</label>
          <input
            id="N"
            type="number"
            value={cols}
            onChange={(e) => setCols(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label htmlFor="K">Input K (neighboring cells)</label>
          <input
            id="K"
            type="number"
            value={neighboringCells}
            onChange={(e) => setNeighboringCells(e.target.value)}
          />
        </div>
      </div>
      <div className="matrix">
        {randomNumbers.map((cellNumber, cellIndex) => {
          const isActive = hoveredNumber?.index === cellIndex;
          const isNeighbor = closestIndices.includes(cellIndex);
          return (
            <div
              key={cellIndex}
              className="cell"
              style={{
                ...cellStyle,
                background: isActive
                  ? `linear-gradient(to right, green ${cellNumber}%, transparent ${cellNumber}%)`
                  : isNeighbor
                  ? 'lightgreen'
                  : '',
              }}
              onMouseEnter={(e) => handleMouseEnter(e, cellNumber, cellIndex)}
              onMouseLeave={(e) => handleMouseLeave(e, cellNumber, cellIndex)}
            >
              {cellNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
