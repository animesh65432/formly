import React from 'react'
import { Button } from "../../../components/ui/button"
import { useCreateFrom } from "../../../actions/from"
import { useAuth } from "../../../store/auth"
import { useFormBuilderStore } from "../../../store/frombuilder"
import Icons from '../../Icons'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Fromheader: React.FC = () => {
    const { token } = useAuth()
    const { block, makeEmptyblock } = useFormBuilderStore()
    const { mutateAsync: create, isPending } = useCreateFrom()
    const navigate = useNavigate()

    const createfrom = async () => {
        const response = await create({ token, block }) as { fromid: string }
        makeEmptyblock()
        toast.success("sucessfully create from")
        navigate(`/share/${response.fromid}`)
    }
    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='flex gap-4'>
            <Button className='bg-green-800 rounded-md hover:bg-green-700' onClick={() => goBack()}>{isPending ? <Icons.spinner className='animate-spin w-5 h-5 md:w-6 md:h-6 ' /> : "BACK"}</Button>
            <Button className='bg-green-800 rounded-md hover:bg-green-700' onClick={createfrom}>{isPending ? <Icons.spinner className='animate-spin w-5 h-5 md:w-6 md:h-6 ' /> : "SAVE"}</Button>
        </div>
    )
}

export default Fromheader