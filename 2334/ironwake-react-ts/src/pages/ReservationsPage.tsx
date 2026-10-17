import { Card } from "reactstrap";
import ReservationForm from "../components/ReservationForm";

const ReservationsPage = () => {
    return (
        <main id="main-content" className="container page-content">
            <section
                className="page-heading text-center"
                aria-labelledby="reservations-heading"
            >
                <h1 id="reservations-heading">
                    Reservations
                </h1>

                <p className="tagline">
                    Your table aboard the Ironwake awaits.
                </p>

                <p>
                    Request a table using the form below.
                    A reservation request is not a confirmed booking.
                </p>
            </section>

            <section
                className="reservation-layout"
                aria-labelledby="reservation-hours-heading"
            >
                <Card className="info-card reservation-card">
                    <h2 id="reservation-hours-heading">
                        Reservation Hours
                    </h2>

                    <p>
                        <strong>Breakfast &; Lunch:</strong>
                        {" "}7 a.m.–noon
                    </p>

                    <p>
                        <strong>Dinner:</strong>
                        {" "}4–9 p.m.
                    </p>

                    <p className="field-help">
                        The restaurant closes between 1 and 4 p.m.
                        Reservations are available every 15 minutes,
                        with the last arrival one hour before closing.
                    </p>
                </Card>
            </section>

            <ReservationForm />
        </main>
    );
};

export default ReservationsPage;