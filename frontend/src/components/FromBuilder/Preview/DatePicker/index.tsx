import React from "react"
import { Calendar } from "../../../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"
import { format } from "date-fns"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../ui/form"
import type { FormBlock } from "../../../../types"
type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};
//
const DateBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{block.props?.label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <button
                                    className="w-full text-left p-2 border rounded-md"
                                    onClick={() => setSelectElementId(block.id)}
                                >
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                </button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
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