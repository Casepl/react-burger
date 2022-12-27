import {Feed} from '../../types/data';

const orderResponse = {
    orders: [{
        _id: "639f855599a25c001cd6a91f",
        ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c7"
        ],
        status: "done",
        name: "Флюоресцентный бургер",
        createdAt: "2022-12-18T21:25:41.177Z",
        updatedAt: "2022-12-18T21:25:41.541Z",
        number: 34703
    }],
    total: 35108,
    totalToday: 214
} as Feed

export { orderResponse }
