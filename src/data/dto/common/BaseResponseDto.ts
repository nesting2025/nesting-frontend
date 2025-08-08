export interface BaseResponseDto<T> {
    localDateTime: string,
    code: string,
    message: string,
    data?: T | null;
}