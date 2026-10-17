import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import CartSummary from "../components/CartSummary";
import OrderModals from "../components/OrderModals";
import type { CartItem } from "../App";

type CartPageProps = {
    cart: CartItem[];
    clearCart: () => void;
};

const CartPage = ({ cart, clearCart }: CartPageProps) => {
    const isEmpty = cart.length === 0;

    return (
        <main className="container page-content">
            <h1>Your Cart</h1>

            {isEmpty ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Table dark responsive>
                        <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Line Total</th>
                        </tr>
                        </thead>

                        <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.name}</th>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <CartSummary cart={cart} />
                </>
            )}

            <div className="d-flex flex-wrap gap-2">
                <Link to="/menu" className="btn btn-warning">
                    {isEmpty ? "Browse Menu" : "Continue Shopping"}
                </Link>

                <OrderModals
                    clearCart={clearCart}
                    disabled={isEmpty}
                />
            </div>
        </main>
    );
};

export default CartPage;