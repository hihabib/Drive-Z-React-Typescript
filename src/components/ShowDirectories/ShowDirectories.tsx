import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";
import {StructureItems} from "../../@types/api";
import {memo} from "react";
interface ShowDirectoriesProps {
    isEmptyDirectory: boolean;
    directories: StructureItems[]
}
const ShowDirectories = memo(({isEmptyDirectory, directories} : ShowDirectoriesProps) => {
    return (<>
        {!isEmptyDirectory && (<>
                <SectionTitle title={"Directories"}/>
                <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                    {directories && directories.map((directory) => (<Col key={directory.id}>
                        <Directory id={directory.id} dirName={directory.name}/>
                    </Col>))}
                </Row>
            </>

        )}
    </>)

});

export default ShowDirectories;