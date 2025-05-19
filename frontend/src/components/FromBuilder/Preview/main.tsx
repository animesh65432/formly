import React, { useMemo, useEffect, useState } from 'react';
import { useFormBuilderStore } from "../../../store/frombuilder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../../../lib/generateSchema";
import AnimateWrapper from './AnimateWrapper';
import { Form } from '../../ui/form'
import { RadioGroupBlock, ParagraphBlock, InputTypes, ButtonBlock, HeadingBlock, TextBolck, DropdownBlock, DatePicker, Checkbox, ImageUploadBlock, RatingBlock, FileUploadBlock } from "./index"

type Props = {
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>
}

const Preview: React.FC<Props> = ({ setSelectElementId }) => {
    const { blocks } = useFormBuilderStore();
    const [lastAddedId, setLastAddedId] = useState<string | null>(null);
    const [prevBlocksLength, setPrevBlocksLength] = useState(0);


    const schema = useMemo(() => generateSchema(), [blocks]);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {},
    });

    useEffect(() => {
        if (blocks.length > prevBlocksLength) {
            const lastBlock = blocks[blocks.length - 1];
            if (lastBlock) {
                setLastAddedId(lastBlock.id);
                setTimeout(() => setLastAddedId(null), 600);
            }
        }
        setPrevBlocksLength(blocks.length);
    }, [blocks]);

    const onSubmit = (data: any) => {
        console.log("Form submitted with data:", data);
    };

    return (
        <div className="col-span-3 w-full flex justify-center min-h-[90vh] overflow-y-auto scrollbar-custom-x p-3">
            <div className="w-full md:w-1/2 px-4 md:px-6 lg:px-8 max-w-2xl xl:max-w-4xl 2xl:max-w-5xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border-green-800 ">
                        {blocks.map((block) => {
                            const isNew = block.id === lastAddedId;

                            const ResponsiveWrapper = ({ children }: { children:React.ReactNode }) => (
                                <div className='px-2 sm:px-4 md:px-0'>
                                    {children}
                                </div>
                            )

                            if (
                                block.type === "text" || block.type === "email" || block.type === "phone" || 
                                block.type === "number" || block.type === "password" || block.type === "url"
                            ) {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <InputTypes block={block} form={form} setSelectElementId={setSelectElementId} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                );
                            }
                            else if (block.type === "paragraph") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <ParagraphBlock block={block} setSelectElementId={setSelectElementId} form={form} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                )
                            }
                            else if (block.type === "heading") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <HeadingBlock block={block} setSelectElementId={setSelectElementId} form={form} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                )
                            }
                            else if (block.type === "textarea") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <TextBolck block={block} form={form} setSelectElementId={setSelectElementId} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                );
                            }
                            else if (block.type === "dropdown") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <DropdownBlock block={block} form={form} setSelectElementId={setSelectElementId} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                );
                            }
                            else if (block.type === "date") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <DatePicker block={block} form={form} setSelectElementId={setSelectElementId} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                )
                            }
                            else if (block.type === "checkbox") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <Checkbox block={block} form={form} setSelectElementId={setLastAddedId} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                )
                            }
                            else if (block.type === "image") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <ImageUploadBlock block={block} form={form} setSelectElementId={setSelectElementId} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                )
                            }
                            else if (block.type === "rating") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <RatingBlock block={block} form={form} setSelectElementId={setSelectElementId} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                )
                            }
                            else if (block.type === "button") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <div className='flex justify-center px-4 sm:px-8'>
                                            <ButtonBlock block={block} />
                                        </div>
                                    </AnimateWrapper>
                                );
                            }
                            else if (block.type === "file") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ResponsiveWrapper>
                                            <FileUploadBlock block={block} setSelectElementId={setSelectElementId} form={form} />
                                        </ResponsiveWrapper>
                                    </AnimateWrapper>
                                )
                            }
                            else {
                                return (
                                <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                    <RadioGroupBlock block={block} setSelectElementId={setSelectElementId} form={form} />
                                </AnimateWrapper>
                                )
                            }

                            return null;
                        })}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Preview;
