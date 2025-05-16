import type React from "react";
import type { FormBlock } from "../../../../types";
import { Checkbox } from "../../../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../../../ui/form";


type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const CheckboxGroupBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const options = block.props?.options || [];

    return (
        <FormItem onClick={() => setSelectElementId(block.id)}>
            <FormLabel>{block.props?.label}</FormLabel>
            <div className="flex flex-col gap-2">
                {options.map((opt: string) => (
                    <FormField
                        key={opt}
                        control={form.control}
                        name={block.id}
                        render={({ field }) => {
                            const selected = field.value || [];

                            return (
                                <FormItem
                                    key={opt}
                                    className="flex items-center space-x-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FormControl>
                                        <Checkbox
                                            checked={selected.includes(opt)}
                                            onCheckedChange={(checked) => {
                                                const updated = checked
                                                    ? [...selected, opt]
                                                    : selected.filter((val: string) => val !== opt);
                                                field.onChange(updated);
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">{opt}</FormLabel>
                                </FormItem>
                            );
                        }}
                    />
                ))}
            </div>
        </FormItem>
    );
};
export default CheckboxGroupBlock;