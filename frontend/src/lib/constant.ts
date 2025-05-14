import {
    Hash,
    CircleDot,
    FileText,
    FileUp,
    Star,
    LayoutPanelTop,
    Key,
    Link,
    Type,
    AlignLeft,
    Heading1,
    Mail,
    Phone,
    ChevronDown,
    Check,
    Calendar,
    ImageIcon,
    Square
} from "lucide-react"
import type { FormElement, FormBlock } from "../types"



export const blurIn = {
    initial: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
    },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};

export const upward = {
    initial: {
        opacity: 0,
        y: 50,
        filter: "blur(5px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};

export const sideward = {
    initial: {
        opacity: 0,
        x: -50,
        filter: "blur(5px)",
    },
    animate: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};

export const whyfromly = [
    {
        title: "Notion-Style Form Editing",
        description: "Design forms the way you write in Notion — using slash commands and intuitive drag-and-drop blocks. No confusing UI. Just pure, focused form-building."

    }, {
        title: "Instant Integrations",
        description: "Automatically connect responses to Google Sheets, Notion, WhatsApp, and more. Fromly turns form fills into real-time workflows, lead alerts, and sales pipelines."
    },
    {
        title: "AI Summaries of Responses",
        description: "Get a quick overview of all your submissions. Fromly uses AI to summarize large response sets, helping you identify top leads or key insights instantly."
    },
    {
        title: "Ready-to-Use Templates",
        description: "Choose from beautiful pre-made templates to get started in seconds. Customize them to fit your brand, purpose, or campaign — no design skills needed."

    }
]

export const faq = [
    {
        "question": "What is Fromly?",
        "answer": "Fromly is a modern form builder that lets you create beautiful, interactive forms using a Notion-style editor. It's built for creators, marketers, and teams who want more than just Google Forms."
    },
    {
        "question": "How is Fromly different from Google Forms or Typeform?",
        "answer": "Fromly offers a block-based editor (like Notion), better customization, AI-powered summaries, and powerful integrations with tools like Google Sheets, Notion, and WhatsApp — all without needing code."
    },
    {
        "question": "Do I need coding skills to use Fromly?",
        "answer": "Nope! Fromly is designed to be no-code. You can build, style, and share forms visually — no technical background required."
    },
    {
        "question": "Can I integrate Fromly with other apps?",
        "answer": "Yes. Fromly supports integrations with tools like Google Sheets, Notion, WhatsApp, and others using APIs and tools like Zapier or Make.com."
    },
    {
        "question": "How does the AI summary feature work?",
        "answer": "Fromly uses GPT-based AI to automatically summarize your form responses, helping you identify key insights or top leads — especially useful for high-volume submissions."
    },
    {
        "question": "Can I create forms in different languages?",
        "answer": "Yes! You can build multilingual forms and collect responses in your preferred language, depending on your target audience."
    },
    {
        "question": "Is Fromly free to use?",
        "answer": "Fromly will offer both free and premium plans. Free users can create and share basic forms, while premium features include integrations, AI summaries, and more."
    },
    {
        "question": "What happens to my data?",
        "answer": "Your data is securely stored and encrypted. Fromly does not share your data with third parties, and you can export your form responses anytime."
    }
]
export const formElements: FormElement[] = [
    { id: "text", name: "Input", icon: Type },
    { id: "paragraph", name: "Paragraph", icon: AlignLeft },
    { id: "heading", name: "Heading", icon: Heading1 },
    { id: "email", name: "Email", icon: Mail },
    { id: "phone", name: "Phone", icon: Phone },
    { id: "dropdown", name: "Dropdown", icon: ChevronDown },
    { id: "checkbox", name: "Checkbox", icon: Check },
    { id: "date", name: "Date", icon: Calendar },
    { id: "image", name: "Image", icon: ImageIcon },
    { id: "button", name: "Button", icon: Square },
    { id: "number", name: "Number Input", icon: Hash },
    { id: "radio", name: "Radio Group", icon: CircleDot },
    { id: "textarea", name: "Long Text", icon: FileText },
    { id: "file", name: "File Upload", icon: FileUp },
    { id: "rating", name: "Rating", icon: Star },
    { id: "section", name: "Section Break", icon: LayoutPanelTop },
    { id: "password", name: "Password", icon: Key },
    { id: "url", name: "URL Input", icon: Link },
]

export const initialBlocks: FormBlock[] = [
    {
        id: "block1",
        type: "heading",
        content: "Customer Feedback Form",
        settings: {
            label: "Customer Feedback Form",
            required: false,
            placeholder: "",
            description: "We value your feedback!",
            fieldId: "heading-1",
        },
    },
    {
        id: "block2",
        type: "text",
        content: "Name",
        settings: {
            label: "Name",
            required: true,
            placeholder: "Enter your full name",
            description: "",
            fieldId: "name-field",
        },
    },
    {
        id: "block3",
        type: "email",
        content: "Email",
        settings: {
            label: "Email",
            required: true,
            placeholder: "your@email.com",
            description: "We'll never share your email with anyone else.",
            fieldId: "email-field",
        },
    },
    {
        id: "block4",
        type: "dropdown",
        content: "How did you hear about us?",
        settings: {
            label: "How did you hear about us?",
            required: false,
            placeholder: "Select an option",
            description: "",
            options: ["Social Media", "Friend", "Advertisement", "Other"],
            fieldId: "source-field",
        },
    },
    {
        id: "block5",
        type: "paragraph",
        content: "Additional Comments",
        settings: {
            label: "Additional Comments",
            required: false,
            placeholder: "Tell us more about your experience...",
            description: "Any additional feedback is appreciated",
            fieldId: "comments-field",
        },
    },
]

