import breakfastPhoto from "../assets/images/menu/breakfast_plate.png";
import teaPhoto from "../assets/images/menu/copper_tea.png";
import bowlPhoto from "../assets/images/menu/skygarden_bowl.png";
import aviatorPhoto from "../assets/images/menu/little_aviator.png";
import sandwichPhoto from "../assets/images/menu/engineers_sandwich.png";
import gingerPhoto from "../assets/images/menu/piston_ginger.png";
import ribPhoto from "../assets/images/menu/beef_dish.png";
import bentoPhoto from "../assets/images/menu/boilerhouse_bento.png";
import noodlesPhoto from "../assets/images/menu/foxfire_noodles.png";
import piePhoto from "../assets/images/menu/dockworkers_pie.png";
import cakePhoto from "../assets/images/menu/captains_chocolate_cake.png";

export type MenuItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    note: string;
};

const menuItems: MenuItem[] = [
    {
        id: 1,
        name: "Brasshaven Breakfast Plate",
        category: "Breakfast",
        price: 14,
        description: "Eggs, potatoes, toast, and smoked sausage.",
        image: breakfastPhoto,
        note: "Made to order"
    },
    {
        id: 2,
        name: "Copper Kettle Tea",
        category: "Breakfast",
        price: 5,
        description: "Warm apple tea with cinnamon and a lemon slice.",
        image: teaPhoto,
        note: "Caffeine-free"
    },
    {
        id: 3,
        name: "Skygarden Bowl",
        category: "Lunch",
        price: 16,
        description: "Roasted squash, chickpeas, rice, and lemon dressing.",
        image: bowlPhoto,
        note: "Vegan"
    },
    {
        id: 4,
        name: "Little Aviator Plate",
        category: "Lunch",
        price: 11,
        description: "Grilled chicken, rice, and steamed carrots.",
        image: aviatorPhoto,
        note: "Smaller portion"
    },
    {
        id: 5,
        name: "Engineer's Sandwich",
        category: "Lunch",
        price: 15,
        description: "Roast chicken, cheese, greens, and mustard.",
        image: sandwichPhoto,
        note: "Crew favorite"
    },
    {
        id: 6,
        name: "Piston Ginger Fizz",
        category: "Lunch",
        price: 6,
        description: "House ginger soda over ice with fresh lime.",
        image: gingerPhoto,
        note: "Non-alcoholic"
    },
    {
        id: 7,
        name: "Ironwake Short Rib",
        category: "Dinner",
        price: 24,
        description: "Braised beef, roast potatoes, and glazed carrots.",
        image: ribPhoto,
        note: "Captain's favorite"
    },
    {
        id: 8,
        name: "Boilerhouse Bento",
        category: "Dinner",
        price: 18,
        description: "Ginger chicken, steamed rice, and pickled vegetables.",
        image: bentoPhoto,
        note: "Chef favorite"
    },
    {
        id: 9,
        name: "Foxfire Noodles",
        category: "Dinner",
        price: 17,
        description: "Chili tofu, noodles, mushrooms, and sesame greens.",
        image: noodlesPhoto,
        note: "Vegan / Spicy"
    },
    {
        id: 10,
        name: "Dockworker's Pie",
        category: "Dinner",
        price: 19,
        description: "Mushroom and lentil pie with mashed potato topping.",
        image: piePhoto,
        note: "Vegetarian"
    },
    {
        id: 11,
        name: "Captain's Chocolate Cake",
        category: "Dinner",
        price: 8,
        description: "Warm chocolate cake with vanilla cream.",
        image: cakePhoto,
        note: "House dessert"
    }
];

export default menuItems;