import Navbar from "../components/Navbar";
import { Link } from 'react-scroll';

function Home() {

    return (
        <div className="flex flex-col items-center md:h-screen font-sans md:bg-cover">
            <Navbar />
            <div className=" text-center">
            <div className="flex flex-col pt-[40%] md:pt-[25vh]">
                <div className="text-center text-white text-[4rem] md:text-7xl lg:text-8xl mx-3 font-black ">
                    <h1 className=" leading-[5rem] md:leading-[7rem]">Explore the <br /> <span className="text-light-green">A</span>rt of <span className="text-light-green">T</span>aste <br /> <span className="text-light-green">Spoonful Saga !</span> </h1>
                </div>
            </div>
            <Link to="search" smooth={true} duration={500} spy={true}  offset={-70} activeClass="active"><button type="button" className="py-4 mt-10 mb-10 text-lg font-semibold tracking-wider text-white rounded-lg bg-light-green hover:bg-green-800  px-11 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Discover Recipes</button></Link>
        </div>
        </div>
    );
}

export default Home;
