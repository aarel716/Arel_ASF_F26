import seatingOptions from "../data/seatingOptions";

type SeatingPreviewProps = {
    selectedSeating: string;
};

const SeatingPreview = ({selectedSeating}: SeatingPreviewProps) => {
    const selectedOption = seatingOptions.find(
        (option) => option.value === selectedSeating
    );

    return (
        <figure className="seating-preview" aria-live="polite">
            {selectedOption && (
                <img
                    src={selectedOption.image}
                    alt={selectedOption.alt}
                />
            )}

            <figcaption>
                <strong>
                    {selectedOption
                        ? selectedOption.title
                        : "Select a seating option"}
                </strong>

                <p className="field-help">
                    {selectedOption
                        ? selectedOption.previewDescription
                        : "A preview will appear here."}
                </p>
            </figcaption>
        </figure>
    );
};

export default SeatingPreview;