import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product"



export const ShopContext = createContext(null);
 //Empty cart (key value will be product id and product value will be quantity of product that will added in cart)
 const getDefaultCart = () => {
    let cart = {}; //empty object
    //key value pair
    for(let index = 0; index < all_product.length+1; index++){
        cart[index] = 0;
    }
    return cart;

}

//Shop context provider
const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

   const addToCart = (itemId) =>{
    setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}) )
    console.log(cartItems);
   }
   const removeFromCart = (itemId) =>{
    setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}) )
   }

   const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = all_product.find((product)=>product.id===Number(item));
            totalAmount += cartItems[item] * itemInfo.new_price  ;
        }
        
    }
    return totalAmount;
   }
   const getTotalCartItems = () =>{
    let totalItem = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            totalItem += cartItems[item];
        }
    }
    return totalItem
   }

   const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, cartItems, addToCart, removeFromCart};


    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;