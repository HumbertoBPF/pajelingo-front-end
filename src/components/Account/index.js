import AccountDetails from "components/AccountDetails";
import CustomButton from "components/CustomButton";
import HeartIcon from "components/icons/HeartIcon";
import LabeledInput from "components/LabeledInput";
import Notification from "components/Notification";
import UpdateUserIcon from "components/icons/UpdateUserIcon";
import SelectLanguage from "components/SelectLanguage";
import UserScores from "components/UserScores";
import { getImageFileValidators } from "pages/MyProfile/validators";
import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Modal, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchLanguages } from "services/languages";
import { deleteUser } from "store/reducers/user";
import DeleteUserIcon from "components/icons/DeleteUserIcon";
import UserPictureIcon from "components/icons/UserPictureIcon";
import BadgeIcon from "components/icons/BadgeIcon";
import TropheeIcon from "components/icons/TropheeIcon";
import NotificationContainer from "components/NotificationContainer";

export default function Account({ user }) {
    const languages = useSelector(store => store.languages);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scores, setScores] = useState([]);
    const [profilePicture, setProfilePicture] = useState();
    const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            const defaultLanguage = (languages.length > 0)?languages[0].language_name:null;
            fetch(`${baseUrl}/scores/?language=${defaultLanguage}&user=${user.username}`)
            .then((response) => response.json())
            .then((data) => setScores(data));
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
                />
            );                
        }

        return (
            <img
                id="defaultPicture"
                src="/images/profile.png"
                className="img-fluid rounded"
                alt="User profile"
            />
        );
    }

    function updateProfilePicture() {
        setIsUpdatingProfilePicture(true);
    
        const formData = new FormData();
        formData.append("picture", profilePicture);

        fetch(`${baseUrl}/user/picture`, {
            method:"PUT",
            headers: {
                "Authorization": `Token ${user.token}`
            },
            body: formData
        }).then((response) => {
            if (response.ok) {
                setShowToast(false);
                setIsUpdatingProfilePicture(false);
                window.location.reload();
                return;
            }

            throw Error();
        }).catch(() => {
            setShowToast(true);
            setIsUpdatingProfilePicture(false);
        });
    }

    function renderUpdatePictureSection() {
        if (user.token) {
            return (
                <div className="text-center mt-2">
                    <CustomButton variant="info" onClick={() => setShowProfilePictureModal(true)}>
                        <UserPictureIcon /> <span>Update picture</span>
                    </CustomButton>
                    <Modal show={showProfilePictureModal}>
                        <Modal.Header>
                            <Modal.Title>
                                Update profile picture
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <LabeledInput controlId="imageFileInput" type="file" onChange={(event) => {
                                if (event.target.files) {
                                    setProfilePicture(event.target.files[0]);
                                }
                            }} validators={getImageFileValidators()}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <CustomButton variant="secondary" onClick={() => setShowProfilePictureModal(false)}>Cancel</CustomButton>
                            <Form encType="multipart/form-data" onSubmit={
                                (event) => {
                                    event.preventDefault();
                                    updateProfilePicture();
                                }
                            }>
                                <CustomButton 
                                    variant="success" 
                                    type="submit" 
                                    isLoading={isUpdatingProfilePicture}
                                    disabled={isUpdatingProfilePicture}>Update</CustomButton>
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

        fetch(`${baseUrl}/user`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${user.token}`
            }
        }).then((response) => {
            if (response.ok) {
                setIsDeletingAccount(false);
                setShowToast(false);
                dispatch(deleteUser);
                window.location.reload();
                return;
            }

            throw Error();
        }).catch(() => {
            setIsDeletingAccount(false);
            setShowToast(true);
        });
    }

    function renderDeleteAccountSection() {
        if (user.token) {
            return (
                <>
                    <Modal show={showDeleteAccountModal}>
                        <Modal.Header>
                            <Modal.Title>
                                Are you sure?
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure that you want to delete your profile? All information such as scores in the games is going to be permanently lost!
                        </Modal.Body>
                        <Modal.Footer>
                            <CustomButton 
                                variant="secondary" 
                                onClick={() => setShowDeleteAccountModal(false)}>Cancel</CustomButton>
                            <CustomButton 
                                variant="danger" 
                                isLoading={isDeletingAccount} 
                                disabled={isDeletingAccount} 
                                onClick={deleteAccount}
                            >
                                Yes, I want to delete my profile
                            </CustomButton>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }

        return null;
    }

    function getPopover(badge) {
        return (
            <Popover id="popover-basic">
                <Popover.Header as="h3">{badge.name}</Popover.Header>
                <Popover.Body>{badge.description}</Popover.Body>
            </Popover>
        );
    }

    return (
        <>
            <Row>
                {
                    user.token?
                    <Col className="mb-4" md={4} lg={3}>
                        <ListGroup>
                            <ListGroup.Item action onClick={() => navigate("/update-account")}>
                                <UpdateUserIcon /> <span>Edit account</span>
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={() => setShowDeleteAccountModal(true)}>
                                <DeleteUserIcon /> <span>Delete account</span>
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={() => navigate("/profile/favorite-words")}>
                                <HeartIcon fill/> <span>Favorite words</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>:
                    null
                }
                <Col md={user.token?8:12} lg={user.token?9:12}>
                    <Row>
                        <Col md={5} lg={3}>
                            {renderProfilePicture()}
                            {renderUpdatePictureSection()}
                        </Col>
                        <Col md={7} lg={9} className="mt-4">
                            <AccountDetails user={user}/>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <h5 className="mb-2"><BadgeIcon/> Your badges:</h5> 
                        <Col>
                            {user.badges?
                            user.badges.map(
                                (badge) =>  <OverlayTrigger
                                                key={badge.name}
                                                placement="top"
                                                overlay={getPopover(badge)}>
                                                <Button style={{
                                                    backgroundColor: `#${badge.color}`,
                                                    borderColor: `#${badge.color}`
                                                }} className="mt-2 ms-2">
                                                    <img
                                                        src={`data:image/jpeg;base64,${badge.image}`}
                                                        alt={badge.name}
                                                    />
                                                    <span> {badge.name}</span>
                                                </Button>
                                            </OverlayTrigger>
                            ):
                            null}
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <h5 className="mb-4"><TropheeIcon/> Your performance in our games:</h5>
                            <SelectLanguage items={languages} onClick={(target) => {
                                fetch(`${baseUrl}/scores/?language=${target.value}&user=${user.username}`)
                                .then((response) => response.json())
                                .then((data) => setScores(data));
                            }}/>
                            <UserScores scores={scores}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {renderDeleteAccountSection()}
            <NotificationContainer>
                <Notification 
                    show={showToast} 
                    variant="danger"
                    title="Error"
                    message="An error occurred when processing the request. Please try again." 
                    onClose={() => setShowToast(false)}/>
            </NotificationContainer>
        </>
    );
}