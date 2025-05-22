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
                <FormItem className="w-[30vw] m-auto">
                    <div className="flex justify-between items-center mb-3 md:mb-2">
                        <FormLabel className="md:text-lg text-base lg:text-xl text-green-800 font-medium">
                            {block.props?.label}
                        </FormLabel>

                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <button
                                    type="button"
                                    onClick={() => setSelectElementId(block.id)}
                                    className="w-full flex items-center justify-between border-2 borde-black"
                                >
                                    <ul className="bg-white shadow-md rounded-md p-1 flex items-center justify-between w-[28vw]">
                                        <span
                                            className={`text-sm md:text-base lg:text-lg text-green-800 `}
                                        >
                                            {field.value ? format(field.value, 'PPP') : "Select a date."}
                                        </span>
                                        <Icons.calender className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                                    </ul>
                                    <Icons.delete
                                        className="text-red-800 cursor-pointer hover:text-red-700 transition-colors "
                                        onClick={() => removeBlock(block.id)}
                                    />

                                </button>

                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start"
                            className="w-auto p-1 md:p-2 rounded-lg md:rounded-xl shadow-lg border border-gray-200 bg-white mx-2"
                        >
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                className="rounded-lg"
                                classNames={{
                                    nav: "h-6 w-6 md:h-7 md:w-7 bg-transparent flex items-center justify-center",
                                    button_previous: "absolute left-5 md:left-10 hover:bg-green-50",
                                    button_next: "absolute right-5 md:right-10 hover:bg-green-50",
                                    week: "text-center",
                                    weekday: "text-sm md:text-base text-black font-bold text-center",
                                    month: "flex justify-center items-center flex-col mr-5",
                                    months: "flex justify-center",
                                    month_grid: "mt-1",
                                    day: "h-7 w-7 md:h-9 md:w-9 text-sm md:text-base font-normal aria-selected:bg-green-500 aria-selected:text-white aria-selected:rounded hover:bg-gray-200 hover:rounded",
                                    caption_label: "text-base md:text-lg  font-semibold text-green-800 text-center",
                                    month_caption: "flex justify-center relative pb-3 md:pb-5",
                                }}
                            />

                        </PopoverContent>
                    </Popover>

                    <FormMessage className="text-xs md:text-sm" />
                </FormItem >
            )}
        />
    )
}

export default DateBlock
