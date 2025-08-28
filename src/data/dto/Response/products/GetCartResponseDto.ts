import { OptionDto } from "../../Request/products/OptionDto";

export interface GetCartResponseDto {
    nestingCartItems?: NestingCartItemsDto;
    buyAgentCartItems?: BuyAgentCartItemsDto;
}

export interface NestingCartItemsDto {
    totalSize: number;
    domesticItems?: CartItemDto[];
    internationalItems?: CartItemDto[];
}

export interface CartItemDto {
    id: string;
    deliveryType: string;
    productId: string;
    prefixTag: string[];
    productName: string;
    productThumbnail: string;
    unitPrice: number;
    unitDiscountedPrice: number;
    totalPrice: number;
    totalDiscountedPrice: number;
    discountPercent: number;
    soldOut: boolean;
    option: OptionDto;
    quantity?: number | null;
}

export interface BuyAgentCartItemsDto {
    totalSize: number;
    approvedItems?: BuyAgentItemDto[];
    pendingItems?: BuyAgentItemDto[];
}

export interface BuyAgentItemDto {
    id: string;
    deliveryType: string;
    productId: string;
    productName: string;
    productThumbnail: string;
    totalPrice: number;
    deliveryFee: number;
    options: OptionDto[];
    quantity?: number | null;
    status: string;
    extraMemo?: string | null;
    expiresAt?: string | null;
}