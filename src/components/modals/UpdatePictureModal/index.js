import CustomButton from "components/CustomButton";
import LabeledInput from "components/LabeledInput";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { getImageFileValidators } from "pages/MyProfile/validators";

export default function UpdatePictureModal({
  show,
  isLoading,
  onSubmit = () => {},
  onClose = () => {}
}) {
  const [profilePicture, setProfilePicture] = useState();

  return (
    <Modal show={show} data-testid="update-picture-modal">
      <Modal.Header>
        <Modal.Title data-testid="modal-title">
          Update profile picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LabeledInput
          controlId="imageFileInput"
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              setProfilePicture(event.target.files[0]);
            }
          }}
          validators={getImageFileValidators()}
          testId="update-file-input"
        />
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          variant="secondary"
          onClick={onClose}
          testId="cancel-button">
          Cancel
        </CustomButton>
        <Form
          encType="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(profilePicture);
          }}>
          <CustomButton
            variant="success"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            testId="update-button">
            Update
          </CustomButton>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}

UpdatePictureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
};
