import React, { useMemo, useEffect, useState } from 'react';
import { useFormBuilderStore } from "../../../store/frombuilder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../../../lib/generateSchema";
import AnimateWrapper from './AnimateWrapper';
import { Form } from '../../ui/form';
import type { FormBlock } from "../../../types"
import { InputTypes } from "./index"
import { BLOCK_COMPONENT_MAP } from "../../../lib"
import FromMobileElements from "../Elements/Mobile"
import { toast } from "react-toastify"
import NotSelect from './NotSelect';


type Props = {
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
};


const Preview: React.FC<Props> = ({ setSelectElementId }) => {
    const { blocks } = useFormBuilderStore();
    const [lastAddedId, setLastAddedId] = useState<string | null>(null);
    const [prevBlocksLength, setPrevBlocksLength] = useState(0);

    const schema = useMemo(() => generateSchema(), [blocks]);

    const form = useForm({
        resolver: zodResolver(schema)
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
        console.log("Form submitted with label keys:", data);
        toast.success("Form submitted  sucessfully")
    };

    const renderBlock = (block: FormBlock) => {
        const isNew = block.id === lastAddedId;
        const Component = BLOCK_COMPONENT_MAP[block.type] || InputTypes;

        const props = {
            block,
            form,
            setSelectElementId: block.type === "checkbox" ? setLastAddedId : setSelectElementId
        };

        return (
            <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                <Component {...props} />
            </AnimateWrapper>
        );
    };

    console.log(blocks)

    return (

        <div className='h-[90vh] scrollbar-custom-x'>
            <div className='lg:hidden block mb-4'>
                <FromMobileElements />
            </div>
            {
                blocks.length > 0 ? <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border-green-800">
                        {blocks.map(renderBlock)}
                    </form>
                </Form> : <NotSelect />
            }
        </div>

    );
};

export default Preview;
