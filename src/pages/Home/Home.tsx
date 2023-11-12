import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import useStructure from "../../context/StructureContext/useStructure.tsx";
import {useEffect} from "react";
import axios from "axios";
import {StructureActionType} from "../../reducers/structureReducer.ts";
import ShowFolders from "../../components/ShowFolders/ShowFoldersProps.tsx";
import ShowFiles from "../../components/ShowFiles/ShowFiles.tsx";
import {Auth} from "../../model.ts";

const Home = () => {
    const token = localStorage.getItem(Auth.TOKEN) as string;
    const {structures: {folders, files}, dispatch} = useStructure();
    useEffect(() => {
        (async () => {
            const {data: folders} = await axios.get(`http://localhost:8080/api/v1/structures/get-folders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({type: StructureActionType.setFolders, payload: folders})

            const {data: files} = await axios.get(`http://localhost:8080/api/v1/structures/get-files`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({type: StructureActionType.setFiles, payload: files})
        })()
        console.log("dispatch or token changed")
    }, [dispatch, token]);
    return (<div>
        <PageTitle>My Drive</PageTitle>
        <ShowFolders folders={folders}/>
        <ShowFiles files={files}/>
    </div>);
};

export default Home;