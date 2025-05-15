import React, { useMemo, useEffect, useState } from 'react';
import { useFormBuilderStore } from "../../../store/frombuilder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../../../lib/generateSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { motion } from "framer-motion";

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
    }, [blocks.length]);

    const onSubmit = () => {
        console.log("");
    }

    return (
        <div className='col-span-3 w-[100%] flex justify-center'>
            <div className='w-[50%] '>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {blocks.map((block) => {
                            const name = block.id;
                            const isNewlyAdded = block.id === lastAddedId;

                            const formField = (
                                <FormField
                                    key={block.id}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-green-800 font-semibold'>{block.props.label}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={block.props.placeholder || ""} {...field} className='text-green-800 placeholder:text-green-800 placeholder:text-center' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            );

                            if (block.type === "email" || block.type === "text") {
                                return isNewlyAdded ? (
                                    <motion.div
                                        key={block.id}
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                    >
                                        {formField}
                                    </motion.div>
                                ) : (
                                    <div key={block.id}>{formField}</div>
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