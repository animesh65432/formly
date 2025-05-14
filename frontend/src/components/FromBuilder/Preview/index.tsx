import React, { useMemo } from 'react';
import { useFormBuilderStore } from "../../../store/frombuilder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../../../lib/generateSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';

const Preview: React.FC = () => {
    const { blocks } = useFormBuilderStore();


    const schema = useMemo(() => generateSchema(), [blocks]);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {},
    });

    const onSubmit = () => {
        console.log("")
    }

    return (
        <div className='col-span-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {blocks.map((block) => {
                        const name = `block-${block.id}`;
                        if (block.type === "email") {
                            return (
                                <FormField
                                    key={block.id}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{block.props.label}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={block.props.placeholder || ""} {...field} className='text-green-800' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            );
                        }
                    })}

                </form>
            </Form>
        </div>
    );
};

export default Preview;
