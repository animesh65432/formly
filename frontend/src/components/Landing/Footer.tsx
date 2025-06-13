import React from 'react'
import Icons from "../../components/Icons"

const Footer: React.FC = () => {
    return (
        <footer className=" text-green-800 mt-20 border-t py-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="text-lg font-semibold mb-4 md:mb-0">
                    © {new Date().getFullYear()} Fromly. All rights reserved.
                </div>

                <div className="flex gap-6 items-center">
                    <a href="https://github.com/animesh65432/formly" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
                        <Icons.gitHub className="w-5 h-5 text-green-800" />
                    </a>
                    <a href="https://x.com/animeshdut16137" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
                        <Icons.twitter className="w-5 h-5 text-green-800" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
