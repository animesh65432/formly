import React from "react";
import { Star } from "lucide-react";
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
    form: any;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
};

const RatingBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore()
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem className="w-[30vw] m-auto">
                    <FormLabel className="text-green-800 font-semibold md:text-xl text-sm">
                        {block.props?.label || "Rating"}
                    </FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-2 w-[100%]  justify-between">
                            <div className="w-[60%] flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <Star
                                        key={val}
                                        onClick={() => {
                                            setSelectElementId(block.id);
                                            field.onChange(val);
                                        }}
                                        className={`w-6 h-6 cursor-pointer transition ${field.value >= val
                                            ? "fill-yellow-400 text-yellow-500"
                                            : "text-gray-400"
                                            }`}
                                    />
                                ))}
                            </div>
                            <Icons.delete className="text-red-800" onClick={() => removeBlock(block.id)} />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RatingBlock;
