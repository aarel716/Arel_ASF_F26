import {Link} from "react-router-dom";
import {Card, CardBody, CardImg, CardTitle, CardText, Col, Row} from "reactstrap";
import captainPhoto from "../assets/images/crew/CPTMable.png";
import firstMatePhoto from "../assets/images/crew/First_Mate_Gideon.png";
import chefPhoto from "../assets/images/crew/Chef_Barnaby.png";
import stewardPhoto from "../assets/images/crew/Chief_Steward_Winston_Brasswell.png";

const crew = [
    {
        id: 1,
        name: "Captain Mabel Wrench",
        role: "Owner & Captain",
        image: captainPhoto,
        alt: "Captain Mabel Wrench in her airship uniform",
        paragraphs: [
            "After years of hauling cargo across the skies, Captain Mabel retired her airship and gave it a second life as the Ironwake Galley.",
            "She still runs a tight ship, making sure the crew has everything they need and every guest feels welcome aboard."
        ]
    },
    {
        id: 2,
        name: "First Mate Gideon Rivet",
        role: "Ship Operations & Maintenance",
        image: firstMatePhoto,
        alt: "First Mate Gideon Rivet in the ship's maintenance office with airship blueprints and tools",
        paragraphs: [
            "Gideon spent years keeping the Ironwake flying through rough weather and difficult cargo runs.",
            "These days, he maintains the ship's engines, steam systems, and electrical equipment, making sure the galley stays warm and everything runs smoothly.",
            "He insists the ship could still fly if Captain Mabel ever changed her mind."
        ]
    },
    {
        id: 3,
        name: "Chef Barnaby Copperpot",
        role: "Head Chef",
        image: chefPhoto,
        alt: "Chef Barnaby preparing food in the steam-powered kitchen",
        paragraphs: [
            "Barnaby believes a good meal can make even the longest voyage worthwhile.",
            "He runs the galley's steam-powered kitchen, preparing hearty dishes with a few creative twists."
        ]
    },
    {
        id: 4,
        name: "Chief Steward Winston Brasswell",
        role: "Guest Services",
        image: stewardPhoto,
        alt: "Chief Steward Winston Brasswell standing at the reception desk",
        paragraphs: [
            "Winston keeps the dining room running smoothly.",
            "From managing reservations to helping guests find the perfect table, he makes sure everyone receives a proper welcome."
        ]
    }
];

const AboutPage = () => {
    return (
        <main id="main-content" className="container page-content">
            <section
                className="text-center mb-5"
                aria-labelledby="crew-heading"
            >
                <h1 id="crew-heading">Meet the Crew</h1>

                <p className="tagline">
                    Every great airship needs a dependable crew.
                    Ours just happens to serve dinner.
                </p>
            </section>

            <Row
                tag="section"
                className="g-4 mb-5"
                aria-label="Our crew"
            >
                {crew.map((member) => (
                    <Col xs="12" md="6" key={member.id}>
                        <Card
                            tag="article"
                            className="info-card h-100 m-0"
                        >
                            <CardImg
                                top
                                src={member.image}
                                alt={member.alt}
                            />

                            <CardBody>
                                <CardTitle tag="h2">
                                    {member.name}
                                </CardTitle>

                                <p className="text-uppercase">
                                    {member.role}
                                </p>

                                {member.paragraphs.map((paragraph) => (
                                    <CardText key={paragraph}>
                                        {paragraph}
                                    </CardText>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <section
                className="welcome text-center"
                aria-labelledby="mission-heading"
            >
                <h2 id="mission-heading">Our Mission</h2>

                <p>
                    At the Ironwake Galley, we believe a good meal brings
                    people together. Whether you're a seasoned airship
                    captain or a traveler passing through Brasshaven,
                    there's always a place for you at our table.
                </p>

                <Link
                    to="/reservations"
                    className="btn btn-outline-light"
                >
                    Reserve Your Table
                </Link>
            </section>
        </main>
    );
};

export default AboutPage;