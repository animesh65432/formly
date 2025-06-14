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
            const key = input.label?.length ? input.label : input.placeholder ?? "defaultKey";
            if ((input.type === "file" || input.type === "image") && value) {
                const response = await gethefileurl(token, value) as { url: string }
                fixedValues[key] = response.url;
            } else if (value) {

                fixedValues[key] = value;
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