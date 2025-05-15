import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Input } from '../../../ui/input';


const RenderField: React.FC<{
    block: any;
    form: any;
}> = ({ block, form }) => {
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-green-800 font-semibold">
                        {block.props?.label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={block.props?.placeholder || ""}
                            {...field}
                            className="text-green-800 placeholder:text-green-800 placeholder:text-center"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RenderField