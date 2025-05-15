import React, { useMemo, useEffect, useState } from 'react';
import { useFormBuilderStore } from "../../../store/frombuilder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../../../lib/generateSchema";
import AnimateWrapper from './AnimateWrapper';
import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import RenderField from './RenderField';
//it's the preview section
const Preview: React.FC = () => {
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {blocks.map((block) => {
                            const isNew = block.id === lastAddedId;

                            if (block.type === "text" || block.type === "email") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <RenderField block={block} form={form} />
                                    </AnimateWrapper>
                                );
                            }

                            if (block.type === "button") {
                                return (
                                    <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                                        <Button type="submit" className="bg-green-800">
                                            {block.props?.label || 'Submit'}
                                        </Button>
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
