import { ReactElement } from "react";
import { Tooltip } from "react-tooltip";

interface ToolTipItemNameProps {
  id: string;
  directoryName: string;
  children: ReactElement;
}

const ToolTipItemName = ({
  id,
  directoryName,
  children,
}: ToolTipItemNameProps) => {
  return (
    <>
      <div
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content={directoryName}
        data-tooltip-place={"bottom"}
        data-tooltip-delay-show={300}
      >
        {children}
      </div>
      <Tooltip id={`tooltip-${id}`} />
    </>
  );
};

export default ToolTipItemName;
