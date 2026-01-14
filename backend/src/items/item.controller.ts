import { ZodError } from "zod";
import { Types } from "mongoose";
import { Router } from "express";
import type { Request, Response } from "express";

import { ShoppingItemValidator, ShoppingItemModel } from "./item.model.js";
import type { ShoppingItem, ShoppingItemWrite, ShoppingItemRead } from "./item.model.js";


function mapToRead(source: ShoppingItem): ShoppingItemRead {

    const item: ShoppingItemRead = {
        id: source._id.toString(),
        name: source.name,
        bought: source.bought,
        createdAt: source.createdAt
    };

    return item;
}


type ErrorMessage = {
    message: string;
};

type Params = {
    id: string;
};

const router: Router = Router();


router.get(

    "/",

    async (request: Request, response: Response<ShoppingItemRead[]>): Promise<void> => {

        const queryResult: ShoppingItem[] = await ShoppingItemModel.find().lean();

        const result: ShoppingItemRead[] = queryResult.map(

            (item: ShoppingItem): ShoppingItemRead => {
                const parsedItem: ShoppingItemRead = mapToRead(item);
                return parsedItem;
            }
        );

        response.status(200).json(result);
        return;
    }
);


router.get(

    "/:id",

    async (request: Request<Params>, response: Response<ShoppingItemRead | ErrorMessage>): Promise<void> => {

        const { id } = request.params;

        if (!Types.ObjectId.isValid(id)) {

            const message: ErrorMessage = {
                message: `invalid item id: ${id}`
            };

            response.status(400).json(message);
            return;
        }

        const queryResult: ShoppingItem | null = await ShoppingItemModel.findById(id).lean();

        if (!queryResult) {

            const message: ErrorMessage = {
                message: `item not found: ${id}`
            };

            response.status(404).json(message);
        }

        else {
            const result: ShoppingItemRead = mapToRead(queryResult);
            response.status(200).json(result);
        }

        return;
    }
);


router.post(

    "/",

    async (request: Request, response: Response<ShoppingItemRead | ErrorMessage | string>): Promise<void> => {

        try {

            const validBody: ShoppingItemWrite = ShoppingItemValidator.parse(request.body);
            const item: ShoppingItem = await ShoppingItemModel.create(validBody);
            const result: ShoppingItemRead = mapToRead(item);

            response.status(201).json(result);
        }

        catch (error) {

            if (error instanceof ZodError) {
                response.status(400).set("Content-Type", "application/json").send(error.message);
            }

            else {

                const message: ErrorMessage = {
                    message: "error occured"
                };

                response.status(400).json(message);
            }
        }

        return;
    }
);


router.put(

    "/:id",

    async (request: Request<Params>, response: Response<ShoppingItemRead>): Promise<void> => {

        console.log(`updating item ${request.params.id} ${request.body}`);

        // const item: ShoppingItemRead = {
        //     _id: 33,
        //     name: "item1",
        //     bought: true,
        //     createdAt: new Date()
        // };

        // response.status(200).json(item);

        return;
    }
);


router.delete(

    "/:id",

    async (request: Request<Params>, response: Response<null>): Promise<void> => {

        console.log(`deleting item ${request.params.id}`);

        return;
    }
);


export { router as itemsRouter };
