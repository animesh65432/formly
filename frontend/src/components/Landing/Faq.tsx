import { faq, sideward } from "../../lib/constant";
import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../components/ui/accordion";

export default function FAQ() {
    return (
        <motion.div
            initial={sideward.initial}
            whileInView={sideward.animate}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto px-4"
        >
            <p className={` text-4xl sm:text-5xl text-center`}>
                Frequently Asked <span className="text-primary-btn">Questions</span>
            </p>

            <Accordion type="single" collapsible className="w-full mt-12 sm:mt-20">
                {faq?.map((e, i) => (
                    <AccordionItem value={`item-${i + 1}`} key={i}>
                        <AccordionTrigger
                            className={`text-lg sm:text-xl`}
                        >
                            {e.question}
                        </AccordionTrigger>
                        <AccordionContent
                            className={` text-gray-500`}
                        >
                            {e.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </motion.div>
    );
}