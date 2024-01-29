import { Toast } from "react-bootstrap";
import { createPortal } from "react-dom";
import { effect, signal } from "@preact/signals-react";
import { useEffect, useState } from "react";

const toast = signal(false);
const message = signal("");
export const showToast = (state: boolean, newMessage: string = "") => {
  message.value = newMessage;
  toast.value = state;

  // hide toast after some time
  setTimeout(() => {
    toast.value = false;
  }, 3000);
};
const TinyToast = () => {
  const [, setReLoad] = useState({});
  useEffect(() => {
    effect(() => {
      setReLoad({});
      return toast.value;
    });
  }, []);
  return createPortal(
    <>
      {toast.value ? (
        <Toast
          onClose={() => {
            toast.value = false;
          }}
          className={
            "d-flex flex-row-reverse justify-content-between position-fixed bottom-0 end-0 me-3 mb-3 px-3 bg-dark text-light py-2"
          }
        >
          <Toast.Header data-bs-theme="dark" className={"border-0  bg-dark"} />
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      ) : (
        ""
      )}
    </>,
    document.getElementById("toast") as HTMLElement,
  );
};

export default TinyToast;
