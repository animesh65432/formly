import React from 'react'
import type { BlockItem } from "../../../types"
import Preview from '../../FromBuilder/Preview/main'

type Props = {
    block: BlockItem
}
const Templates: React.FC<Props> = ({ block }) => {
    return (
        <div>
            <Preview block={block.block} isTemplates={true} />
        </div>
    )
}

export default Templates