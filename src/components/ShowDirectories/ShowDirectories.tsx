import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import { Col, Row } from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";
import { StructureDirectory } from "../../@types/api";
import { memo } from "react";

interface ShowDirectoriesProps {
    isEmptyDirectory: boolean;
    directories: StructureDirectory[];
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
                                            id={directory.id}
                                            dirName={directory.directoryName}
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
