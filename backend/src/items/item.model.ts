import z from "zod";
import type { Model } from "mongoose";
import { Schema, model, Document } from "mongoose";


export interface ShoppingItem extends Document {
    name: string;
    bought: boolean;
    createdAt: Date;
}

const definition = {
    name: { type: String, required: true },
    bought: { type: Boolean, required: true },
    createdAt: { type: Date, required: true, default: new Date() }
};

const validatorShape = {
    name: z.string().min(1, "name cannot be empty").max(255, "name cannot be longer than 255 characters"),
    bought: z.boolean()
};

const schema: Schema = new Schema(definition);

export const validatorSchema = z.object(validatorShape);
export const ShoppingItemModel: Model<ShoppingItem> = model<ShoppingItem>("ShoppingItem", schema);
export type ShoppingItemWrite = z.infer<typeof validatorSchema>;
export type ShoppingItemRead = Pick<ShoppingItem, "name" | "bought" | "createdAt"> & { id: string };
