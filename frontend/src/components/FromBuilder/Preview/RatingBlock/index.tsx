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

type Props = {
    block: FormBlock;
    form: any;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
};

const RatingBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-green-800 font-semibold">
                        {block.props?.label || "Rating"}
                    </FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-2">
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
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RatingBlock;
