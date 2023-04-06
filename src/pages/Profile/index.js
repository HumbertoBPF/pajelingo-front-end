import AccountDetails from "components/AccountDetails";
import CustomizedButton from "components/CustomizedButton";
import LabeledInput from "components/LabeledInput";
import SelectLanguage from "components/SelectLanguage";
import UserScores from "components/UserScores";
import Login from "pages/Login";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchLanguages } from "services/languages";
import { fetchUser } from "services/user";
import { deleteUser } from "store/reducers/user";
import { getImageFileValidators } from "./validators";
import HeartIcon from "components/HeartIcon";

export default function Profile() {
    const user = useSelector(store => store.user);
    const languages = useSelector(store => store.languages);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scores, setScores] = useState([]);
    const [profilePicture, setProfilePicture] = useState();
    const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

    useEffect(() => {
        if (user){
            const defaultLanguage = (languages.length > 0)?languages[0].language_name:null;
            fetch(`${baseUrl}/scores/?language=${defaultLanguage}&user=${user.username}`)
                            .then((response) => response.json())
                            .then((data) => setScores(data));
        }
    }, [user, languages]);

    if (!user) {
        return (<Login/>);
    }

    return (
        <>
            <section className="row">
                <div className="col-12 col-md-5 col-lg-3">
                    {(user.picture)?
                    <img id="profilePicture" src={`data:image/jpeg;base64,${user.picture}`} className="img-fluid rounded" alt="User profile"/>:
                    <img id="defaultPicture" src="/images/profile.jpg" className="img-fluid rounded" alt="User profile"/>}
                    <div className="text-center mt-2">

                        <CustomizedButton variant="info" onClick={() => setShowProfilePictureModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                            </svg> <span>Update picture</span>
                        </CustomizedButton>

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
                                <CustomizedButton variant="secondary" onClick={() => setShowProfilePictureModal(false)}>Cancel</CustomizedButton>
                                <Form encType="multipart/form-data" onSubmit={
                                    (event) => {
                                        event.preventDefault();

                                        const formData = new FormData();
                                        formData.append("picture", profilePicture);

                                        fetch(`${baseUrl}/user/picture`, {
                                            method:"PUT",
                                            headers: {
                                                "Authorization": `Token ${user.token}`
                                            },
                                            body: formData
                                        }).then((response) => window.location.reload());
                                    }
                                }>
                                    <CustomizedButton variant="success" type="submit">Update</CustomizedButton>
                                </Form>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="col-12 col-md-7 col-lg-9 mt-4">
                    <AccountDetails user={user}/>
                    <section>
                        <CustomizedButton variant="info" onClick={() => navigate("/update-account")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                            </svg> <span>Edit account</span>
                        </CustomizedButton>
                        <br/>
                        <CustomizedButton className="mt-4" variant="danger" onClick={() => setShowDeleteAccountModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                            </svg> <span>Delete account</span>
                        </CustomizedButton>
                        <br/>
                        <CustomizedButton className="mt-4" variant="info" onClick={() => navigate("/profile/favorite-words")}>
                            <HeartIcon fill/> <span>Favorite words</span>
                        </CustomizedButton>

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
                                <CustomizedButton variant="secondary" onClick={() => setShowDeleteAccountModal(false)}>Cancel</CustomizedButton>
                                <CustomizedButton variant="danger" onClick={
                                    (event) => {
                                        fetch(`${baseUrl}/user`, {
                                            method: "DELETE",
                                            headers: {
                                                "Authorization": `Token ${user.token}`
                                            }
                                        })
                                        .then((response) => {
                                            dispatch(deleteUser());
                                            window.location.reload();
                                        });
                                    }
                                }>Yes, I want to delete my profile</CustomizedButton>
                            </Modal.Footer>
                        </Modal>
                    </section>
                </div>
            </section>
            <section>
                <h5 className="my-4">Your performance in our games:</h5>
                <SelectLanguage items={languages} onClick={(target) => {
                    fetch(`${baseUrl}/scores/?language=${target.value}&user=${user.username}`)
                        .then((response) => response.json())
                        .then((data) => setScores(data));
                }}/>
                <UserScores scores={scores}/>
            </section>
        </>
    );
}