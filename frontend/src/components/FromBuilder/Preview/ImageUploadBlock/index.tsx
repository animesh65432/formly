import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form"
import type { FormBlock } from "../../../../types";
type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const ImageUploadBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{block.props?.label || "Upload Image"}</FormLabel>
                    <FormControl>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onloadend = () => field.onChange(reader.result)
                                    reader.readAsDataURL(file)
                                }
                            }}
                            className="text-sm file:border file:rounded file:px-3 file:py-1"
                            onClick={() => setSelectElementId(block.id)}
                        />
                    </FormControl>
                    {field.value && (
                        <img
                            src={field.value}
                            alt="Uploaded preview"
                            className="mt-2 h-32 object-cover rounded-md"
                        />
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default ImageUploadBlock