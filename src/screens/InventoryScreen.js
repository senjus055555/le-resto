import React, {useState, useEffect} from "react";
import { testData } from "../testData";

const InventoryScreen = () => {

    // Function to generate a random integer between min and max (inclusive)
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Function to generate random status
    const randomStatus = () => {
        const statuses = ['urgent', 'emptying', 'safe'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    // Shuffle the testData array to ensure randomness and uniqueness
    const shuffledTestData = testData.slice().sort(() => Math.random() - 0.5);

    const generateRandomItem = () => {
        // Check if all items have been used
        if (shuffledTestData.length === 0) {
            return null; // All items have been used
        }
        
        // Take the first item from the shuffledTestData array
        const { name, image } = shuffledTestData.pop(); // Remove the last item from the array
        const quantity = randomInt(1, 20); // Random quantity between 1 and 20
        const status = randomStatus(); // Random status
        return { name, quantity, status, image };
    };

    // Generate initial random kitchen inventory
    const initialInventory = Array.from({ length: 15 }, generateRandomItem);

    // State to manage kitchen inventory data
    const [inventory, setInventory] = useState(JSON.parse(JSON.stringify(initialInventory)));

    return (
        <div className="w-screen h-screen bg-black text-white px-8 py-12 flex flex-col">
            <h3 className="text-3xl font-semibold">Hey cheff👋</h3>
            <h4 className="text-lg font-semibold mt-3">Let's have a sneakpeak in to kitchen inventory</h4>
            <div className="flex-1 grid grid-cols-3 mt-6 overflow-scroll">
                <div className="bg-red-400 p-4">
                    <div className="w-full flex justify-center">
                        <h4 className="text-lg font-bold mb-4">Urgently required</h4>
                    </div>
                    {
                        inventory.length > 1 && inventory.map((item) => {

                            if(item.quantity > 5) {
                                return null
                            }

                            return (
                                <div className="h-24 p-4 flex justify-around items-center">
                                    <img src={item.image} className="h-20 w-20 rounded-full object-cover" />
                                    <div className="flex flex-col justify-center items-center">
                                        <h5>{item.name}</h5>
                                        <h5>{item.quantity} {item.name === 'Milk' ? 'Liters' : item.name === 'Eggs' ? 'Nos' : 'Kg'}</h5>
                                    </div>
                            </div> 
                            )
                        })
                    }
                </div>
                <div className="bg-orange-400 p-4">
                    <div className="w-full flex justify-center">
                        <h4 className="text-lg font-bold mb-4">Emptying soon</h4>
                    </div>
                    {
                        inventory.length > 1 && inventory.map((item) => {

                            if(item.quantity <= 5 || item.quantity >= 10) {
                                return null
                            }

                            return (
                                <div className="h-24 p-4 flex justify-around items-center">
                                    <img src={item.image} className="h-20 w-20 rounded-full object-cover" />
                                    <div className="flex flex-col justify-center items-center">
                                        <h5>{item.name}</h5>
                                        <h5>{item.quantity} {item.name === 'Milk' ? 'Liters' : item.name === 'Eggs' ? 'Nos' : 'Kg'}</h5>
                                    </div>
                            </div> 
                            )
                        })
                    }
                </div>
                <div className="bg-green-400 p-4">
                    <div className="w-full flex justify-center">
                        <h4 className="text-lg font-bold mb-4">Safe quantity</h4>
                    </div>
                    {
                        inventory.length > 1 && inventory.map((item) => {

                            if(item.quantity < 10) {
                                return null
                            }

                            return (
                                <div className="h-24 p-4 flex justify-around items-center">
                                    <img src={item.image} className="h-20 w-20 rounded-full object-cover" />
                                    <div className="flex flex-col justify-center items-center">
                                        <h5>{item.name}</h5>
                                        <h5>{item.quantity} {item.name === 'Milk' ? 'Liters' : item.name === 'Eggs' ? 'Nos' : 'Kg'}</h5>
                                    </div>
                            </div> 
                            )
                        })
                    }
                    {console.log(inventory)}
                </div>         
            </div>
        </div>
    )
}

export default InventoryScreen