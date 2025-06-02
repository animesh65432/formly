import React from 'react'
import Preview from '../FromBuilder/Preview/main'
import { useGetfrombyId } from "../../actions/from"
import { useAuth } from "../../store/auth"
import Icons from '../Icons'
type Props = {
    fromid: string
}
const ShareFrom: React.FC<Props> = ({ fromid }) => {
    const { token } = useAuth()
    const { data, isLoading } = useGetfrombyId(token, fromid)

    if (isLoading || !data) {
        return <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
            <div>
                <Icons.spinner className='animate-spin h-8 w-8' />
            </div>
        </div>
    }
    return (
        <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
            <Preview isSharefrom={true} isTemplates={true} block={data?.block.form_blocks} />
        </div >
    )
}

export default ShareFrom