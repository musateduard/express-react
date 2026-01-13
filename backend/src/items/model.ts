import type { ObjectId } from "mongoose";


export interface ShoppingItem {
    // _id: ObjectId;
    _id: number;
    name: string;
    bought: boolean;
    createdAt: Date;
}

export type ShoppingItemWrite = Pick<ShoppingItem, "name" | "bought">;

export type ShoppingItemRead = Omit<ShoppingItem, "_id"> & {
    id: number;
};

// export type ShoppingItemParams = {
//     id: string;
// };