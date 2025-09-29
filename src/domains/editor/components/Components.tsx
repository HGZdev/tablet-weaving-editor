import styled from "styled-components";
import { getSkewLabel, holeNames } from "./helpers";
import React from "react";
import { useDraft } from "../context/DraftContext/useDraft";
import type { Skew } from "./types";

export const Sqrt = styled.div<{
  $hasBorder?: boolean;
  $hasBottomLine?: boolean;
  $bg?: string;
}>`
  padding: 0.1rem 0.2rem;
  width: 1.2rem;
  height: 1.7rem;

  border: ${(p) => p.$hasBorder && "0.5px solid #fff"};
  border-bottom: ${(p) => p.$hasBottomLine && "3px solid red"};
  background-color: ${(p) => p.$bg};
  cursor: pointer;
`;

export const SqrtShapeBox = styled.div<{
  $skew: number;
  $bg?: string;
}>`
  width: 100%;
  height: 100%;

  background-color: ${(p) => p.$bg};

  border: 1px solid black;
  border-radius: 5px;

  transform: skew(
    ${(p) => (p.$skew < 0 ? "20deg" : p.$skew > 0 ? "-20deg" : "0")}
  );
`;

export const RowsLabels: React.FC<{
  rows?: number;
  numeric?: boolean;
  reverse?: boolean;
}> = ({ rows, numeric, reverse }) => {
  if (!rows) return null;

  const rowsArr = [...new Array(rows)].map((_x, row) => (
    <Sqrt
      key={row}
      className={`row-${numeric ? row : holeNames[row]}`}
      title={numeric ? "row number" : "hole name"}
      role="text"
      aria-label={numeric ? `Row ${row + 1}` : `Hole ${holeNames[row]}`}
    >
      <span>{numeric ? row + 1 : holeNames[row]}</span>
    </Sqrt>
  ));

  return (
    <div
      role="columnheader"
      aria-label={numeric ? "Row numbers" : "Hole labels"}
    >
      <Sqrt />
      {reverse ? rowsArr.reverse() : rowsArr}
      <Sqrt />
    </div>
  );
};

export const ColLabel: React.FC<{
  col: number;
}> = ({ col }) => (
  <Sqrt
    key={col}
    className={`col-${col}`}
    title="column number"
    role="text"
    aria-label={`Column ${col + 1}`}
  >
    <span>{col + 1}</span>
  </Sqrt>
);

export const ColSkewButton: React.FC<{
  col: number;
  skew: Skew;
}> = ({ col, skew }) => {
  const { onSkewToggle } = useDraft();
  const skewLabel = getSkewLabel[skew];

  return (
    <Sqrt
      className={`col-${col} toggle-skew skew-${skewLabel}`}
      title="toggle skew"
      key={col}
      onClick={() => onSkewToggle(col)}
      role="button"
      tabIndex={0}
      aria-label={`Toggle skew for column ${col + 1}, current: ${skewLabel}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSkewToggle(col);
        }
      }}
    >
      <span>{skewLabel}</span>
    </Sqrt>
  );
};
