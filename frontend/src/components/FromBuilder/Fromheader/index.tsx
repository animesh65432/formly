import React, { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { useCreateFrom } from "../../../actions/from"
import { useAuth } from "../../../store/auth"
import { useFormBuilderStore } from "../../../store/frombuilder"
import Icons from '../../Icons'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { createGoogleSheet } from "../../../api/Integration/google"
import { setupThenotiondatabase } from "../../../api/Integration/notion"
import { fixdata } from "../../../lib/fixinputandvalue"

const Fromheader: React.FC = () => {
    const { token } = useAuth()
    const { block, makeEmptyblock } = useFormBuilderStore()
    const { mutateAsync: create } = useCreateFrom()
    const [isLoading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const createfrom = async () => {
        setLoading(true)
        try {
            const response = await create({ token, block }) as { fromid: string }
            const responseGoogleSheet = await createGoogleSheet(token, response.fromid) as { sheetId: string }
            const data = fixdata(block)
            await setupThenotiondatabase(token, response.fromid, data)
            toast.success("sucessfully create from")
            navigate(`/share/${response.fromid}?sheetId=${responseGoogleSheet.sheetId}`)
        }
        finally {
            makeEmptyblock()
            setLoading(false)
        }
    }
    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='flex gap-4'>
            <Button className='bg-green-800 rounded-md hover:bg-green-700 ' onClick={() => goBack()}>BACK</Button>
            <Button className='bg-green-800 rounded-md hover:bg-green-700' onClick={createfrom}>{isLoading ? <Icons.spinner className='animate-spin w-5 h-5 md:w-6 md:h-6 ' /> : "SAVE"}</Button>
        </div>
    )
}

export default Fromheader