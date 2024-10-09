import {genThread, getDirLabel} from "./helpers";
import {
  ColLabel,
  ColSkewButton,
  RowsLabels,
  Sqrt,
  SqrtShapeBox,
} from "./Components";
import {isEmpty} from "lodash";
import {useDraft} from "./DraftContext/useDraft";

type ThreadProps = {
  col: number;
  reverse: boolean;
};

const Thread: React.FC<ThreadProps> = ({col, reverse}) => {
  const {draft, onDirChange} = useDraft();
  const {tablets, skews, picks, dirsChanges} = draft;

  if (isEmpty(tablets)) return null;

  const thread = genThread({col, tablets, picks, dirsChanges});
  const skew = skews[col];

  const rowsArr = thread?.map(({bg, dir, isTurnPoint}, row) => {
    return (
      <Sqrt
        key={row}
        className={`col-${col} row-${row} toggle-rotation-direction dir-${getDirLabel[dir]}`}
        title="toggle rotation direction"
        $bg={dir < 0 ? "grey" : "lightgrey"}
        $hasBorder
        $hasBottomLine={isTurnPoint}
        onClick={() => onDirChange(col, row, isTurnPoint)}
      >
        <SqrtShapeBox
          $skew={dir < 0 ? (-skew as Skew) : (skew as Skew)}
          $bg={bg}
        />
      </Sqrt>
    );
  });

  return (
    <div>
      <ColLabel col={col} />
      {reverse ? rowsArr.reverse() : rowsArr}
      <ColSkewButton {...{col, skew}} />
    </div>
  );
};

const ThreadsPanel: React.FC = () => {
  const {draft} = useDraft();
  const {picks, tablets} = draft;

  return (
    <div title="threads-panel" className="flex g-4 justify-center">
      <RowsLabels rows={picks} numeric reverse />
      {tablets?.map((_x, col) => (
        <Thread key={col} col={col} reverse />
      ))}
      <RowsLabels rows={picks} numeric reverse />
    </div>
  );
};

export default ThreadsPanel;
