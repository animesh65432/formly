import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react"

export interface FormElement {
    id: string
    name: string
    icon: LucideIcon
}

export interface FormBlockSettings {
    label: string
    required: boolean
    placeholder: string
    description: string
    fieldId: string
    options?: string[]
}


export interface FormBlock {
    id: string
    type: string
    content: string
    settings: FormBlockSettings
}

export interface DraggableFormElementProps {
    element: FormElement
}

export interface SortableFormBlockProps {
    block: FormBlock
    isSelected: boolean
    onSelect: (block: FormBlock) => void
    hoveredBlock: string | null
    setHoveredBlock: (id: string | null) => void
    getBlockIcon: (type: string) => ReactNode
    onDelete: (id: string) => void
}
export interface FormBlockPreviewProps {
    block: FormBlock
    getBlockIcon: (type: string) => ReactNode
}


export interface FormElementPreviewProps {
    element: FormElement
}

export interface PropertiesPanelProps {
    selectedBlock: FormBlock | null
    updateBlockSettings: (key: string, value: any) => void
    deleteBlock: (id: string) => void
}
