import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import useStructure from "../../context/StructureContext/useStructure.tsx";
import {useEffect} from "react";
import axios from "axios";
import {StructureActionType} from "../../reducers/structureReducer.ts";
import ShowFolders from "../../components/ShowFolders/ShowFoldersProps.tsx";
import ShowFiles from "../../components/ShowFiles/ShowFiles.tsx";

const Home = () => {

    const {structures: {folders, files}, dispatch} = useStructure();
    useEffect(() => {
        (async () => {
            const {data: folders} = await axios.get("http://localhost:8080/api/v1/tree/folders-tree/habibulislam");
            dispatch({type: StructureActionType.setFolders, payload: folders})

            const {data: files} = await axios.get("http://localhost:8080/api/v1/tree/files-tree/habibulislam");
            dispatch({type: StructureActionType.setFiles, payload: files})
        })()
    }, []);
    return (<div>
        <PageTitle>My Drive</PageTitle>
        <ShowFolders folders={folders}/>
        <ShowFiles files={files}/>
    </div>);
};

export default Home;