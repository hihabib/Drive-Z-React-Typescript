import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import {v4 as uuidV4} from "uuid";
import File from "../File/File.tsx";
import {FilesAndFolder} from "../../@types/api";

interface ShowFilesProps {
    files: FilesAndFolder[],
    isEmpty: boolean
}

const ShowFiles = ({files, isEmpty}: ShowFilesProps) => {
    return (<>

        {!isEmpty && (<>
                <SectionTitle title={"Files"}/>
                <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                    {files && files.map((file) => (<Col key={file.id}>
                        <File id={uuidV4()} fileName={file.name}/>
                    </Col>))}
                </Row>
            </>

        )}
    </>);
};

export default ShowFiles;