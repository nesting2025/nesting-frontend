export interface AddCartDto {
    productId: string;
    quantity?: number | null;
    options: Option[];
}

export interface Option {
    name: string;
    value: string;
    quantity: number;
    priceDelta: number;
}