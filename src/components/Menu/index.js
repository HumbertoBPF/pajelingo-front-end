import { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { fetchUser } from "services/user";
import { deleteUser } from "store/reducers/user";
import styles from "./Menu.module.css"

export default function Menu() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <header className={styles["customized-menu"]}>
            <Navbar className="mb-4" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/dashboard">
                        <img src="/images/brand.png" alt="Pajelingo logo" height="48"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/search" className={`${styles["nav-link"]}`}>Search tool</Nav.Link>
                            <NavDropdown title="Games" id="basic-nav-dropdown" className={`${styles["nav-link"]}`}>
                                <NavDropdown.Item href="/vocabulary-game/setup">Vocabulary training</NavDropdown.Item>
                                <NavDropdown.Item href="/article-game/setup">Guess the article</NavDropdown.Item>
                                <NavDropdown.Item href="/conjugation-game/setup">Conjugation game</NavDropdown.Item>
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