import { defineStore } from 'pinia'

export const cartStore = defineStore('cart', {
    state: () =>{
        return {
        cart: []
        }
    },

    actions: {
        productQuantity(id) { 
            //console.log(this.cart);
            return this.cart.find(({ id }) => product_id === id); 
        }
    }
})