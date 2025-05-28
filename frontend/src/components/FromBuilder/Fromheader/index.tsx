import React from 'react'
import { Button } from "../../../components/ui/button"
import { useCreateFrom } from "../../../actions/from"
import { useAuth } from "../../../store/auth"
import { useFormBuilderStore } from "../../../store/frombuilder"
import Icons from '../../Icons'

const Fromheader: React.FC = () => {
    const { token } = useAuth()
    const { block } = useFormBuilderStore()
    const { mutate: create, isPending } = useCreateFrom()

    const createfrom = async () => {
        await create({ token, block })
    }
    return (
        <div>
            <Button className='bg-green-800 rounded-md hover:bg-green-700' onClick={createfrom}>{isPending ? <Icons.spinner className='animate-spin w-5 h-5 md:w-6 md:h-6 ' /> : "SAVE"}</Button>
        </div>
    )
}

export default Fromheader