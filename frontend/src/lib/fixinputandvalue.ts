import type { FormBlock } from "../types";

type InputAndValueTypes = {
    [key: string]: string | undefined;
};

export function fixInputAndValue(
    obj: InputAndValueTypes,
    block: FormBlock[]
): { [key: string]: string } {
    const fixedValues: { [key: string]: string } = {};

    block.forEach((input) => {
        const value = obj[input.id];
        if (input.id in obj && value) {
            fixedValues[`${input.label}`] = value;
        }
    });

    return fixedValues;
}
