import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ReactElement } from "react";

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
        <OverlayTrigger
            placement={"bottom"}
            overlay={<Tooltip id={`tooltip-${id}`}>{directoryName}</Tooltip>}
        >
            {children}
        </OverlayTrigger>
    );
};

export default ToolTipItemName;
