import { useEffect } from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "services/user";
import { deleteUser } from "store/reducers/user";
import styles from "./Menu.module.css"
import { fetchGames } from "services/games";
import UserIcon from "components/icons/UserIcon";
import LogoutIcon from "components/icons/LogoutIcon";
import SignUpIcon from "components/icons/SignUpIcon";
import SignInIcon from "components/icons/SignInIcon";

export default function Menu() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchGames());
    }, [dispatch]);

    return (
        <header className={styles["custom-menu"]}>
            <Navbar className="mb-4" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/dashboard">
                        <img src="/images/brand.png" alt="Pajelingo logo" height="48"/>
                    </Navbar.Brand>
                    {
                        (user)?
                        <Dropdown className={`${styles["account-options"]}`}>
                            <Dropdown.Toggle className={`btn btn-account-options ${styles["btn"]}`}>
                                {(user.picture)?
                                <img src={`data:image/jpeg;base64,${user.picture}`} className={`${styles["account-sm-img"]}`} alt="User profile" height="48"/>:
                                <img src="/images/profile.jpg" className={`${styles["account-sm-img"]}`} alt="User profile" height="48"/>}
                                <span> {user.username}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="dropdown-item" href="/profile">
                                    <UserIcon /> <span>Profile</span></Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => dispatch(deleteUser())}>
                                    <LogoutIcon /> <span>Logout</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>:
                        <div className={`${styles["account-options"]}`}>
                            <Link className="btn btn-success" to="/signup" role="button">
                                <SignUpIcon /> <span>Sign up</span>
                            </Link>
                            <Link className="btn btn-primary ms-2" to="/login" role="button">
                                <SignInIcon /> <span>Sign in</span>
                            </Link>
                        </div>
                    }
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Search" id="basic-nav-dropdown" className={`${styles["nav-link"]}`}>
                                <NavDropdown.Item href="/dictionary">Dictionary</NavDropdown.Item>
                                <NavDropdown.Item href="/accounts">Account</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Games" id="basic-nav-dropdown" className={`${styles["nav-link"]}`}>
                                <NavDropdown.Item href="/games">Play</NavDropdown.Item>
                                <NavDropdown.Item href="/rankings">Rankings</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about-us" className={`${styles["nav-link"]}`}>About us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}