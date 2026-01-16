import type { ShoppingItem } from "./types";
import { createItem, getItemList } from "./data";
import ItemComponent from "./components/ItemComponent";

import { Fragment, useEffect, useState } from "react";
import type { Dispatch, Key, MouseEvent, ReactElement, SetStateAction } from "react";
import { TextField, Button, Card } from "@mui/material";


async function addItemToList(
    itemName: string,
    updateItemList: Dispatch<SetStateAction<ShoppingItem[]>>,
    updateInputField: Dispatch<SetStateAction<string>>): Promise<void> {

    if (!itemName) {
        return;
    }

    const response: ShoppingItem = await createItem(itemName);

    updateItemList(currentList => [...currentList, response]);
    updateInputField(_value => "");

    return;
}


export default function App() {

    console.log("rendering component");

    const [itemList, setItemList] = useState<ShoppingItem[]>([]);
    const [itemName, setItemName] = useState<string>("");


    async function fetchData(controller: AbortController): Promise<void> {

        try {
            const data: ShoppingItem[] = await getItemList(controller);
            setItemList(data);
        }

        catch (error) {

            if (error instanceof Error && error.name === "AbortError") {
                console.log("fetch request aborted");
            }

            else {
                console.warn(error);
            }
        }

        return;
    }


    useEffect(

        () => {

            console.log("running useEffect");

            const controller: AbortController = new AbortController();
            fetchData(controller);

            const cleanup = () => {
                controller.abort();
                return;
            };

            return cleanup;
        },

        []
    );


    const pageSource: ReactElement = <Fragment>

        <h1 className="page-title">Shopping List</h1>

        <Card className="input-section" component="section">

            <TextField
                id="outlined-basic"
                label="Item Name"
                variant="outlined"
                sx={{flexGrow: 1}}
                type="text"
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
            />

            <Button
                variant="contained"
                sx={{textTransform: "none", flexShrink: 0}}
                onClick={async (_event: MouseEvent) => await addItemToList(itemName, setItemList, setItemName)}>

                <span className="button-icon">📝</span>

                Add Item
            </Button>

        </Card>

        <section className="item-list">{
            itemList.length > 0
            ? itemList.map((item: ShoppingItem, index: Key) => <ItemComponent data={item} key={index} updateItemList={setItemList} />)
            : <h2>List is empty</h2>
        }</section>

    </Fragment>;

    return pageSource;
}