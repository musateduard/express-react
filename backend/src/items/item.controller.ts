import { ZodError } from "zod";
import { Router } from "express";
import type { Request, Response } from "express";
import { Types, type QueryOptions } from "mongoose";

import { validatorSchema, ShoppingItemModel } from "./item.model.js";
import type { ShoppingItem, ShoppingItemWrite, ShoppingItemRead } from "./item.model.js";


type ErrorMessage = {
    message: string;
};

type Params = {
    id: string;
};


function mapToRead(source: ShoppingItem): ShoppingItemRead {

    const item: ShoppingItemRead = {
        id: source._id.toString(),
        name: source.name,
        bought: source.bought,
        createdAt: source.createdAt
    };

    return item;
}


async function getAllItems(request: Request, response: Response<ShoppingItemRead[]>): Promise<void> {

    const queryResult: ShoppingItem[] = await ShoppingItemModel.find().lean();
    const result: ShoppingItemRead[] = queryResult.map((item: ShoppingItem): ShoppingItemRead => mapToRead(item));

    response.status(200).json(result);
    return;
}


async function getSingleItem(request: Request<Params>, response: Response<ShoppingItemRead | ErrorMessage>): Promise<void> {

    const { id } = request.params;

    // check item id
    if (!Types.ObjectId.isValid(id)) {

        const message: ErrorMessage = {
            message: `invalid item id: ${id}`
        };

        response.status(400).json(message);
        return;
    }

    const queryResult: ShoppingItem | null = await ShoppingItemModel.findById(id).lean();

    if (!queryResult) {
        const message: ErrorMessage = { message: `item not found: ${id}` };
        response.status(404).json(message);
    }

    else {
        const result: ShoppingItemRead = mapToRead(queryResult);
        response.status(200).json(result);
    }

    return;
}


async function createItem(request: Request, response: Response<ShoppingItemRead | ErrorMessage | string>): Promise<void> {

    try {

        const validBody: ShoppingItemWrite = validatorSchema.parse(request.body);
        const item: ShoppingItem = await ShoppingItemModel.create(validBody);
        const result: ShoppingItemRead = mapToRead(item);

        response.status(201).json(result);
    }

    catch (error) {

        if (error instanceof ZodError) {
            response.status(400).set("Content-Type", "application/json").send(error.message);
        }

        else {
            const message: ErrorMessage = { message: "error occured" };
            response.status(400).json(message);
        }
    }

    return;
}


async function updateItem(request: Request<Params>, response: Response<ShoppingItemRead | ErrorMessage | string>): Promise<void> {

    const { id } = request.params;

    // check item id
    if (!Types.ObjectId.isValid(id)) {

        const message: ErrorMessage = {
            message: `invalid item id: ${id}`
        };

        response.status(400).json(message);
        return;
    }

    try {

        const options: QueryOptions<ShoppingItem> = {
            new: true,
            runValidators: true
        };

        const validBody: ShoppingItemWrite = validatorSchema.parse(request.body);
        const updatedItem: ShoppingItem | null = await ShoppingItemModel.findByIdAndUpdate(id, validBody, options).lean();

        if (!updatedItem) {
            const message: ErrorMessage = { message: `item not found: ${id}` };
            response.status(404).json(message);
        }

        else {
            const result: ShoppingItemRead = mapToRead(updatedItem);
            response.status(200).json(result);
        }
    }

    catch (error) {

        if (error instanceof ZodError) {
            response.status(400).set("Content-Type", "application/json").send(error.message);
        }

        else {
            const message: ErrorMessage = { message: "error occured" };
            response.status(400).json(message);
        }
    }

    return;
}


async function deleteItem(request: Request<Params>, response: Response<null | ErrorMessage>): Promise<void> {

    const { id } = request.params;

    // check item id
    if (!Types.ObjectId.isValid(id)) {

        const message: ErrorMessage = {
            message: `invalid item id: ${id}`
        };

        response.status(400).json(message);
        return;
    }

    const queryResult: ShoppingItem | null = await ShoppingItemModel.findByIdAndDelete(id).lean();

    if (!queryResult) {
        const message: ErrorMessage = { message: `item not found: ${id}` };
        response.status(404).json(message);
    }

    else {
        response.status(204).send();
    }

    return;
}


const router: Router = Router();

router.get("/", getAllItems);
router.get("/:id", getSingleItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export { router as itemsRouter };
