import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Alert, Button, Col, Form, Row} from "reactstrap";
import SeatingPreview from "./SeatingPreview";
import seatingOptions from "../data/seatingOptions";

const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const timeOptions: { value: string; label: string }[] = [];

for (let minutes = 7 * 60; minutes <= 21 * 60; minutes += 15) {
    const morning = minutes <= 12 * 60;
    const dinner = minutes >= 16 * 60;

    if (morning || dinner) {
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;

        const value =
            `${String(hour).padStart(2, "0")}:` +
            String(minute).padStart(2, "0");

        const label =
            `${hour % 12 || 12}:` +
            `${String(minute).padStart(2, "0")} ` +
            (hour < 12 ? "a.m." : "p.m.");

        timeOptions.push({value, label});
    }
}

const reservationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Please enter your name.")
        .max(20, "Name must be 20 characters or fewer."),

    email: yup
        .string()
        .trim()
        .required("Please enter your email.")
        .email("Please enter a valid email address."),

    partySize: yup
        .string()
        .required("Please select a party size.")
        .oneOf(
            ["1", "2", "3", "4", "5", "6", "7", "8"],
            "Please select a party size between 1 and 8."
        ),

    date: yup
        .string()
        .required("Please select a date.")
        .test(
            "future-date",
            "Reservation date cannot be in the past.",
            (value) => !value || value >= getToday()
        ),

    time: yup
        .string()
        .required("Please select a time.")
        .oneOf(
            timeOptions.map((option) => option.value),
            "Please select an available reservation time."
        )
        .test(
            "future-time",
            "Please select a future reservation time.",
            function (value) {
                if (!value || this.parent.date !== getToday()) {
                    return true;
                }

                const [hour, minute] = value.split(":").map(Number);
                const now = new Date();
                const currentMinutes =
                    now.getHours() * 60 + now.getMinutes();

                return hour * 60 + minute > currentMinutes;
            }
        ),

    seating: yup
        .string()
        .required("Please select a seating preference.")
        .oneOf(
            seatingOptions.map((option) => option.value),
            "Please select a seating preference."
        ),

    dietary: yup
        .string()
        .max(30, "Dietary notes must be 30 characters or fewer."),

    newsletter: yup.boolean()
});

type ReservationData = yup.InferType<typeof reservationSchema>;

const ReservationForm = () => {
    const [confirmation, setConfirmation] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors}
    } = useForm<ReservationData>({
        resolver: yupResolver(reservationSchema),
        defaultValues: {
            name: "",
            email: "",
            partySize: "",
            date: "",
            time: "",
            seating: "",
            dietary: "",
            newsletter: true
        }
    });

    const selectedSeating = watch("seating");
    const dietaryNotes = watch("dietary") ?? "";
    const selectedDate = watch("date");

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const availableTimes = timeOptions.filter((option) => {
        if (selectedDate !== getToday()) {
            return true;
        }

        const [hour, minute] = option.value.split(":").map(Number);
        return hour * 60 + minute > currentMinutes;
    });

    const onSubmit = (data: ReservationData) => {
        setConfirmation(
            `Thank you, ${data.name}! ` +
            "Your reservation request has been recorded. " +
            "Your table is not confirmed."
        );

        reset();
    };

    const handleReset = () => {
        reset();
        setConfirmation("");
    };

    return (
        <section
            className="reservation-layout"
            aria-labelledby="reservation-form-heading"
        >
            <div className="card info-card reservation-card">
                <h2 id="reservation-form-heading">
                    Request a Table
                </h2>

                <div aria-live="polite">
                    {confirmation && (
                        <Alert color="success">
                            {confirmation}
                        </Alert>
                    )}
                </div>

                <Form
                    id="reservation-form"
                    noValidate
                    onSubmit={handleSubmit(
                        onSubmit,
                        () => setConfirmation("")
                    )}
                >
                    <div className="form-field">
                        <label htmlFor="guest-name">Name</label>
                        <input
                            id="guest-name"
                            type="text"
                            autoComplete="name"
                            className="form-control"
                            aria-invalid={!!errors.name}
                            aria-describedby="name-help name-error"
                            {...register("name")}
                        />
                        <p id="name-help" className="field-help">
                            Required. Maximum 20 characters.
                        </p>
                        <div
                            id="name-error"
                            className="invalid-feedback d-block"
                        >
                            {errors.name?.message}
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="guest-email">Email</label>
                        <input
                            id="guest-email"
                            type="email"
                            autoComplete="email"
                            className="form-control"
                            aria-invalid={!!errors.email}
                            aria-describedby="email-error"
                            {...register("email")}
                        />
                        <div
                            id="email-error"
                            className="invalid-feedback d-block"
                        >
                            {errors.email?.message}
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="party-size">
                            Number of Guests
                        </label>
                        <select
                            id="party-size"
                            className="form-select"
                            aria-invalid={!!errors.partySize}
                            aria-describedby="party-help party-error"
                            {...register("partySize")}
                        >
                            <option value="">
                                Select number of guests
                            </option>

                            {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                                <option key={size} value={size}>
                                    {size} {size === 1 ? "Guest" : "Guests"}
                                </option>
                            ))}
                        </select>
                        <p id="party-help" className="field-help">
                            Tables seat 1–8 guests.
                        </p>
                        <div
                            id="party-error"
                            className="invalid-feedback d-block"
                        >
                            {errors.partySize?.message}
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="visit-date">Date</label>
                        <input
                            id="visit-date"
                            type="date"
                            min={getToday()}
                            className="form-control"
                            aria-invalid={!!errors.date}
                            aria-describedby="date-error"
                            {...register("date")}
                        />
                        <div
                            id="date-error"
                            className="invalid-feedback d-block"
                        >
                            {errors.date?.message}
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="visit-time">Time</label>
                        <select
                            id="visit-time"
                            className="form-select"
                            aria-invalid={!!errors.time}
                            aria-describedby="time-error"
                            {...register("time")}
                        >
                            <option value="">Select a time</option>

                            {availableTimes.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div
                            id="time-error"
                            className="invalid-feedback d-block"
                        >
                            {errors.time?.message}
                        </div>
                    </div>

                    <fieldset className="seating-selection">
                        <legend>Seating Preference</legend>

                        <p className="field-help">
                            Choose a seating option to see a preview.
                        </p>

                        <Row className="g-3 align-items-start">
                            <Col xs="12" md="5">
                                {seatingOptions.map((seat) => (
                                    <div
                                        className="form-check mb-3"
                                        key={seat.value}
                                    >
                                        <input
                                            id={`seat-${seat.value}`}
                                            type="radio"
                                            value={seat.value}
                                            className="form-check-input"
                                            aria-invalid={!!errors.seating}
                                            aria-describedby="seating-error"
                                            {...register("seating")}
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor={`seat-${seat.value}`}
                                        >
                                            {seat.title}
                                        </label>

                                        <span className="choice-description">
                                            {seat.description}
                                        </span>
                                    </div>
                                ))}
                            </Col>

                            <Col xs="12" md="7">
                                <SeatingPreview
                                    selectedSeating={selectedSeating}
                                />
                            </Col>
                        </Row>

                        <div
                            id="seating-error"
                            className="invalid-feedback d-block"
                        >
                            {errors.seating?.message}
                        </div>
                    </fieldset>

                    <div className="form-field">
                        <label htmlFor="dietary-notes">
                            Dietary Notes
                        </label>
                        <textarea
                            id="dietary-notes"
                            className="form-control"
                            rows={3}
                            maxLength={30}
                            aria-invalid={!!errors.dietary}
                            aria-describedby="dietary-help dietary-counter dietary-error"
                            {...register("dietary")}
                        />
                        <p id="dietary-help" className="field-help">
                            Optional. Maximum 30 characters.
                        </p>
                        <p id="dietary-counter" role="status">
                            {dietaryNotes.length} / 30 characters
                        </p>
                        <div
                            id="dietary-error"
                            className="invalid-feedback d-block"
                        >
                            {errors.dietary?.message}
                        </div>
                    </div>

                    <div className="form-check mb-3">
                        <input
                            id="newsletter"
                            type="checkbox"
                            className="form-check-input"
                            {...register("newsletter")}
                        />
                        <label
                            htmlFor="newsletter"
                            className="form-check-label"
                        >
                            Send me news and updates from the Ironwake Galley.
                        </label>
                    </div>

                    <div className="button-group">
                        <Button type="submit" color="warning">
                            Submit Request
                        </Button>

                        <Button
                            type="button"
                            color="light"
                            outline
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default ReservationForm;