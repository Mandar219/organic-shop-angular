import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: Array<any>;

    constructor(public userId: string, public shipping: any, cart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = cart.shopItems.map(item => {
            return {
                product: {
                    title: item.product.title,
                    price: item.product.price,
                    imageUrl: item.product.imageUrl
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice
            };
        })
    }
}