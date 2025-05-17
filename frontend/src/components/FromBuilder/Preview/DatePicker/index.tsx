import React from "react"
import { Calendar } from "../../../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"
import { format } from "date-fns"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../ui/form"
import type { FormBlock } from "../../../../types"
import Icons from "../../../Icons"
import { useFormBuilderStore } from "../../../../store/frombuilder"

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const DateBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore()

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="md:text-xl text-sm text-green-800 flex justify-between items-center">
                        {block.props?.label}
                        <Icons.delete
                            className="text-red-800 cursor-pointer hover:text-red-600 transition"
                            onClick={() => removeBlock(block.id)}
                        />
                    </FormLabel>

                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <button
                                    type="button"
                                    onClick={() => setSelectElementId(block.id)}
                                    className="w-[90%] text-left px-3 py-2 text-sm rounded-md border-2 border-gray-700 shadow-md text-green-800 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                </button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                            />
                        </PopoverContent>
                    </Popover>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default DateBlock
