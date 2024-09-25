import { defineStore } from 'pinia'

export const cartStore = defineStore('cart', {
    state: () =>{
        return {
        cart: [],
        discount: 0.00,
        coupon_percent: 0.00,
        final_amount: 0.00,
        shipping_cost: 0.00
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

        calculateSubTotalInCart(){
            let total_price = 0.00;
            let unit_price = 0.00;
            for(let i=0; i<this.cart.length; i++){
                unit_price = this.cart[i].product_price * this.cart[i].product_quantity;
                total_price += unit_price; 
            }  
            this.final_amount = parseFloat(total_price).toFixed(2);           

            return parseFloat(total_price).toFixed(2);           
        },

        applyCoupon(coupon){
            if(coupon != '')
            this.coupon_percent = coupon;
            this.discount = (coupon * this.calculateSubTotalInCart()) / 100;
            this.calculateTotalInCart(this.discount, this.shipping_cost);
            return parseFloat(this.discount).toFixed(2);           
        },

        calculateTotalInCart(discounted_amount=0.00, shipping=0.00){
            this.final_amount = this.calculateSubTotalInCart() - discounted_amount + shipping;
            return parseFloat(this.final_amount).toFixed(2);
        },

        calculateShipping(evt){
            if(evt.target.value == "Dhaka")
            this.shipping_cost = 80.00;
            else
            this.shipping_cost = 160.00;
            //this.final_amount += this.shipping_cost; 
            this.calculateTotalInCart(this.discount, this.shipping_cost); // recalculate the final amount.
        },

        
        deleteProductFromCart(id){
            if(confirm("Do you really want to delete?")){
                if(this.cart.length > 0){
                    let getProduct = this.cart.find(({product_id}) => product_id === id);
                    if(getProduct){
                        this.cart.splice(this.cart.findIndex(a => a.product_id === getProduct.product_id) , 1)
                        this.applyCoupon(this.coupon_percent); // recalculate the discount amount.
                    }
                    if(this.cartTotalQuantity() == 0){
                       this.reset();
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
        },

        reset() {
            this.cart = [];
            this.discount = 0.00;
            this.coupon_percent = 0.00;
            this.final_amount = 0.00;
            this.shipping_cost = 0.00;
          }
        

    },

    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
      },
})