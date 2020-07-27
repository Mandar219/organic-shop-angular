export interface Product {
    payload: {
        doc: {
            id: string;
            data(): {
                title: string,
                price: number,
                category: string,
                imageUrl: string
            }
        }
    }
}