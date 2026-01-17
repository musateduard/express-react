import type { ShoppingItem } from "../types";
import { deleteItem, updateItem } from "../data";
import { Button, Card, Checkbox } from "@mui/material";
import type { ChangeEvent, Dispatch, Key, MouseEvent, ReactElement, SetStateAction } from "react";


type ItemProps = {
    key: Key,
    data: ShoppingItem,
    updateItemList: Dispatch<SetStateAction<ShoppingItem[]>>
};


async function removeItemFromList(props: ItemProps): Promise<void> {

    const response: Response = await deleteItem(props.data);

    if ( !response.ok ) {
        window.alert(`failed to delete item: ${props.data.name}`);
        return;
    }

    props.updateItemList(currentList => currentList.filter(item => item.id !== props.data.id));

    return;
}


async function markItemBought(props: ItemProps): Promise<void> {

    console.log("setting checkbox");

    const newItem: ShoppingItem = {
        ...props.data,
        bought: !props.data.bought
    };

    const response: ShoppingItem = await updateItem(newItem);

    props.updateItemList(currentList => currentList.map(item => item.id === response.id ? newItem : item));

    return;
}


export default function ItemComponent(props: ItemProps): ReactElement {

    const source: ReactElement = <Card className="shopping-item">

        <section className="item-text-section">

            <Checkbox
                onChange={async (_event: ChangeEvent) => await markItemBought(props)}
                checked={props.data.bought}
            />

            <span
                title={props.data.name}
                className="item-text"
                style={{textDecoration: props.data.bought === true ? "line-through" : "none"}}>

                {props.data.name}
            </span>

        </section>

        <section className="item-buttons-section">

            <Button
                sx={{textTransform: "none"}}
                variant="contained"
                onClick={async (_event: MouseEvent) => await removeItemFromList(props)}>

                <span className="button-icon">❌</span>

                Remove
            </Button>

        </section>

    </Card>;

    return source;
}