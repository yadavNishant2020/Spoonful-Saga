
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

function Footer() {
    return (
        <footer
            className="flex flex-col items-center  text-center text-white bg-black ">
            <div className="container pt-9">
                <div className="mb-4 flex justify-center">
                    <a href="https://twitter.com/NishantSinghY15" target="_" className="mr-9 text-neutral-800 dark:text-neutral-200">
                        <FaXTwitter />
                    </a>
                    <a href="https://www.linkedin.com/in/nishant-singh-yadav/" target="_" className="mr-9 text-neutral-800 dark:text-neutral-200">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/yadavNishant2020" target="_" className="mr-9 text-neutral-800 dark:text-neutral-200">
                        <FaGithub />
                    </a>
                </div>
            </div>

            <div
                className="w-full  p-4 text-center text-neutral-200">
                Designed and Developed By:
                <a
                    className="text-light-green pl-2"
                    href="https://nsy.co.in/" target="_" 
                >
                    Nishant Yadav
                </a>
            </div>
        </footer>)
}

export default Footer