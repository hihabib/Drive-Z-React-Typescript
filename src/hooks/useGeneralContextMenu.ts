import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Auth } from "../model.ts";
import useStructure from "./useStructure.ts";
import { StructureActionType } from "../constants/structure.ts";
import { StructureDirectory } from "../@types/api";

const token = localStorage.getItem(Auth.TOKEN) as string;
const useGeneralContextMenu = () => {
    const location = useLocation();
    const { dispatch } = useStructure();
    // New Directory
    const [isCreateDirectoryModalVisible, setIsCreateDirectoryModalVisible] =
        useState(false);
    const hideNewDirectoryModal = () => {
        setIsCreateDirectoryModalVisible(false);
    };
    const showNewDirectoryModal = () => {
        setIsCreateDirectoryModalVisible(true);
    };

    const {
        handleSubmit: handleCreateDirectorySubmission,
        getFieldProps: getCreateDirectoryProps,
    } = useFormik({
        initialValues: {
            create_new_directory: "untitled directory",
        },
        onSubmit: (values) => {
            (async () => {
                const { create_new_directory: newDirectoryName } = values;
                const response = await axios.get(
                    `http://localhost:8080/api/v1/structures/create-directory${location.pathname}/${newDirectoryName}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (response.status === 201) {
                    dispatch({
                        type: StructureActionType.addDirectories,
                        payload: [
                            {
                                id: newDirectoryName,
                                directoryName: newDirectoryName,
                            },
                        ] as StructureDirectory[],
                    });
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
