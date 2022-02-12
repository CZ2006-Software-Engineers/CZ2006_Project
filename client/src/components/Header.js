import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import LoginModal from "./LoginModal";
import { useUser } from "../contexts/UserContext";
import { BiUserCircle } from "react-icons/bi";
import axios from "../axios";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";
import FilterForm from "./FilterForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header() {
  const { currentUser, setCurrentUser } = useUser();
  const location = useLocation();

  const logout = async () => {
    try {
      await axios.get("/api/logout", { withCredentials: true });
      setCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar className="header px-3" bg="primary" expand="sm">
      <Container fluid>
        <Row className="w-100">
          <Col md="auto" className="d-flex align-items-center">
            <Navbar.Brand href="/">
              <img
                src="/rentsg.png"
                style={{ objectFit: "contain", width: "100%", height: "30px" }}
                alt=""
              />
            </Navbar.Brand>
          </Col>
          <Col>{location.pathname !== "/" && <FilterForm />}</Col>
          <Col md="auto" className="d-flex align-items-center">
            <Navbar.Toggle className="mt-2" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                {currentUser && (
                  <Nav.Link as={Link} to="/create-listing">
                    New Listing
                  </Nav.Link>
                )}
                <NavDropdown
                  flip="true"
                  align="end"
                  title={<BiUserCircle size={"1.5em"} />}
                  id="basic-nav-dropdown"
                >
                  {currentUser ? (
                    <NavDropdown.Item href="#action/3.1">
                      Signed in as: {currentUser.email.split("@")[0]}
                    </NavDropdown.Item>
                  ) : (
                    <LoginModal />
                  )}
                  {currentUser && (
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  )}
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
