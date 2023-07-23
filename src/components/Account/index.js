import AccountDetails from "components/AccountDetails";
import CustomButton from "components/CustomButton";
import HeartIcon from "components/icons/HeartIcon";
import LabeledInput from "components/LabeledInput";
import Notification from "components/Notification";
import UpdateUserIcon from "components/icons/UpdateUserIcon";
import SelectLanguage from "components/SelectLanguage";
import UserScores from "components/UserScores";
import {
  getConfirmDeletionInputValidation,
  getImageFileValidators
} from "pages/MyProfile/validators";
import { useEffect, useState } from "react";
import { Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";
import { deleteUser } from "store/reducers/user";
import DeleteUserIcon from "components/icons/DeleteUserIcon";
import UserPictureIcon from "components/icons/UserPictureIcon";
import BadgeIcon from "components/icons/BadgeIcon";
import TropheeIcon from "components/icons/TropheeIcon";
import NotificationContainer from "components/NotificationContainer";
import { errorDeletionConfirmationText } from "validators/validators";
import PropTypes from "prop-types";
import { getUserPicture, deleteUser as deleteUserApi } from "api/user";
import Badge from "components/Badge";
import { getUserScores } from "api/scores";

export default function Account({ user }) {
  const languages = useSelector((store) => store.languages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scores, setScores] = useState([]);

  const [toastMessage, setToastMessage] = useState("");

  const [profilePicture, setProfilePicture] = useState();
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] =
    useState(false);

  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [confirmDeletionText, setConfirmDeletionText] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const genericErrorMessage =
    "An error occurred when processing the request. Please try again.";

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const defaultLanguage =
        languages.length > 0 ? languages[0].language_name : null;
      getUserScores(defaultLanguage, user.username, (data) => setScores(data));
    }
  }, [user, languages]);

  function renderProfilePicture() {
    if (user.picture) {
      return (
        <img
          id="profilePicture"
          src={`data:image/jpeg;base64,${user.picture}`}
          className="img-fluid rounded"
          alt="User profile"
          data-testid="profile-picture"
        />
      );
    }

    return (
      <img
        id="defaultPicture"
        src="/images/profile.png"
        className="img-fluid rounded"
        alt="User profile"
        data-testid="default-picture"
      />
    );
  }

  function updateProfilePicture() {
    setIsUpdatingProfilePicture(true);

    const formData = new FormData();
    formData.append("picture", profilePicture);

    getUserPicture(
      user.token,
      formData,
      () => {
        setToastMessage(genericErrorMessage);
        setIsUpdatingProfilePicture(false);
        window.location.reload();
      },
      () => {
        setToastMessage(genericErrorMessage);
        setIsUpdatingProfilePicture(false);
      }
    );
  }

  function renderUpdatePictureSection() {
    if (user.token) {
      return (
        <div className="text-center mt-2">
          <CustomButton
            variant="info"
            onClick={() => setShowProfilePictureModal(true)}
            testId="update-picture-button">
            <UserPictureIcon /> <span>Update picture</span>
          </CustomButton>
          <Modal show={showProfilePictureModal}>
            <Modal.Header>
              <Modal.Title>Update profile picture</Modal.Title>
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
              />
            </Modal.Body>
            <Modal.Footer>
              <CustomButton
                variant="secondary"
                onClick={() => setShowProfilePictureModal(false)}>
                Cancel
              </CustomButton>
              <Form
                encType="multipart/form-data"
                onSubmit={(event) => {
                  event.preventDefault();
                  updateProfilePicture();
                }}>
                <CustomButton
                  variant="success"
                  type="submit"
                  isLoading={isUpdatingProfilePicture}
                  disabled={isUpdatingProfilePicture}>
                  Update
                </CustomButton>
              </Form>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }

    return null;
  }

  function deleteAccount() {
    setIsDeletingAccount(true);

    if (confirmDeletionText !== "permanently delete") {
      setIsDeletingAccount(false);
      setToastMessage(errorDeletionConfirmationText);
      return;
    }

    deleteUserApi(
      user.token,
      () => {
        setIsDeletingAccount(false);
        setToastMessage(genericErrorMessage);
        dispatch(deleteUser);
        window.location.reload();
      },
      () => {
        setIsDeletingAccount(false);
        setToastMessage(genericErrorMessage);
      }
    );
  }

  function renderDeleteAccountSection() {
    if (user.token) {
      return (
        <>
          <Modal show={showDeleteAccountModal}>
            <Modal.Header>
              <Modal.Title>Are you sure?</Modal.Title>
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
                validators={getConfirmDeletionInputValidation()}
              />
            </Modal.Body>
            <Modal.Footer>
              <CustomButton
                variant="secondary"
                onClick={() => setShowDeleteAccountModal(false)}>
                Cancel
              </CustomButton>
              <CustomButton
                variant="danger"
                isLoading={isDeletingAccount}
                disabled={isDeletingAccount}
                onClick={deleteAccount}>
                Yes, I want to delete my profile
              </CustomButton>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

    return null;
  }

  return (
    <>
      <Row>
        {user.token ? (
          <Col className="mb-4" md={4} lg={3} data-testid="lateral-menu">
            <ListGroup>
              <ListGroup.Item
                action
                onClick={() => navigate("/update-account")}
                data-testid="update-item">
                <UpdateUserIcon /> <span>Edit account</span>
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => setShowDeleteAccountModal(true)}
                data-testid="delete-item">
                <DeleteUserIcon /> <span>Delete account</span>
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => navigate("/profile/favorite-words")}
                data-testid="favorite-item">
                <HeartIcon fill /> <span>Favorite words</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        ) : null}
        <Col md={user.token ? 8 : 12} lg={user.token ? 9 : 12}>
          <Row>
            <Col md={5} lg={3}>
              {renderProfilePicture()}
              {renderUpdatePictureSection()}
            </Col>
            <Col md={7} lg={9} className="mt-4">
              <AccountDetails user={user} />
            </Col>
          </Row>
          <Row className="mt-4">
            <h5 className="mb-2" data-testid="badges-section-title">
              <BadgeIcon /> Badges:
            </h5>
            <Col data-testid="user-badges">
              {user.badges
                ? user.badges.map((badge) => (
                    <Badge
                      key={badge.id}
                      badge={badge}
                      testId={`badge-${badge.id}`}
                    />
                  ))
                : null}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5 className="mb-4" data-testid="score-section-title">
                <TropheeIcon /> Performance in our games:
              </h5>
              <SelectLanguage
                items={languages}
                testId="select-language"
                onClick={(target) => {
                  getUserScores(target.value, user.username, (data) =>
                    setScores(data)
                  );
                }}
              />
              <UserScores scores={scores} />
            </Col>
          </Row>
        </Col>
      </Row>
      {renderDeleteAccountSection()}
      <NotificationContainer>
        <Notification
          show={toastMessage !== ""}
          variant="danger"
          title="Error"
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      </NotificationContainer>
    </>
  );
}

Account.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    picture: PropTypes.string,
    token: PropTypes.string,
    badges: PropTypes.array
  }).isRequired
};
