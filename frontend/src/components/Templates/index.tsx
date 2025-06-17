import React from 'react'
import type { BlockItem } from "../../types"
import Preview from '../Preview/main'

type Props = {
    block: BlockItem
    isDashboard?: boolean
}
const Templates: React.FC<Props> = ({ block, isDashboard = false }) => {
    return (

        <Preview block={block.form_blocks} isTemplates={true} isDashboard={isDashboard} />

    )
}

export default Templates