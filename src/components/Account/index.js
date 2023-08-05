import AccountDetails from "components/AccountDetails";
import CustomButton from "components/CustomButton";
import HeartIcon from "components/icons/HeartIcon";
import Notification from "components/Notification";
import UpdateUserIcon from "components/icons/UpdateUserIcon";
import SelectLanguage from "components/SelectLanguage";
import UserScores from "components/UserScores";
import { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";
import { deleteUser } from "store/reducers/user";
import DeleteUserIcon from "components/icons/DeleteUserIcon";
import UserPictureIcon from "components/icons/UserPictureIcon";
import BadgeIcon from "components/icons/BadgeIcon";
import TropheeIcon from "components/icons/TropheeIcon";
import NotificationContainer from "components/NotificationContainer";
import {
  errorDeletionConfirmationText,
  genericErrorMessage
} from "validators/validators";
import PropTypes from "prop-types";
import { updateUserPicture, deleteUser as deleteUserApi } from "api/user";
import Badge from "components/Badge";
import { getUserScores } from "api/scores";
import UpdatePictureModal from "components/modals/UpdatePictureModal";
import DeleteAccountModal from "components/modals/DeleteAccountModal";

export default function Account({ user }) {
  const languages = useSelector((store) => store.languages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scores, setScores] = useState([]);

  const [toastMessage, setToastMessage] = useState("");

  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] =
    useState(false);

  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

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

  const renderProfilePicture = () => {
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
  };

  const updateProfilePicture = (profilePicture) => {
    setIsUpdatingProfilePicture(true);

    const formData = new FormData();
    formData.append("picture", profilePicture);

    updateUserPicture(
      user.token,
      formData,
      () => {
        setIsUpdatingProfilePicture(false);
        navigate(0);
      },
      () => {
        setToastMessage(genericErrorMessage);
        setIsUpdatingProfilePicture(false);
      }
    );
  };

  const deleteAccount = (confirmDeletionText) => {
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
        dispatch(deleteUser);
        navigate(0);
      },
      () => {
        setIsDeletingAccount(false);
        setToastMessage(genericErrorMessage);
      }
    );
  };

  const renderUpdatePictureSection = () => {
    if (user.token) {
      return (
        <div className="text-center mt-2">
          <CustomButton
            variant="info"
            onClick={() => setShowProfilePictureModal(true)}
            testId="update-picture-button">
            <UserPictureIcon /> <span>Update picture</span>
          </CustomButton>
          <UpdatePictureModal
            show={showProfilePictureModal}
            isLoading={isUpdatingProfilePicture}
            onSubmit={updateProfilePicture}
            onClose={() => setShowProfilePictureModal(false)}
          />
        </div>
      );
    }

    return null;
  };

  const renderDeleteAccountSection = () => {
    if (user.token) {
      return (
        <DeleteAccountModal
          show={showDeleteAccountModal}
          isLoading={isDeletingAccount}
          onSubmit={deleteAccount}
          onClose={() => setShowDeleteAccountModal(false)}
        />
      );
    }

    return null;
  };

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
                onChange={(target) => {
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
          testId="error-toast"
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
