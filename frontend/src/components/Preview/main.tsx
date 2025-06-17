import React, { useEffect, useMemo, useState } from 'react';
import { useFormBuilderStore } from "../../store/frombuilder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../../lib/generateSchema";
import AnimateWrapper from './AnimateWrapper';
import { Form } from '../ui/form';
import type { FormBlock } from "../../types"
import { InputTypes } from "./index"
import { BLOCK_COMPONENT_MAP } from "../../lib"
import FromMobileElements from "../FromBuilder/Elements/Mobile"
import { toast } from "react-toastify"
import NotSelect from './NotSelect';
import { uploadGoogleSheet } from "../../api/Integration/google"
import { uploadDatanotiondatabase } from "../../api/Integration/notion"
import { fixInputAndValue } from "../../lib/fixinputandvalue"
import { useAuth } from "../../store/auth"
type Props = {
    block: FormBlock[],
    isTemplates?: boolean,
    isSharefrom?: boolean,
    fromid?: string,
    sheetId?: string
    isDashboard?: boolean
};


const Preview: React.FC<Props> = ({ sheetId, fromid, block, isTemplates = false, isSharefrom = false }) => {
    const [lastAddedId, setLastAddedId] = useState<string | null>(null);
    const [prevblockLength, setPrevblockLength] = useState(0);
    const [isLoading, setLoading] = useState<boolean>(false)
    const { token } = useAuth()
    const { setSelectElementId } = useFormBuilderStore()
    const schema = useMemo(() => generateSchema(block), [block]);
    const form = useForm({
        resolver: zodResolver(schema!)
    });


    useEffect(() => {
        if (block.length > prevblockLength) {
            const lastBlock = block[block.length - 1];
            if (lastBlock) {
                setLastAddedId(lastBlock.id);
                setTimeout(() => setLastAddedId(null), 600);
            }
        }
        setPrevblockLength(block.length);
    }, [block]);

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const res = await fixInputAndValue(data, block, token)
            if (sheetId && fromid) {
                await uploadGoogleSheet(token, sheetId, res, fromid)
                await uploadDatanotiondatabase(token, fromid, res)
            }
        }
        finally {
            setLoading(false)
            toast.success("Form submitted  sucessfully")
        }
    };

    const renderBlock = (block: FormBlock) => {
        const isNew = block.id === lastAddedId;
        const Component = BLOCK_COMPONENT_MAP[block.type] || InputTypes;

        const props = {
            block,
            form,
            setSelectElementId: block.type === "checkbox" ? setLastAddedId : setSelectElementId,
            isTemplates,
            isSharefrom,
            isLoading
        };



        return (
            <>
                {!isSharefrom
                    &&
                    <div >
                        <AnimateWrapper key={block.id} isAnimated={isNew} id={block.id}>
                            <Component {...props} />
                        </AnimateWrapper>
                    </div>
                }
                {
                    isSharefrom
                    && <Component {...props} />
                }
            </>
        );
    };

    return (
        <>
            {!isSharefrom &&
                <div className={` ${isTemplates ? " shadow-md bg-white p-4 rounded-md md:h-[50vh] h-[40vh] w-[70vw] md:w-fit scrollbar-custom-x" : "h-[90vh] scrollbar-custom-x"}`}>
                    {!isTemplates &&
                        <div className='lg:hidden block mb-4'>
                            <FromMobileElements />
                        </div>
                    }
                    {
                        block.length > 0 ? <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border-green-800">
                                {block.map(renderBlock)}
                            </form>
                        </Form> : <NotSelect />
                    }
                </div>
            }
            {
                isSharefrom &&
                <>
                    {
                        block.length > 0 ? <Form {...form}  >
                            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                                {block.map(renderBlock)}
                            </form>
                        </Form> : <NotSelect />
                    }
                </>
            }
        </>

    );
};

export default Preview;
