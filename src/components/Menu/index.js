import { useEffect } from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "services/user";
import { deleteUser } from "store/reducers/user";
import styles from "./Menu.module.css"
import { fetchGames } from "services/games";

export default function Menu() {
    const user = useSelector(state => state.user);
    const games = useSelector(state => state.games);
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg> <span>Profile</span></Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => dispatch(deleteUser())}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                    </svg> <span>Logout</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>:
                        <div className={`${styles["account-options"]}`}>
                            <Link className="btn btn-success" to="/signup" role="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                </svg> <span>Sign up</span>
                            </Link>
                            <Link className="btn btn-primary ms-2" to="/login" role="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg> <span>Sign in</span>
                            </Link>
                        </div>
                    }
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/search" className={`${styles["nav-link"]}`}>Search tool</Nav.Link>
                            <NavDropdown title="Games" id="basic-nav-dropdown" className={`${styles["nav-link"]}`}>
                                {Object.values(games).map(game => 
                                    <NavDropdown.Item key={game.game_name} href={`${game.link}setup`}>{game.game_name}</NavDropdown.Item>
                                )}
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