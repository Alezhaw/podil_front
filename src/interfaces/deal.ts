export interface IDeal {
    id: number,
    createdAt: string,
    updatedAt: string,
    name: string,
    buyer: string,
    buyerNickname: string,
    seller: string,
    sellerNickname: string,
    sum: number,
    status: number,
    description: string,
}