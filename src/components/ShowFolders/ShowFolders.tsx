import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";

interface ShowFoldersProps {
    folders: string[] | [],
    isEmpty: boolean
}

const ShowFolders = ({folders, isEmpty}: ShowFoldersProps) => {
    return (<>
        {!isEmpty && (<>
                <SectionTitle title={"Folders"}/>
                <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                    {folders && folders.map((folder, index) => (<Col key={`${index}-${folder}`}>
                        <Directory id={`${index}-${folder}`} dirName={folder}/>
                    </Col>))}
                </Row>
            </>

        )}
    </>)

};

export default ShowFolders;