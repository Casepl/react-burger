import {CREATED, DONE, PENDING} from "./order-status";
import {TStatus} from "../services/types/data";

type TStatusMap = Record<TStatus, string>

const colorMap:TStatusMap = {
    [CREATED]: 'primary',
    [PENDING]: 'primary',
    [DONE]: 'success',
}

const textMap:TStatusMap = {
    [CREATED]: 'Создан',
    [PENDING]: 'В работе',
    [DONE]: 'Выполнен',
}

export { colorMap, textMap };
