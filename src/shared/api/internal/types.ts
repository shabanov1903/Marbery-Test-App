/** Represents true or false */
export type BinaryState = 0 | 1;
export type BinaryStateString = "0" | "1";
export interface OrdersData {
    response: {
        data: {
            orders: {
                id: string
            }[]
        }
    }
}