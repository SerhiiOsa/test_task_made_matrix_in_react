import { useEffect, useMemo, useRef, useState } from 'react';

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(25);
  const [neighboringCells, setNeighboringCells] = useState(10);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [hoveredNumber, setHoveredNumber] = useState(null);
  const closestCache = useRef({});

  useEffect(() => {
    setRandomNumbers(
      Array.from({ length: rows * cols }, () => {
        return Math.floor(Math.random() * 100 + 1);
      })
    );
  }, [rows, cols]);

  useEffect(() => {
    closestCache.current = {};
  }, [randomNumbers, neighboringCells]);

  const handleMouseOver = (e) => {
    const cell = e.target.closest('.cell');

    if (!cell) return;
    setHoveredNumber({
      number: Number(cell.dataset.number),
      index: Number(cell.dataset.index),
    });
  };

  const handleMouseOut = () => {
    setHoveredNumber(null);
  };

  const closestIndices = useMemo(() => {
    if (!hoveredNumber) return [];

    const { number, index } = hoveredNumber;

    if (closestCache.current[index]) {
      return closestCache.current[index];
    }

    let closest;
    //for smaller quantity of neighboring cells
    if (neighboringCells / (rows * cols) < 0.1) {
      const best = [];
      randomNumbers.forEach((n, idx) => {
        if (idx === index) {
          return;
        }

        const diff = Math.abs(n - number);

        if (best.length < neighboringCells) {
          best.push({ idx, diff });

          best.sort((a, b) => a.diff - b.diff);
        } else if (diff < best[best.length - 1].diff) {
          best[best.length - 1] = { idx, diff };
          best.sort((a, b) => a.diff - b.diff);
        }
      });

      closest = best.map((item) => item.idx);
      closestCache.current[index] = closest;
      //for bigger quantity of neighboring cells
    } else {
      const diffs = [];
      randomNumbers.forEach((n, idx) => {
        if (idx === index) {
          return;
        }
        diffs.push({ idx, diff: Math.abs(n - number) });
      });

      diffs.sort((a, b) => a.diff - b.diff);

      closest = diffs.slice(0, neighboringCells).map((item) => item.idx);
      closestCache.current[index] = closest;
    }

    return closest;
  }, [hoveredNumber, randomNumbers, neighboringCells]);

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
      <div
        className="matrix"
        style={{ '--cols': cols }}
        onMouseOver={(e) => handleMouseOver(e)}
        onMouseOut={(e) => handleMouseOut(e)}
      >
        {randomNumbers.map((cellNumber, cellIndex) => {
          const isActive = hoveredNumber?.index === cellIndex;
          const isNeighbor = closestIndices.includes(cellIndex);
          return (
            <div
              data-number={cellNumber}
              data-index={cellIndex}
              key={cellIndex}
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
        })}
      </div>
    </div>
  );
}

export default App;
