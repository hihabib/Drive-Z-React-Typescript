import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Auth } from "../model.ts";
import useStructure from "./useStructure.ts";
import { StructureActionType } from "../constants/structure.ts";
import { StructureDirectory } from "../@types/api";
import { domain } from "../../server.ts";

const token = localStorage.getItem(Auth.TOKEN) as string;
const useGeneralContextMenu = () => {
    const location = useLocation();
    const { dispatch } = useStructure();

    // New Directory Modal state
    const [isCreateDirectoryModalVisible, setIsCreateDirectoryModalVisible] =
        useState(false);

    // Hide Create New Directory modal function
    const hideNewDirectoryModal = () => {
        setIsCreateDirectoryModalVisible(false);
    };

    // Show Create New Directory modal function
    const showNewDirectoryModal = () => {
        setIsCreateDirectoryModalVisible(true);
    };

    // Create new directory form handle by formik
    const {
        handleSubmit: handleCreateDirectorySubmission,
        getFieldProps: getCreateDirectoryProps,
    } = useFormik({
        initialValues: {
            create_new_directory: "untitled directory",
        },
        onSubmit: (values) => {
            (async () => {
                // call directory creation API
                const { create_new_directory: newDirectoryName } = values;
                const response = await axios.get(
                    `${domain}/api/v1/structures/create-directory${
                        location.pathname === "/" ? "" : location.pathname
                    }/${newDirectoryName}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (response.status === 201) {
                    // Add created directory in state
                    dispatch({
                        type: StructureActionType.addDirectories,
                        payload: [
                            {
                                id: response.data?.id,
                                directoryName: newDirectoryName,
                            },
                        ] as StructureDirectory[],
                    });
                    // set empty directory status to false in state
                    dispatch({
                        type: StructureActionType.setDirectoryEmptyStatus,
                        payload: { directories: false },
                    });
                }
            })()
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    // Finally hide directory modal
                    hideNewDirectoryModal();
                });
        },
    });
    return {
        hideNewDirectoryModal,
        showNewDirectoryModal,
        isCreateDirectoryModalVisible,
        handleCreateDirectorySubmission,
        getCreateDirectoryProps,
    };
};

export default useGeneralContextMenu;
