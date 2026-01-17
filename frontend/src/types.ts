export type ShoppingItem = {
    id: string,
    name: string,
    bought: boolean,
    createdAt: Date
};

export type ShoppingItemCreate = {
    name: string
};

export type ShoppingItemUpdate = {
    bought: boolean
};