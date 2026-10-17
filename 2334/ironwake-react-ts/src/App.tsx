import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import SiteNavBar from "./components/SiteNavBar";
import SiteFooter from "./components/SiteFooter";
import ErrorBoundary from "./components/ErrorBoundary";

import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationsPage from "./pages/ReservationsPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

import type { MenuItem } from "./data/menuItems";

export type CartItem = MenuItem & {
    quantity: number;
};

const App = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const location = useLocation();

    const cartCount = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const addToCart = (item: MenuItem, quantity: number) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find(
                (cartItem) => cartItem.id === item.id
            );

            // Increase an existing item's quantity, up to 5.
            if (existingItem) {
                return currentCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? {
                            ...cartItem,
                            quantity: Math.min(
                                cartItem.quantity + quantity,
                                5
                            )
                        }
                        : cartItem
                );
            }

            return [...currentCart, { ...item, quantity }];
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <>
            <SiteNavBar cartCount={cartCount} />

            {/* Reset the error boundary when changing pages. */}
            <ErrorBoundary key={location.pathname}>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route
                        path="/menu"
                        element={<MenuPage addToCart={addToCart} />}
                    />

                    <Route
                        path="/reservations"
                        element={<ReservationsPage />}
                    />

                    <Route path="/about" element={<AboutPage />} />

                    <Route
                        path="/cart"
                        element={
                            <CartPage
                                cart={cart}
                                clearCart={clearCart}
                            />
                        }
                    />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </ErrorBoundary>

            <SiteFooter />
        </>
    );
};

export default App;