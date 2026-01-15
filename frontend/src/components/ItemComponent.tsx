import type { ReactElement } from "react";

type ItemProps = {
    name: string,
    bought: boolean,
    createdAt: Date
};


export default function ShoppingItem(props: ItemProps): ReactElement {

    const source: ReactElement = <div>
        <span>name: {props.name} bought: {props.bought ? "true" : "false"}</span>
    </div>;

    return source;
}