import React, { useEffect } from 'react'
import FormElements from './Elements'
import FromEdit from './Edit'
import Preview from "./Preview/main"
import Fromheader from './Fromheader'
import { useFormBuilderStore } from "../../store/frombuilder"
import { useLocation } from "react-router-dom"

const Frombuilder: React.FC = () => {
    const { block, add } = useFormBuilderStore()
    const location = useLocation();
    const { templateblock } = location.state || []
    function init() {
        add(templateblock)
    }
    useEffect(() => {
        init()
    }, [])
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='w-[100vw] flex justify-end p-3 h-[5vh]'>
                <Fromheader />
            </div>
            <div className="w-[100vw] h-[95vh] grid grid-cols-7 overflow-hidden    lg:grid-cols-5  p-4 gap-4">
                <div className="lg:col-span-1 lg:block hidden">
                    <FormElements />
                </div>
                <div className="col-span-7 lg:col-span-3">
                    <Preview block={block} isTemplates={false} />
                </div>
                <div className="lg:block hidden lg:col-span-1 h-[90vh]">
                    <FromEdit />
                </div>
            </div>
        </div>
    )
}

export default Frombuilder
