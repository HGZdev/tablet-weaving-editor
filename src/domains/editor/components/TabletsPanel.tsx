import {
  ColLabel,
  ColSkewButton,
  RowsLabels,
  Sqrt,
  SqrtShapeBox,
} from "./Components";
import { useDraft } from "../context/DraftContext/useDraft";

export const Tablet: React.FC<{
  col: number;
  reverse: boolean;
}> = ({ col, reverse }) => {
  const { draft, onColorChange } = useDraft();
  const { tablets, skews } = draft;

  const tablet = tablets[col];
  const skew = skews[col];
  const rowsArr = tablet.map((bg, row) => (
    <Sqrt
      className={`col-${col} row-${row} change-color`}
      title="change color"
      key={row}
      $bg="lightgrey"
      $hasBorder
      onClick={() => onColorChange(col, row)}
      role="button"
      tabIndex={0}
      aria-label={`Change color for tablet ${col + 1}, hole ${row + 1}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onColorChange(col, row);
        }
      }}
    >
      <SqrtShapeBox $skew={skew || 0} $bg={bg} />
    </Sqrt>
  ));

  return (
    <div role="group" aria-label={`Tablet ${col + 1}`}>
      <ColLabel col={col} />
      {reverse ? rowsArr.reverse() : rowsArr}
      <ColSkewButton {...{ col, skew }} />
    </div>
  );
};

export const Tablets: React.FC = () => {
  const { draft } = useDraft();
  return draft.tablets.map((_x, col) => (
    <Tablet key={col} {...{ col, reverse: true }} />
  ));
};

const TabletsPanel: React.FC = () => {
  const { draft: { holes, tablets } = {} } = useDraft();

  return (
    <div
      title="tablets-panel"
      className="flex justify-center"
      role="region"
      aria-label="Tablet weaving editor"
      aria-describedby="tablets-description"
    >
      <div id="tablets-description" className="sr-only">
        Interactive tablet weaving editor. Click on individual holes to change
        colors, use skew buttons to change tablet orientation.
      </div>
      <RowsLabels rows={holes} />
      {tablets && <Tablets />}
      <RowsLabels rows={holes} />
    </div>
  );
};

export default TabletsPanel;
