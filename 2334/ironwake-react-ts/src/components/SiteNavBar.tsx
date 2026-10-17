import {useState} from "react";
import {NavLink, Link} from "react-router-dom";
import {Navbar, NavbarToggler, Collapse} from "reactstrap";

import logo from "../assets/images/logo.png";

type SiteNavBarProps = {
    cartCount: number;
};

const SiteNavBar = ({cartCount}: SiteNavBarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <Navbar
                dark
                expand="lg"
                container={false}
                className="site-header"
            >
                <div className="container">
                    <Link
                        className="navbar-brand brand"
                        to="/"
                        onClick={() => setIsOpen(false)}
                    >
                        <img src={logo} alt="Ironwake logo"/>
                        <span>The Ironwake Galley</span>
                    </Link>

                    <NavbarToggler
                        onClick={() => setIsOpen(!isOpen)}
                        aria-controls="mainNavbar"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    />

                    <Collapse isOpen={isOpen} navbar id="mainNavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    end
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/menu"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Menu
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/reservations"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Reservations
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/about"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/cart"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cart ({cartCount})
                                </NavLink>
                            </li>
                        </ul>
                    </Collapse>
                </div>
            </Navbar>
        </header>
    );
};

export default SiteNavBar;