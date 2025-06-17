import React, { useEffect } from 'react';
import Mainlayout from '../Mainlayout';
import GoogleSheets from './GoogleSheets';
import Notion from './Notion';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Intergations: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const notionStatus = params.get('notion');
        const googleStatus = params.get("google")

        if (notionStatus === 'success') {
            toast.success('Successfully authenticated with Notion!');
            navigate('/intergations', { replace: true });
        }

        if (notionStatus === 'error') {
            toast.error('Failed to authenticate with Notion');
            navigate('/intergations', { replace: true });
        }

        if (googleStatus === 'success') {
            toast.success('Successfully authenticated with Notion!');
            navigate('/intergations', { replace: true });
        }

        if (googleStatus === 'error') {
            toast.error('Failed to authenticate with Notion');
            navigate('/intergations', { replace: true });
        }
    }, [location.search]);

    return (
        <Mainlayout>
            <div className=' w-[75vw] ml-10 sm:ml-0 flex gap-1 sm:gap-4  mt-6 sm:mt-10 justify-start sm:justify-end'>
                <GoogleSheets />
                <Notion />
            </div>
        </Mainlayout>
    );
};

export default Intergations;
