import type { FormBlock } from "../types";
import { gethefileurl } from "../api/file"
type InputAndValueTypes = {
    [key: string]: string | undefined;
};

export async function fixInputAndValue(
    obj: InputAndValueTypes,
    block: FormBlock[],
    token: string
): Promise<{ [key: string]: string }> {
    const fixedValues: { [key: string]: string } = {};
    await Promise.all(
        block.map(async (input) => {
            const value = obj[input.id];
            if ((input.type === "file" || input.type === "image") && value) {
                const response = await gethefileurl(token, value) as { url: string }
                fixedValues[input.label] = response.url;
            } else if (value) {
                fixedValues[input.label] = value;
            }
        })
    );

    return fixedValues;
}


export const fixdata = (block: FormBlock[]) => {
    const fixedValues: { [key: string]: string } = {};
    block.forEach((input) => {
        fixedValues[`${input.label}`] = "string"
    });

    return fixedValues;
}