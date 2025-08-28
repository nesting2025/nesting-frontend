import { OptionDto } from "./OptionDto";

export interface AddCartDto {
    productId: string;
    quantity?: number | null;
    options: OptionDto[];
}