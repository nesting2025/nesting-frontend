import { OptionDto } from "./OptionDto";

export interface postProxyRequestDto {
    products: productProxyRequest[];
}

export interface productProxyRequest {
    sourceUrl: string;
    productName: string;
    productThumbnail: string;
    productPrice: number;
    originalPrice: number;
    originalPriceCurrency: string;
    quantity: number;
    options: OptionDto[];
}