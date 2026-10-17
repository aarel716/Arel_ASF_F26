import {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Input, Label, Table} from "reactstrap";
import MenuItemCard from "../components/MenuItemCard";
import menuItems from "../data/menuItems";
import type {MenuItem} from "../data/menuItems";

type MenuPageProps = {
    addToCart: (item: MenuItem, quantity: number) => void;
};

const MenuPage = ({addToCart}: MenuPageProps) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [message, setMessage] = useState("");

    const [quantities, setQuantities] = useState<{
        [id: number]: number;
    }>({});

    const filteredItems = menuItems.filter((item) => {
        return selectedCategory === "All"
            || item.category === selectedCategory;
    });

    const selectedItem = filteredItems[selectedIndex];

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedIndex(0);
        setMessage("");
    };

    const handlePrevious = () => {
        setSelectedIndex((currentIndex) =>
            currentIndex === 0
                ? filteredItems.length - 1
                : currentIndex - 1
        );
    };

    const handleNext = () => {
        setSelectedIndex((currentIndex) =>
            currentIndex === filteredItems.length - 1
                ? 0
                : currentIndex + 1
        );
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        setQuantities((currentQuantities) => ({
            ...currentQuantities,
            [id]: quantity
        }));
    };

    const handleAddToCart = (item: MenuItem) => {
        addToCart(item, quantities[item.id] ?? 1);

        setMessage(
            `Cart updated for ${item.name}. Maximum 5 of each item.`
        );
    };

    return (
        <main id="main-content" className="container page-content">
            <header className="page-heading">
                <h1>Menu</h1>

                <p>
                    From early morning breakfasts to hearty evening meals,
                    the Ironwake Galley serves hungry crews and travelers
                    passing through Brasshaven.
                </p>

                <p>
                    <strong>Breakfast &; Lunch:</strong>
                    {" "}7 a.m.–1 p.m.
                </p>

                <p>
                    <strong>Dinner:</strong>
                    {" "}4–10 p.m.
                </p>
            </header>

            <section
                className="section-space"
                aria-labelledby="menu-heading"
            >
                <h2 id="menu-heading">Explore Our Menu</h2>

                <p>
                    Browse our menu using PREV and NEXT,
                    or select a meal from the table below
                    to view its details.
                </p>

                <div className="mb-4">
                    <Label for="menu-filter">
                        Filter by category
                    </Label>

                    <Input
                        id="menu-filter"
                        type="select"
                        value={selectedCategory}
                        onChange={(event) =>
                            handleCategoryChange(event.target.value)
                        }
                    >
                        <option value="All">All Items</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </Input>
                </div>

                {selectedItem && (
                    <>
                        <MenuItemCard
                            item={selectedItem}
                            quantity={quantities[selectedItem.id] ?? 1}
                            onQuantityChange={(quantity) =>
                                handleQuantityChange(
                                    selectedItem.id,
                                    quantity
                                )
                            }
                            onAddToCart={handleAddToCart}
                        />

                        <p id="menu-position" aria-live="polite">
                            Item {selectedIndex + 1} of {filteredItems.length}
                            {": "}
                            {selectedItem.name}
                        </p>

                        <div className="d-flex justify-content-between mt-4">
                            <Button
                                type="button"
                                color="light"
                                outline
                                onClick={handlePrevious}
                            >
                                PREV
                            </Button>

                            <Button
                                type="button"
                                color="light"
                                outline
                                onClick={handleNext}
                            >
                                NEXT
                            </Button>
                        </div>
                    </>
                )}

                <p className="mt-3" role="status">
                    {message}
                </p>

                <div className="section-heading mt-5">
                    <h2 id="menu-table-heading">Complete Menu</h2>

                    <p>
                        Select a meal to view its image,
                        description, and details above.
                    </p>
                </div>

                <div className="table-menu">
                    <Table aria-labelledby="menu-table-heading">
                        <caption>
                            Galley plates and drinks · All prices in USD
                        </caption>

                        <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Includes</th>
                            <th scope="col" className="price">
                                Price
                            </th>
                            <th scope="col">Notes</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">
                                    <button
                                        type="button"
                                        className="menu-item-link"
                                        aria-pressed={
                                            selectedItem?.id === item.id
                                        }
                                        onClick={() =>
                                            setSelectedIndex(index)
                                        }
                                    >
                                        {item.name}
                                    </button>
                                </th>

                                <td>{item.description}</td>

                                <td className="price">
                                    ${item.price.toFixed(2)}
                                </td>

                                <td>{item.note}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>

                <p className="small-text menu-note">
                    Please discuss allergies with the crew before ordering.
                    Our kitchen handles shared ingredients and equipment.
                </p>
            </section>

            <p>
                <Link to="/reservations">Request a table</Link>
                {" "}for your next visit.
            </p>
        </main>
    );
};

export default MenuPage;