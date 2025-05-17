import type React from "react";
import type { FormBlock } from "../../../../types";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const RadioGroupBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const options = block.props?.options || [];

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem onClick={() => setSelectElementId(block.id)}>
                    <FormLabel>{block.props?.label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-col gap-2"
                        >
                            {options.map((opt: string) => (
                                <FormItem key={opt} className="flex items-center space-x-2">
                                    <FormControl>
                                        <RadioGroupItem value={opt} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{opt}</FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RadioGroupBlock;