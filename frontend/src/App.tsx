import "./App.css";
import { Fragment, useEffect, useState, type ReactElement } from "react";
import ShoppingItem from "./components/ItemComponent";


type ShoppingItem = {
    name: string,
    bought: boolean,
    createdAt: Date
};


export default function App() {

    // const [count, setCount] = useState(0);
    const [itemList, setItemList] = useState<ShoppingItem[]>([]);


    async function getItemList(controller: AbortController): Promise<void> {

        try {

            const url: string = "http://localhost:3000/items";
            const options: RequestInit = {
                signal: controller.signal
            };

            const response: Response = await fetch(url, options);
            const data: ShoppingItem[] = await response.json();

            setItemList(data);
        }

        catch (error) {
            console.log(error);
        }

        return;
    }


    useEffect(

        () => {

            const controller: AbortController = new AbortController();
            getItemList(controller);

            const cleanup = () => {
                controller.abort();
                return;
            };

            return cleanup;
        },

        []
    );


    const pageSource: ReactElement = <Fragment>

        <section title="input section">

            <input name="input-form" type="text" />

            <button>add</button>

        </section>

        <section>
            <ul>{itemList.map((item) => <ShoppingItem {...item} />)}</ul>
        </section>

    </Fragment>;

    return pageSource;
}