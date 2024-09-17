import { defineStore } from 'pinia'

export const cartStore = defineStore('cart', {
    state: () =>{
        return {
        cart: []
        }
    },

    actions: {
        checkProductExists(id) { 
            if(this.cart.length > 0){
                let getProduct = this.cart.find(({product_id}) => product_id === id);
                if(getProduct){
                    let index = this.cart.findIndex(a => a.product_id === getProduct.product_id);
                    this.cart[index].product_quantity++;
                    return false;
                }  
                else{
                    return true;
                }
            }
            return true;
        },

        calculateTotalInCart(){
            let total_price = 0.00;
            let unit_price = 0.00;
            for(let i=0; i<this.cart.length; i++){
                unit_price = this.cart[i].product_price * this.cart[i].product_quantity;
                total_price += unit_price; 
            }  
            return parseFloat(total_price).toFixed(2);           
        },

        deleteProductFromCart(id){
            if(confirm("Do you really want to delete?")){
                if(this.cart.length > 0){
                    let getProduct = this.cart.find(({product_id}) => product_id === id);
                    if(getProduct){
                        this.cart.splice(this.cart.findIndex(a => a.product_id === getProduct.product_id) , 1)
                    }
                                
                }
            }
        },

        cartTotalQuantity(){
            return this.cart.length;
        },

        getProductPriceByQuantity(id){
          let getProduct = this.cart.find(({product_id}) => product_id === id);
          if(getProduct){
            let index = this.cart.findIndex(a => a.product_id === getProduct.product_id);
            ;
            return parseFloat(getProduct.product_price * this.cart[index].product_quantity).toFixed(2);
          }
          return 0.00;
        }

    },

    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
      },
})