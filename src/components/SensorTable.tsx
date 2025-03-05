/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { css } from "@emotion/react";

const SECONDS_IN_2_MONTHS = 5184000;
const NUM_SENSORS = 1000;
const ROW_HEIGHT = 17;
const HEADER_HEIGHT = 40;
const VIEWPORT_HEIGHT = 500;
const COLUMN_WIDTH = 80;


const VISIBLE_ROW_COUNT = Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + 5;

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

const tableWrapperStyle = css`
  position: relative;
  min-width: ${NUM_SENSORS * COLUMN_WIDTH + 80}px;
  height: ${SECONDS_IN_2_MONTHS * ROW_HEIGHT}px;
`;

const headerRowStyle = css`
  display: flex;
  height: ${HEADER_HEIGHT}px;
  background: #f3f3f3;
  border-bottom: 2px solid #ccc;
  color: blue;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
  
`;

const rowStyle = css`
  display: flex;
  height: ${ROW_HEIGHT}px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  position: absolute;
  left: 0;
  width: 100%;
  &:nth-of-type(even) {
    background: #f3f3f3;
    
  }
`;

const sensorIdStyle = css`
  flex: 0 0 80px;
  font-weight: bold;
  padding: 1px;
  background: #f0f0f0;
  color:blue;
  text-align: center;
  position: sticky;
  left: 0;
   font-size: 10px;
  z-index: 5;
  border-right: 2px solid #ddd;
`;

const sensorValueStyle = css`
  flex: 0 0 ${COLUMN_WIDTH}px;
  padding: 5px;
  text-align: center;
  font-size: 10px;
  border-right: 1px solid #ddd;
  &:last-of-type {
    border-right: none;
  }
`;

const generateSensorNames = () => Array.from({ length: NUM_SENSORS }, (_, i) => `Sensor${i + 1}`);
const generateSensorRow = () => Array.from({ length: NUM_SENSORS }, () => (Math.random() * 10).toFixed(2));

const SensorTable: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sensorNames = useMemo(generateSensorNames, []);

 
  const startRowIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const endRowIndex = Math.min(startRowIndex + VISIBLE_ROW_COUNT, SECONDS_IN_2_MONTHS);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollTop(containerRef.current.scrollTop);
      }
    };
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => containerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div css={tableContainerStyle} ref={containerRef}>
     
      <div css={headerRowStyle}>
        <div css={sensorIdStyle}>Time (s)</div>
        {sensorNames.map((name, index) => (
          <div key={index} css={sensorValueStyle}>{name}</div>
        ))}
      </div>

     
      <div css={tableWrapperStyle}>
        {Array.from({ length: endRowIndex - startRowIndex }, (_, i) => {
          const actualRowIndex = startRowIndex + i;
          return (
            <div key={actualRowIndex} css={rowStyle} style={{ top: actualRowIndex * ROW_HEIGHT }}>
              <div css={sensorIdStyle}>{actualRowIndex}s</div>
              {generateSensorRow().map((value, sensorIndex) => (
                <div key={sensorIndex} css={sensorValueStyle}>{value}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SensorTable;