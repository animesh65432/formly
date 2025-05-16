import React, { useMemo, useEffect, useState } from 'react';
import { useFormBuilderStore } from "../../../store/frombuilder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../../../lib/generateSchema";
import AnimateWrapper from './AnimateWrapper';
import { Form } from '../../ui/form'
import { ParagraphBlock, InputTypes, ButtonBlock } from "./index"

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
    console.log(blocks)

    return (
        <div className="col-span-3 w-full flex justify-center h-[90vh] scrollbar-custom-x">
            <div className="w-1/2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  border-green-800">
                        {blocks.map((block) => {
                            const isNew = block.id === lastAddedId;

                            if (block.type === "text" || block.type === "email" || block.type === "phone" || block.type === "number" || block.type === "password" || block.type === "url") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <InputTypes block={block} form={form} setSelectElementId={setSelectElementId} />
                                    </AnimateWrapper>
                                );
                            }

                            if (block.type === "paragraph") {
                                return <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                    <ParagraphBlock block={block} setSelectElementId={setSelectElementId} form={form} />
                                </AnimateWrapper>
                            }

                            if (block.type === "") { }

                            if (block.type === "button") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <ButtonBlock block={block} />
                                    </AnimateWrapper>
                                );
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
