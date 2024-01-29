import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import ShowDirectories from "../../components/ShowDirectories/ShowDirectories.tsx";
import EmptyDirectory from "../../components/EmptyDirectory/EmptyDirectory.tsx";
import ShowFiles from "../../components/ShowFiles/ShowFiles.tsx";
import GeneralContextMenu from "../../components/GeneralContextMenu/GeneralContextMenu.tsx";
import { useContextMenu } from "react-contexify";
import { MouseEvent, useEffect, useState } from "react";
import { isError } from "../../utils/errorUtils.ts";
import { structureSignal } from "../../signals";
import { isEmptyObj } from "../../utils/objectUtils.ts";
import { effect } from "@preact/signals-react";
import { Spinner } from "react-bootstrap";

const Structure = () => {
  const [structure, setStructure] = useState(structureSignal.value);

  const { show } = useContextMenu({
    id: "GeneralContextMenu",
  });

  const displayGeneralContextMenu = (event: MouseEvent<HTMLElement>) => {
    show({ event });
  };
  useEffect(() => {
    effect(() => {
      setStructure(structureSignal.value);
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {isError(structure) ? (
        "Page Not Found"
      ) : structure === null ? (
        <div className={"py-5"}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <PageTitle>My Drive</PageTitle>
          {isEmptyObj(structure.File) && isEmptyObj(structure.Directory) ? (
            <EmptyDirectory />
          ) : (
            <div className={"w-100"} onContextMenu={displayGeneralContextMenu}>
              <ShowDirectories
                directories={structure.Directory}
                isEmptyDirectory={isEmptyObj(structure.Directory)}
              />
              <ShowFiles
                files={structure.File}
                isEmptyFile={isEmptyObj(structure.File)}
              />
              <GeneralContextMenu id={"GeneralContextMenu"} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Structure;
