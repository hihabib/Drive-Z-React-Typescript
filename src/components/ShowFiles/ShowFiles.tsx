import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import File from "../File/File.tsx";
import {TFile} from "../../types/structure.ts";

interface ShowFilesProps {
    isEmptyFile: boolean;
    files: TFile[];
}

const ShowFiles = ({isEmptyFile, files}: ShowFilesProps) => {
    return (
        <>
            {!isEmptyFile && (
                <>
                    <SectionTitle title={"Files"}/>
                    <Row lg={4} md={3} sm={2} xs={1} className={"g-3"}>
                        {files &&
                            files.map((file) => (
                                <Col key={file.id}>
                                    <File
                                        id={`file-${file.id}`}
                                        fileName={file.name}
                                    />
                                </Col>
                            ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default ShowFiles;
