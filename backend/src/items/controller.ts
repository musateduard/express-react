import { Router } from "express";
import type { Request, Response } from "express";
// import type { ObjectId } from "mongoose";

import type { ShoppingItem, ShoppingItemWrite, ShoppingItemRead } from "./model.js";


const itemList: ShoppingItem[] = [];
const router: Router = Router();


router.get(

    "/",

    async (request: Request, response: Response<ShoppingItemRead[]>): Promise<void> => {

        // note: use mongodb to return item list

        const list: ShoppingItemRead[] = itemList.map(item => { return { ...item, id: 44 } });

        response.status(200).json(itemList);

        return;
    }
);


router.get(

    "/:id",

    async (request: Request, response: Response<ShoppingItemRead | any>): Promise<void> => {

        // note: replace this with db search

        const { id } = request.params;
        const result: ShoppingItem | undefined = itemList.find(item => item._id.toString() === id);

        if (!result) {

            console.log("item not found");
            response.status(404).json({message: `item not found: ${id}`});

            return;
        }

        else {

            console.log("item found");
            response.status(200).json(result);

            return;
        }
    }
);


router.post(

    "/",

    async (request: Request<any, any, ShoppingItemWrite>, response: Response<ShoppingItemRead>): Promise<void> => {

        console.log(`creating item ${JSON.stringify(request.body)}`);

        // read request body
        // add it to database
        // return added item

        const item: ShoppingItemRead = {
            ...request.body,
            _id: 55,
            createdAt: new Date()
        };

        response.status(200).json(item);

        return;
    }
);


router.put(

    "/:id",

    async (request: Request<any, any, ShoppingItemWrite>, response: Response<ShoppingItemRead>): Promise<void> => {

        console.log(`updating item ${request.params.id} ${request.body}`);

        const item: ShoppingItemRead = {
            _id: 33,
            name: "item1",
            bought: true,
            createdAt: new Date()
        };

        response.status(200).json(item);

        return;
    }
);


router.delete(

    "/:id",

    async (request: Request, response: Response): Promise<void> => {

        console.log(`deleting item ${request.params.id}`);

        return;
    }
);


export { router as itemsRouter };
