import React, { useState } from "react"
import { Calendar } from "../../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { format } from "date-fns"
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../../ui/form"
import type { FormBlock } from "../../../types"
import ForSmallScreen from "../../FromBuilder/Edit/ForSmallScreen";
import Icons from "../../Icons"
import { useFormBuilderStore } from "../../../store/frombuilder"

type Props = {
    block: FormBlock
    form: any
    isTemplates: boolean,
    isSharefrom: boolean
}

const DateBlock: React.FC<Props> = ({ block, form, isTemplates, isSharefrom }) => {
    const { removeBlock, setSelectElementId } = useFormBuilderStore()
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)

    const handleClick = (id: string) => {
        setSelectElementId(id);
        SetselectedIdforsmallscreen(id)
        SetisClickedSmallScreen(true)
    }

    return (
        <div className={`${isSharefrom
            ? "w-[80vw] md:w-[30vw] m-auto flex"
            : isTemplates
                ? "w-[50vw] lg:w-[30vw] m-auto flex"
                : "w-[60vw] lg:w-[30vw] m-auto flex"
            }`} >
            <FormField
                control={form.control}
                name={block.id}
                render={({ field }) => (
                    <FormItem className={`${isSharefrom
                        ? "w-[75vw] md:w-[25vw] m-auto"
                        : isTemplates
                            ? "w-[60vw] lg:w-[35vw] m-auto"
                            : "w-[60vw] lg:w-[35vw] m-auto"
                        }`} onClick={() => handleClick(block.id)} >
                        <div className="flex justify-between items-center mb-2 ">
                            <FormLabel className="text-sm lg:text-xl text-green-800 font-semibold">
                                {block?.label}
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
                                                {field.value ? format(field.value, "PPP") : `${block?.placeholder}`}
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
            {!isTemplates &&
                <div className="flex mt-7 sm:mt-10 gap-2">
                    <Icons.delete
                        className="text-red-800 mt-4 md:mt-1 lg:mt-3 w-5 h-5 sm:w-6 sm:h-6 hover:text-red-600"
                        onClick={(e) => {
                            e.stopPropagation()
                            removeBlock(block.id)
                        }}
                    />
                    <Popover open={isclickedSmallScreen} >
                        <PopoverTrigger asChild>
                            {!isclickedSmallScreen ? <Icons.edit className='lg:hidden  mt-4 md:mt-0 lg:mt-1 block  h-5 w-5 sm:h-8 sm:w-8 text-green-800' onClick={() => handleClick(block.id)} /> : <Icons.close className='lg:hidden block text-red-800  h-5 w-5 sm:h-8 sm:w-8' onClick={() => SetisClickedSmallScreen(false)} />}
                        </PopoverTrigger>
                        <PopoverContent className='lg:hidden block mt-6 sm:mr-[26vw] md:mr-[30vw] mr-[25vw]'>
                            <ForSmallScreen selectElementId={selectedIdforsmallscreen} />
                        </PopoverContent>
                    </Popover>
                </div>
            }

        </div>
    )
}

export default DateBlock
