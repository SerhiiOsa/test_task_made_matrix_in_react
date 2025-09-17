import React from 'react';

const Header = ({
  rows,
  cols,
  neighboringCells,
  onRowsChange,
  onColsChange,
  onNeighborsChange,
}) => {
  return (
    <>
      <div className="inputs">
        <label htmlFor="M">Input M (rows)</label>
        <input
          id="M"
          type="number"
          value={rows}
          onChange={(e) => onRowsChange(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label htmlFor="N">Input N (columns)</label>
        <input
          id="N"
          type="number"
          value={cols}
          onChange={(e) => onColsChange(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label htmlFor="K">Input K (neighboring cells)</label>
        <input
          id="K"
          type="number"
          value={neighboringCells}
          onChange={(e) => onNeighborsChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default Header;
