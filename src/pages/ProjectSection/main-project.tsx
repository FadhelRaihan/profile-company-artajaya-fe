import React from "react";

const MainProject: React.FC = () => {
    return(
        <div className="max-w-5xl mb-12">
            <div className="text-blue-900 text-3xl font-medium mb-5">
                / Project
            </div>

            <div>
                <span className="text-blue-900 text-8xl font-semibold leading-tight">Dibangun Oleh {" "}</span>
                <span className="text-red-600 text-8xl font-semibold leading-tight">ArtaJaya</span>
            </div>
        </div>
    )
}

export default MainProject;