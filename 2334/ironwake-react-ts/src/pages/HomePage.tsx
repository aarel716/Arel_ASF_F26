import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import airshipPhoto from "../assets/images/Ironwake docked.png";
import diningPhoto from "../assets/images/Dining Area.png";

const HomePage = () => {
    return (
        <main className="container page-content">

            <section
                className="home-intro"
                aria-labelledby="restaurant-name"
            >
                <h1 id="restaurant-name">
                    The Ironwake Galley
                </h1>

                <p className="tagline">
                    A hot meal above Brasshaven.
                </p>

                <img
                    className="airship-photo"
                    src={airshipPhoto}
                    alt="Ironwake Galley docked above Brasshaven"
                />

                <p>
                    Our restaurant is inside an old cargo airship
                    at North Tower, Dock 07.
                </p>
            </section>

            <section
                className="welcome"
                aria-labelledby="welcome-heading"
            >
                <h2 id="welcome-heading">Welcome aboard!</h2>

                <img
                    className="welcome-photo"
                    src={diningPhoto}
                    alt="A host welcomes guests into the main dining area"
                />

                <p>
                    Captain Mabel Wrench turned her old airship
                    into a place for crews and travelers to eat.
                </p>

                <p>
                    The kitchen uses steam-powered cookers.
                    We serve beef, chicken, noodles, and a few
                    vegetarian meals. You can sit by a window
                    or choose a booth near the kitchen.
                </p>

                <p>
                    The ship stays docked during service,
                    so you do not need a flight ticket.
                </p>

                <p>
                    <Link to="/menu">See our menu</Link>
                    {" or "}
                    <Link to="/reservations">request a table</Link>.
                </p>
            </section>

            <aside aria-labelledby="hours-heading">
                <Card className="info-card">
                    <h2 id="hours-heading">Hours and location</h2>

                    <p>
                        <strong>Breakfast &; Lunch:</strong>
                        {" "}7 a.m.–1 p.m.
                    </p>

                    <p>
                        <strong>Dinner:</strong>
                        {" "}4–10 p.m.
                    </p>

                    <p>
                        <strong>Closed between services:</strong>
                        {" "}1–4 p.m.
                    </p>

                    <p>
                        <strong>Find us:</strong>
                        {" "}North Tower, Dock 07, Brasshaven.
                    </p>

                    <p>
                        Take the passenger lift to the dock.
                        Tables seat 1–8 guests.
                    </p>
                </Card>
            </aside>

        </main>
    );
};

export default HomePage;