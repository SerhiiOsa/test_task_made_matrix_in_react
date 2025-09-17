import { useEffect, useState } from 'react';
import Header from './components/Header';
import Matrix from './components/Matrix';

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(25);
  const [neighboringCells, setNeighboringCells] = useState(10);
  const [randomNumbers, setRandomNumbers] = useState([]);

  useEffect(() => {
    setRandomNumbers(
      Array.from({ length: rows * cols }, () => {
        return Math.floor(Math.random() * 100 + 1);
      })
    );
  }, [rows, cols]);

  return (
    <div className="container">
      <Header
        rows={rows}
        cols={cols}
        neighboringCells={neighboringCells}
        onRowsChange={setRows}
        onColsChange={setCols}
        onNeighborsChange={setNeighboringCells}
      />
      <Matrix
        rows={rows}
        cols={cols}
        neighboringCells={neighboringCells}
        randomNumbers={randomNumbers}
      />
    </div>
  );
}

export default App;
