import { Router } from "express";
import type { Request, Response } from "express";


interface ShoppingItem {
	// _id: ObjectId;
	_id: number;
	name: string;
	bought: boolean;
	createdAt: Date;
}

const itemList: ShoppingItem[] = [];

const router: Router = Router();


router.get(

    "/",

    async (request: Request, response: Response): Promise<void> => {

        const item: ShoppingItem = {
            _id: 33,
            name: "ssssssssss",
            bought: true,
            createdAt: new Date()
        };

        response.status(200).json(itemList);

        return;
    }
);


router.post(

    "/",

    async (): Promise<void> => {
        return;
    }
);


router.put(

    "/:id",

    async (): Promise<void> => {
        return;
    }
);


router.delete(

    "/:id",

    async (): Promise<void> => {
        return;
    }
);


export { router as itemsRouter };
