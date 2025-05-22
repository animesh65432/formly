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

const FileUploadBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore()
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem className="w-[30vw] m-auto">
                    <FormLabel className="md:text-xl text-sm text-green-800">

                        {block.props?.label || "Upload File"}
                    </FormLabel>
                    <FormControl className="flex items-center justify-between">
                        <div className="relative w-[100%] flex gap-2">
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        field.onChange(file.name);
                                    }
                                }}
                                onClick={() => setSelectElementId(block.id)}
                                className="block w-full bg-white px-3 py-2 text-sm text-green-800 rounded-md border-2 border-gray-100 shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-800 file:text-white hover:file:bg-green-700 cursor-pointer"
                            />
                            <Icons.delete className="text-red-800" onClick={() => removeBlock(block.id)} />
                        </div>

                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FileUploadBlock;
