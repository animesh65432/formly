import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { generateOAuthURL } from "../../../api/Integration/google";
import { useAuth } from "../../../store/auth";
import Icons from "../../Icons";

const GoogleSheets: React.FC = () => {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const handleGoogleAuth = async () => {
        setIsLoading(true);
        try {
            const response = await generateOAuthURL(token);
            const authUrl = (response as { url: string }).url;

            const popup = window.open(
                authUrl,
                "googleAuth",
                "width=700,height=600,left=500,top=200"
            );

            if (!popup) {
                alert("Popup blocked! Please allow popups and try again.");
                return;
            }

            const checkClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(checkClosed);
                    alert("Google Sheets integration complete.");
                }
            }, 1000);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (

        <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="bg-green-800 p-2 sm:p-4 md:p-6 hover:bg-green-600 rounded-md text-sm sm:text-xl"
        >
            {isLoading ? <Icons.spinner className="animate-spin h-4 w-4" /> : "Connect Google Sheets"}
        </Button>

    );
};

export default GoogleSheets;
