import z from "zod";
import { Schema, model } from "mongoose";
import type { Model, ObjectId } from "mongoose";


// mongodb model definitions
export interface ShoppingItem {
    _id: ObjectId;
    name: string;
    bought: boolean;
    createdAt: Date;
}

const definition = {
    name: { type: String, required: true },
    bought: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: new Date() }
};

const schema: Schema = new Schema(definition);

export const ShoppingItemModel: Model<ShoppingItem> = model<ShoppingItem>("ShoppingItem", schema);

// input validation models
export const createValidator = z.object({ name: z.string().min(1, "name cannot be empty").max(255, "name cannot be longer than 255 characters") });
export const updateValidator = z.object({ bought: z.boolean() });

export type ShoppingItemCreate = z.infer<typeof createValidator>;
export type ShoppingItemUpdate = z.infer<typeof updateValidator>;
export type ShoppingItemRead = Pick<ShoppingItem, "name" | "bought" | "createdAt"> & { id: string };
