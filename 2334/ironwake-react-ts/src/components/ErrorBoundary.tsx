import {Component} from "react";
import type {ReactNode} from "react";

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        hasError: false
    };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="container page-content">
                    <section
                        className="error-page text-center"
                        aria-labelledby="loading-error-heading"
                    >
                        <h1 id="loading-error-heading">
                            Oops! Something Went Wrong
                        </h1>

                        <p className="tagline">
                            Looks like we've encountered a little turbulence.
                        </p>

                        <p>
                            The Ironwake Galley is having trouble
                            displaying this page.
                        </p>

                        <div className="error-actions">
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => window.location.reload()}
                            >
                                Reload Page
                            </button>

                            <a href="/" className="btn btn-outline-light">
                                Return Home
                            </a>
                        </div>
                    </section>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;