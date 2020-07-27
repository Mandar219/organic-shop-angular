interface ShopProduct {
    title: string,
    price: number,
    catergory: string,
    imageUrl: string
}

export class ShoppingCartItem {

    constructor(public product: ShopProduct, public quantity: number) {}

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}