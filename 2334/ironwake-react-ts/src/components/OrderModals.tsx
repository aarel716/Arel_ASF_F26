import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

type OrderModalsProps = {
    clearCart: () => void;
    disabled: boolean;
};

const OrderModals = ({clearCart, disabled}: OrderModalsProps) => {
    const navigate = useNavigate();

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [thankYouMessage, setThankYouMessage] = useState("");

    const handleCancelOrder = () => {
        clearCart();
        setThankYouMessage(
            "Your order has been canceled. We hope to see you aboard again!"
        );
        setShowCancelModal(false);
    };

    const handleSubmitOrder = () => {
        setThankYouMessage(
            "Thank you for your order at The Ironwake Galley!"
        );
        setShowThankYouModal(true);
    };

    const handleFinish = () => {
        clearCart();
        setShowThankYouModal(false);
        navigate("/menu");
    };

    return (
        <>
            <Button
                type="button"
                color="secondary"
                disabled={disabled}
                onClick={() => {
                    setThankYouMessage("");
                    setShowCancelModal(true);
                }}
            >
                Cancel Order
            </Button>

            <Button
                type="button"
                color="warning"
                disabled={disabled}
                onClick={handleSubmitOrder}
            >
                Submit Order
            </Button>

            <Modal
                isOpen={showCancelModal}
                toggle={() => setShowCancelModal(false)}
                onClosed={() => {
                    if (thankYouMessage) {
                        setShowThankYouModal(true);
                    }
                }}
                labelledBy="cancel-order-title"
                contentClassName="bg-dark text-light"
                centered
            >
                <ModalHeader
                    id="cancel-order-title"
                    toggle={() => setShowCancelModal(false)}
                >
                    Cancel Order?
                </ModalHeader>

                <ModalBody>
                    Are you sure you want to cancel your order?
                    This will empty your cart.
                </ModalBody>

                <ModalFooter>
                    <Button
                        type="button"
                        color="secondary"
                        onClick={() => setShowCancelModal(false)}
                    >
                        Keep Order
                    </Button>

                    <Button
                        type="button"
                        color="danger"
                        onClick={handleCancelOrder}
                    >
                        Yes, Cancel Order
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={showThankYouModal}
                backdrop="static"
                keyboard={false}
                labelledBy="thank-you-title"
                contentClassName="bg-dark text-light"
                centered
            >
                <ModalHeader id="thank-you-title">
                    Thank You!
                </ModalHeader>

                <ModalBody>
                    {thankYouMessage}
                </ModalBody>

                <ModalFooter>
                    <Button
                        type="button"
                        color="warning"
                        onClick={handleFinish}
                    >
                        Back to Menu
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default OrderModals;