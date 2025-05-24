import React, { useState } from "react"
import { Calendar } from "../../../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"
import { format } from "date-fns"
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../../../ui/form"
import type { FormBlock } from "../../../../types"
import { Pencil } from "lucide-react";
import ForSmallScreen from "../../Edit/ForSmallScreen";
import Icons from "../../../Icons"
import { useFormBuilderStore } from "../../../../store/frombuilder"

type Props = {
    block: FormBlock
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>
    form: any
}

const DateBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore()
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)

    const handleClick = (id: string) => {
        setSelectElementId(id);
        SetselectedIdforsmallscreen(id)
        SetisClickedSmallScreen((prev) => !prev)
    }

    return (
        <div className="w-[60vw] lg:w-[30vw] m-auto flex items-center">
            <FormField
                control={form.control}
                name={block.id}
                render={({ field }) => (
                    <FormItem className="w-[58vw] lg:w-[28vw] m-auto" >
                        <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-sm lg:text-xl text-green-800 font-semibold">
                                {block.props?.label}
                            </FormLabel>
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <div
                                        className="flex items-center justify-between gap-2  bg-white rounded-md shadow-sm p-2 cursor-pointer hover:border-green-700 transition-colors"
                                    >
                                        <div className="flex gap-4">
                                            <span className="text-sm lg:text-xl text-green-800">
                                                {field.value ? format(field.value, "PPP") : `${block.props?.placeholder}`}
                                            </span>
                                            <Icons.calender className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                                        </div>

                                    </div>
                                </FormControl>
                            </PopoverTrigger>

                            <PopoverContent
                                align="start"
                                className="w-auto p-2 rounded-lg shadow-lg  bg-white"
                            >
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    className="rounded-lg"
                                    classNames={{
                                        nav: "h-6 w-6 md:h-7 md:w-7",
                                        button_previous: "absolute left-4 md:left-8 hover:bg-green-50",
                                        button_next: "absolute right-4 md:right-8 hover:bg-green-50",
                                        week: "text-center",
                                        weekday:
                                            "text-sm lg:text-base text-black font-bold text-center",
                                        month: "flex justify-center items-center flex-col",
                                        months: "flex justify-center",
                                        month_grid: "mt-1",
                                        day: "h-7 w-7 md:h-9 md:w-9 text-sm md:text-base font-normal aria-selected:bg-green-500 aria-selected:text-white aria-selected:rounded hover:bg-gray-200 hover:rounded",
                                        caption_label:
                                            "text-sm lg:text-xl font-semibold text-green-800 text-center",
                                        month_caption: "flex justify-center pb-3 md:pb-5",
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage className="text-xs md:text-sm" />
                    </FormItem>
                )}


            />
            <div className="flex mt-7">
                <Icons.delete
                    className="text-red-800  w-5 h-5 sm:w-6 sm:h-6 hover:text-red-600"
                    onClick={(e) => {
                        e.stopPropagation()
                        removeBlock(block.id)
                    }}
                />
                <Popover open={isclickedSmallScreen} >
                    <PopoverTrigger asChild>
                        <Pencil className='lg:hidden block' onClick={() => handleClick(block.id)} />
                    </PopoverTrigger>
                    <PopoverContent className='lg:hidden block mt-6 sm:mr-[26vw] md:mr-[30vw] mr-[25vw]'>
                        <ForSmallScreen selectElementId={selectedIdforsmallscreen} />
                    </PopoverContent>
                </Popover>
            </div>

        </div>
    )
}

export default DateBlock
