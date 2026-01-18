import type { ShoppingItem, ShoppingItemCreate, ShoppingItemUpdate } from "./types";

const API_URL: string = import.meta.env.VITE_API_URL;


export async function getItemList(controller: AbortController): Promise<ShoppingItem[]> {

    const options: RequestInit = {
        signal: controller.signal
    };

    const response: Response = await fetch(`${API_URL}/items`, options);
    const itemList: ShoppingItem[] = await response.json();

    return itemList;
}


export async function createItem(itemName: string): Promise<ShoppingItem> {

    console.log(`creating item ${itemName}`);

    const body: ShoppingItemCreate = {
        name: itemName
    };

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    };

    const response: Response = await fetch(`${API_URL}/items`, options);
    const item: ShoppingItem = await response.json();

    return item;
}


export async function deleteItem(item: ShoppingItem): Promise<Response> {

    console.log(`deleting item ${item.name}`);

    const options: RequestInit = {
        method: "DELETE",
    };

    const response: Response = await fetch(`${API_URL}/items/${item.id}`, options);

    return response;
}


export async function updateItem(item: ShoppingItem): Promise<ShoppingItem> {

    console.log("sending put request");

    const body: ShoppingItemUpdate = {
        bought: item.bought
    };

    const options: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    };

    const response: Response = await fetch(`${API_URL}/items/${item.id}`, options);
    const result: ShoppingItem = await response.json();

    return result;
}