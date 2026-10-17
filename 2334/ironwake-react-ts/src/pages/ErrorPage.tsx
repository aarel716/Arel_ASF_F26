import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <main id="main-content" className="container page-content">
            <section
                className="error-page text-center"
                aria-labelledby="error-heading"
            >
                <p className="error-icon" aria-hidden="true">
                    404
                </p>

                <h1 id="error-heading">
                    Oops! Page Not Found
                </h1>

                <p className="tagline">
                    Looks like we've encountered a little turbulence.
                </p>

                <p>
                    Our crew couldn't find the page you're looking for.
                    The address may be incorrect or the page may have moved.
                </p>

                <p>
                    Don't worry! Our crew will help you
                    get back on course.
                </p>

                <div className="error-actions">
                    <Link to="/" className="btn btn-warning">
                        Return Home
                    </Link>

                    <Link to="/menu" className="btn btn-outline-light">
                        Try the Menu Again
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default ErrorPage;