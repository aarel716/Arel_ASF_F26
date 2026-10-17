import type { CartItem } from "../App";

type CartSummaryProps = {
    cart: CartItem[];
};

const CartSummary = ({ cart }: CartSummaryProps) => {
    const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + tax;

    return (
        <section
            className="text-end"
            aria-labelledby="order-summary-heading"
        >
            <h2 id="order-summary-heading" className="h4">
                Order Summary
            </h2>

            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (8%): ${tax.toFixed(2)}</p>

            <p>
                <strong>Total: ${total.toFixed(2)}</strong>
            </p>
        </section>
    );
};

export default CartSummary;