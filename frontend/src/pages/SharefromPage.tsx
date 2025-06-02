import ShareFrom from "../components/ShareFrom";
import React from 'react'
import { useParams } from "react-router-dom"
const SharefromPage: React.FC = () => {
    const { fromid } = useParams()

    if (!fromid) {
        return
    }
    return (
        <ShareFrom fromid={fromid} />
    )
}

export default SharefromPage