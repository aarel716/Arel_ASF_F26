import {Button, Card, CardBody, CardTitle, CardText, Col, Input, Label, Row} from "reactstrap";
import type {MenuItem} from "../data/menuItems";

type MenuItemCardProps = {
    item: MenuItem;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: (item: MenuItem) => void;
};

const MenuItemCard = ({
                          item,
                          quantity,
                          onQuantityChange,
                          onAddToCart
                      }: MenuItemCardProps) => {
    return (
        <Card tag="article" className="info-card menu-card">
            <Row className="align-items-center">
                <Col md="6">
                    <img
                        id="menu-image"
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                    />
                </Col>

                <Col md="6">
                    <CardBody>
                        <p id="menu-category">{item.category}</p>

                        <CardTitle tag="h3" id="menu-name">
                            {item.name}
                        </CardTitle>

                        <CardText id="menu-description">
                            {item.description}
                        </CardText>

                        <p id="menu-price">
                            ${item.price.toFixed(2)}
                        </p>
                        <p id="menu-note">{item.note}</p>

                        <Label for={`quantity-${item.id}`}>
                            Quantity
                        </Label>

                        <Input
                            id={`quantity-${item.id}`}
                            type="select"
                            className="mb-3"
                            value={quantity}
                            onChange={(event) =>
                                onQuantityChange(Number(event.target.value))
                            }
                        >
                            {[1, 2, 3, 4, 5].map((amount) => (
                                <option key={amount} value={amount}>
                                    {amount}
                                </option>
                            ))}
                        </Input>

                        <Button
                            type="button"
                            color="warning"
                            onClick={() => onAddToCart(item)}
                        >
                            Add to Cart
                        </Button>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    );
};

export default MenuItemCard;