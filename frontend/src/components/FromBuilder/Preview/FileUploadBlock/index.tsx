import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import type { FormBlock } from "../../../../types"
type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};
const FileUploadBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{block.props?.label || "Upload File"}</FormLabel>
                    <FormControl>
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    field.onChange(file.name); // or file object if saving to backend
                                }
                            }}
                            className="text-sm file:border file:rounded file:px-3 file:py-1"
                            onClick={() => setSelectElementId(block.id)}
                        />
                    </FormControl>
                    <p className="text-muted-foreground text-sm mt-1">{field.value}</p>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default FileUploadBlock;