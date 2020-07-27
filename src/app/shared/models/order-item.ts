interface Shipping {
    name: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    pincode: string
}

export interface OrderItem {
    payload: {
        doc: {
            id: string,
            data(): {
                datePlaced: number;
                items: Array<{
                    product: {
                        title: string,
                        price: number,
                        imageUrl: string
                    },
                    quantity: number,
                    totalPrice: number
                }>,
                shipping: Shipping,
                userId: string
            }
        }
    }
}