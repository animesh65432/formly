import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../ui/form";
import type { FormBlock } from "../../../../types";
import Icons from "../../../Icons";
import { useFormBuilderStore } from "../../../../store/frombuilder";

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const ImageUploadBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore()
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem className="w-[30vw] m-auto">
                    <FormLabel className="md:text-xl text-sm font-semibold text-green-800">
                        {block.props?.label || "Upload Image"}
                    </FormLabel>
                    <FormControl>
                        <div className="flex justify-between items-center">
                            <div >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => field.onChange(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="block w-[29vw] bg-white p-2 text-sm text-green-800 rounded-md shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-800 file:text-white hover:file:bg-green-700 cursor-pointer"
                                    onClick={() => setSelectElementId(block.id)}
                                />

                            </div>
                            <div>
                                <Icons.delete className="text-red-800 font-semibold" onClick={() => removeBlock(block.id)} />
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ImageUploadBlock;
