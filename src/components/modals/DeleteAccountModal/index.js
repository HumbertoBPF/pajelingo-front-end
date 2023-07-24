import CustomButton from "components/CustomButton";
import LabeledInput from "components/LabeledInput";
import { getConfirmDeletionInputValidation } from "pages/MyProfile/validators";
import { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

export default function DeleteAccountModal({
  show,
  isLoading,
  onSubmit = () => {},
  onClose = () => {}
}) {
  const [confirmDeletionText, setConfirmDeletionText] = useState(false);

  return (
    <Modal show={show} data-testid="delete-account-modal">
      <Modal.Header>
        <Modal.Title data-testid="modal-title">Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LabeledInput
          controlId="confirmDeletionInput"
          type="text"
          labelPosition="up"
          label={
            'Write "permanently delete" to confirm. Notice that personal data such as game scores will be permanently lost!'
          }
          placeholder="permanently delete"
          onChange={(event) => setConfirmDeletionText(event.target.value)}
          testId="confirm-delete-input"
          validators={getConfirmDeletionInputValidation()}
        />
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          variant="secondary"
          onClick={onClose}
          testId="cancel-button">
          Cancel
        </CustomButton>
        <CustomButton
          variant="danger"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={() => onSubmit(confirmDeletionText)}
          testId="delete-button">
          Yes, I want to delete my profile
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
}

DeleteAccountModal.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
};
