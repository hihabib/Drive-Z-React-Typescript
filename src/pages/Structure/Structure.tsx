import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import ShowDirectories from "../../components/ShowDirectories/ShowDirectories.tsx";
import EmptyFolder from "../../components/EmptyFolder/EmptyFolder.tsx";
import useStructure from "../../hooks/useStructure.ts";
import ShowFiles from "../../components/ShowFiles/ShowFiles.tsx";

const Structure = () => {
    const {isEmpty, isDirNotFound}= useStructure();

    return (<div>
        {isDirNotFound ? "Page Not Found" : (
            <>

        <PageTitle>My Drive</PageTitle>
                {isEmpty.files && isEmpty.folders ? <EmptyFolder/> : (<>
                    <ShowDirectories/>
                    <ShowFiles/>
                </>)}
            </>
        )}
    </div>);
};

export default Structure;