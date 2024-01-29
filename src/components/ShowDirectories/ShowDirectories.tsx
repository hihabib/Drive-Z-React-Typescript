import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import { Col, Row } from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";

import { memo } from "react";
import { TDirectory } from "../../types/structure.ts";

interface ShowDirectoriesProps {
    isEmptyDirectory: boolean;
    directories: TDirectory[];
}

const ShowDirectories = memo(
    ({ isEmptyDirectory, directories }: ShowDirectoriesProps) => {
        return (
            <>
                {!isEmptyDirectory && (
                    <div>
                        <SectionTitle title={"Directories"} />
                        <Row lg={4} md={3} sm={2} xs={1} className={"g-3"}>
                            {directories &&
                                directories.map((directory) => (
                                    <Col key={directory.id}>
                                        <Directory
                                            id={`dir-${directory.id}`}
                                            dirName={directory.name}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                )}
            </>
        );
    },
);

export default ShowDirectories;
