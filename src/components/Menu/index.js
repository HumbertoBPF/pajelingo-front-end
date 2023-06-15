import { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "services/user";
import styles from "./Menu.module.css";
import { fetchGames } from "services/games";
import AccountMenu from "components/AccountMenu";

export default function Menu() {
  const user = useSelector((state) => state.user);
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
            <img src="/images/brand.png" alt="Pajelingo logo" height="48" />
          </Navbar.Brand>
          <AccountMenu user={user} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="Search"
                className={`${styles["nav-link"]} text-center`}>
                <NavDropdown.Item href="/dictionary">
                  Dictionary
                </NavDropdown.Item>
                <NavDropdown.Item href="/accounts">Account</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Games"
                className={`${styles["nav-link"]} text-center`}>
                <NavDropdown.Item href="/games">Play</NavDropdown.Item>
                <NavDropdown.Item href="/rankings">Rankings</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href="/about-us"
                className={`${styles["nav-link"]} text-center`}>
                About us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
