import React from 'react'
import type { BlockItem } from "../../types"
import Preview from '../Preview/main'

type Props = {
    block: BlockItem
    isDashboard?: boolean
}
const Templates: React.FC<Props> = ({ block, isDashboard = false }) => {
    return (
        <div>
            <Preview block={block.form_blocks} isTemplates={true} isDashboard={isDashboard} />
        </div>
    )
}

export default Templates