import React from 'react'
import Preview from '../FromBuilder/Preview/main'
import { useGetfrombyId } from "../../actions/from"
import { useAuth } from "../../store/auth"
import Icons from '../Icons'

type Props = {
    fromid: string,
    sheetId: string
}
const ShareFrom: React.FC<Props> = ({ fromid, sheetId }) => {
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
        <div className='flex justify-center items-center min-h-screen w-[100vw] p-4'>
            <Preview sheetId={sheetId} fromid={fromid} isSharefrom={true} isTemplates={true} block={data?.block.form_blocks} />
        </div >
    )
}

export default ShareFrom