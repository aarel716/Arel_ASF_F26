import portholePhoto from "../assets/images/seating/port_seating.png";
import boothPhoto from "../assets/images/seating/crew_seating.png";
import floorPhoto from "../assets/images/seating/galley_seating.png";

const seatingOptions = [
    {
        value: "porthole",
        title: "Porthole Table",
        description: "A view of Brasshaven.",
        previewDescription: "Enjoy a view of Brasshaven from your table.",
        image: portholePhoto,
        alt: "Dining table beside a brass porthole window overlooking Brasshaven"
    },
    {
        value: "crew-booth",
        title: "Crew Booth",
        description: "A cozy booth near the galley.",
        previewDescription: "Relax in a cozy booth near the galley.",
        image: boothPhoto,
        alt: "Comfortable booth seating inside the Ironwake Galley"
    },
    {
        value: "galley-floor",
        title: "Galley Floor",
        description: "Traditional dining room seating.",
        previewDescription: "Dine in the heart of the restaurant.",
        image: floorPhoto,
        alt: "Tables and chairs in the Ironwake Galley's main dining room"
    }
];

export default seatingOptions;