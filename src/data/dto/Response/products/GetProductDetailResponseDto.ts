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
    sourcePlatform: string;
    sourceType: string;
    price: number;
    discountPercent: number;
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