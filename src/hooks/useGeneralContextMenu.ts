import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Auth } from "../model.ts";
import { domain } from "../../server.ts";
import { structureSignal } from "../signals";
import { isError } from "../utils/errorUtils.ts";
import { showToast } from "../components/TinyToast/TinyToast.tsx";
import { useLocation } from "react-router-dom";

const token = localStorage.getItem(Auth.TOKEN) as string;
const useGeneralContextMenu = () => {
  const location = useLocation();
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
          `${domain}/api/v1/tree/createDirectory${location.pathname}/${newDirectoryName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 201) {
          // Add created directory in state
          if (
            structureSignal.value !== null &&
            !isError(structureSignal.value)
          ) {
            structureSignal.value = {
              ...structureSignal.value,
              Directory: [...structureSignal.value.Directory, response.data],
            };
            showToast(true, "Directory is created successfully");
          }
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
