import { useEffect, useMemo, useRef, useState } from 'react';
import Cell from './Cell';

const Matrix = ({ cols, rows, neighboringCells, randomNumbers }) => {
  const [hoveredNumber, setHoveredNumber] = useState(null);
  const closestCache = useRef({});

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
    <div
      className="matrix"
      style={{ '--cols': cols }}
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseOut={(e) => handleMouseOut(e)}
    >
      {randomNumbers.map((cellNumber, cellIndex) => (
        <Cell
          key={cellIndex}
          cellNumber={cellNumber}
          cellIndex={cellIndex}
          closestIndices={closestIndices}
          hoveredNumber={hoveredNumber}
        />
      ))}
    </div>
  );
};

export default Matrix;
