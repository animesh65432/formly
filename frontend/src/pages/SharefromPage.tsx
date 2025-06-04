import ShareFrom from "../components/ShareFrom";
import React from 'react'
import { useParams, useLocation } from "react-router-dom"
const SharefromPage: React.FC = () => {
    const { fromid } = useParams()
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const sheetId = queryParams.get('sheetId');
    if (!fromid || !sheetId) {
        return
    }
    return (
        <ShareFrom fromid={fromid} sheetId={sheetId} />
    )
}

export default SharefromPage