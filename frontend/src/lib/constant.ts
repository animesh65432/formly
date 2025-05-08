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