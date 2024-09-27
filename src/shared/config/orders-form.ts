import type { ModelValue } from "@vuepic/vue-datepicker";

import type { SelectItems } from "../ui/select/types";
import type { SearchTypes } from "../ui/search/type";

export interface OrdersForm {
    dataPickerValue: ModelValue,
    searchQuery: string,
    searchType: string,
    searchTypes: SearchTypes,
    sort_1_9: boolean,
    sort_9_1: boolean,
    selectorValue: string,
    selectorItems: SelectItems,
}

export function getForm(): OrdersForm {
    return {
        dataPickerValue: [new Date(), new Date()],
        searchQuery: "",
        searchType: "order_number",
        searchTypes: {
            order_number: {
              title: 'Номер заказа'
            },
            psid: {
              title: 'Номер фотосессии'
            },
            client_id: {
              title: 'Клиент ID'
            },
            phone: {
              title: 'Телефон'
            },
            email: {
              title: 'Email'
            },
            payer: {
              title: 'Плательщик, ребенок'
            }
        },
        sort_1_9: false,
        sort_9_1: false,
        selectorValue: "",
        selectorItems: [
            {
              value: '2021', title: '2021'
            },
            {
              value: '2022', title: '2022'
            },
            {
              value: '2023', title: '2023'
            }
        ]
    }
}