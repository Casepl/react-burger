export interface IIngredientProps {
    _id: string,
    name: string,
    type: string,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    proteins?: number,
    fat?: number,
    carbohydrates?: number,
    calories?: number
}

export type ConstructorElementProps = IIngredientProps & {
    dragId: string;
};

export type ingredientsArrayType = IIngredientProps[];
export type ConstructorElementArrayType = ConstructorElementProps[];
