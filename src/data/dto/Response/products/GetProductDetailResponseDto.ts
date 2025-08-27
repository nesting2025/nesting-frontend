export interface GetProductDetailResponseDto {
    id: string;
    name: string;
    category: string[];
    type: string[];
    tag: string[];
    prefixTag: string[];
    description: string;
    imageUrl: string[];
    condition: string;
    size: string;
    manufacturer: string;
    sourcePlatform: string;
    sourceType: string;
    price: number;
    discountedPrice: number;
    discountPercent: number;
    deliveryFee: number;
    optionGroups: OptionGroup[];
    stock: number;
    soldOut: boolean;
    isLiked: boolean;
}

export interface OptionGroup {
    name: string;
    values: OptionValue[];
}

export interface OptionValue {
    value: string;
    priceDelta: number;
    stock: number;
    active: boolean;
    sort: number;
}