import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { createPortal } from "react-dom";
import { userSignal } from "../../signals";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { effect, signal } from "@preact/signals-react";
import { showToast } from "../TinyToast/TinyToast.tsx";

const modal = signal(false);
const copyLink = signal("");

export const showModal = (status: boolean, link: string) => {
  modal.value = status;
  copyLink.value = link;
};
const ShareWith = () => {
  const [link, setLink] = useState({
    value: "",
  });
  const [people, setPeople] = useState([
    {
      email: userSignal.value?.email,
      picture: "http://placehold.co/40x40",
      role: "owner",
    },
  ]);

  useEffect(() => {
    effect(() => {
      setLink({
        value: copyLink.value,
      });
      return modal.value;
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, formikHelpers) => {
      setPeople((prevState) => {
        return [
          ...prevState,
          {
            email: values.email,
            picture: "http://placehold.co/40x40",
            role: "public",
          },
        ];
      });
      formikHelpers.resetForm();
    },
  });

  //close modal
  const closeModal = () => {
    modal.value = false;
  };

  return createPortal(
    <div>
      <Modal
        onHide={closeModal}
        show={modal.value}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={"border-0"}>
          <Modal.Title id="contained-modal-title-vcenter">Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} className={"mb-4"}>
            <FormControl
              id={"email"}
              placeholder={"Add people, group and calendar events"}
              className={"w-100 py-3"}
              {...formik.getFieldProps("email")}
            />
          </Form>
          <h5>People with access</h5>
          <ul className={"list-group list-group-flush gap-1"}>
            {people.map((person, index) => {
              return (
                <li
                  key={`id-${index}-${person.email}`}
                  className={"list-group-item border-0"}
                >
                  <div
                    className={"d-flex gap-3 align-items-center text-secondary"}
                  >
                    <div>
                      <img
                        src={person.picture}
                        alt={person.email}
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      {person.email} ({person.role})
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <div className={"w-100 d-flex justify-content-between"}>
            <Button
              variant={"outline-primary"}
              onClick={async () => {
                await window.navigator.clipboard.writeText(link.value);
                showToast(true, "Link is copied successfully");
              }}
            >
              Copy link
            </Button>
            <Button onClick={closeModal}>Done</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>,
    document.getElementById("modal") as HTMLElement,
  );
};

export default ShareWith;
