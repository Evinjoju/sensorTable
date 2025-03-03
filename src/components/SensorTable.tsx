/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

const SECONDS_IN_2_MONTHS = 5184000; 
const NUM_SENSORS = 1000; 
const ROW_HEIGHT = 30;
const HEADER_HEIGHT = 40;
const VIEWPORT_HEIGHT = 500;
const COLUMN_WIDTH = 80;
const ROWS_PER_PAGE = 60; 


const tableContainerStyle = css`
  min-width: 500px;  
  min-height: 500px;
  height: ${VIEWPORT_HEIGHT + HEADER_HEIGHT}px;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  position: relative;
  white-space: nowrap;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const tableContentStyle = (numRows: number) => css`
  position: relative;
  min-width: ${NUM_SENSORS * COLUMN_WIDTH + 80}px;
  height: ${numRows * ROW_HEIGHT}px;
`;

const headerRowStyle = css`
  display: flex;
  height: ${HEADER_HEIGHT}px;
  color: black;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
  
  color: blue;
  border-radius: 8px 8px 0 0;
`;

const rowStyle = css`
  display: flex;
  height: ${ROW_HEIGHT}px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  &:nth-of-type(even) {
    background: #f3f3f3;
  }
`;

const sensorIdStyle = css`
  flex: 0 0 80px;
  font-weight: bold;
  padding: 5px;
  background: #f0f0f0;
  text-align: center;
  position: sticky;
  left: 0;
  z-index: 5;
  border-right: 2px solid #ddd;
`;

const sensorValueStyle = css`
  flex: 0 0 ${COLUMN_WIDTH}px;
  padding: 5px;
  text-align: center;
  font-size: 12px;
  border-right: 1px solid #ddd;
  &:last-of-type {
    border-right: none;
  }
`;

const paginationContainerStyle = css`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const buttonStyle = css`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
  &:hover {
    background: #0056b3;
  }
  &:disabled {
    background: #b0c4de;
    cursor: not-allowed;
  }
`;

const inputStyle = css`
  width: 60px;
  padding: 8px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const generateSensorNames = () => Array.from({ length: NUM_SENSORS }, (_, i) => `Sensor${i + 1}`);
const generateSensorRow = () => Array.from({ length: NUM_SENSORS }, () => (Math.random() * 10).toFixed(2));

const SensorTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [inputPage, setInputPage] = useState("");
  const sensorNames = generateSensorNames();

  const startIndex = page * ROWS_PER_PAGE;
  const totalPages = Math.ceil(SECONDS_IN_2_MONTHS / ROWS_PER_PAGE);

  const visibleRows = Array.from({ length: ROWS_PER_PAGE }, (_, i) => startIndex + i)
    .filter((index) => index < SECONDS_IN_2_MONTHS);

  const handlePageSearch = () => {
    const targetPage = parseInt(inputPage, 10);
    if (!isNaN(targetPage) && targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage - 1);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
    setInputPage(""); 
  };

  return (
    <div>
      <div css={paginationContainerStyle}>
        <button css={buttonStyle} onClick={() => setPage(0)} disabled={page === 0}>First</button>
        <button css={buttonStyle} onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
        <span>Page {page + 1} / {totalPages}</span>
        <button css={buttonStyle} onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
        <button css={buttonStyle} onClick={() => setPage(totalPages - 1)} disabled={page + 1 >= totalPages}>Last</button>
        <input
          type="number"
          css={inputStyle}
          placeholder="Page ?"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePageSearch()}
          min="1"
          max={totalPages}
        />
        <button css={buttonStyle} onClick={handlePageSearch}>Go</button>
      </div>
      <div css={tableContainerStyle}>
        <div css={headerRowStyle}>
          <div css={sensorIdStyle}>Time (s)</div>
          {sensorNames.map((name, index) => (
            <div key={index} css={sensorValueStyle}>{name}</div>
          ))}
        </div>
        <div css={tableContentStyle(visibleRows.length)}>
          {visibleRows.map((rowIndex) => (
            <div key={rowIndex} css={rowStyle}>
              <div css={sensorIdStyle}>{rowIndex}s</div>
              {generateSensorRow().map((value, sensorIndex) => (
                <div key={sensorIndex} css={sensorValueStyle}>{value}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorTable;