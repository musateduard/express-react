export type ShoppingItem = {
    id: string,
    name: string,
    bought: boolean,
    createdAt: Date
};

export type ShoppingItemWrite = {
    name: string,
    bought: boolean
};