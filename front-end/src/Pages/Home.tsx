import Navbar from "../components/Navbar";

function Home() {

    return (
        <div className="flex flex-col items-center h-screen font-sans md:bg-cover">
            <Navbar />
            <div className="flex flex-col pt-[50%]  md:pt-[30vh]">
                <div className="text-center text-white text-[4rem] md:text-7xl mx-3 font-black ">
                    <h1 className=" leading-[5rem]  md:leading-[5.5rem]">Explore the <br />Art of Taste at <br /> <span className="text-light-green">Spoonful Saga !</span> </h1>
                </div>
            </div>
            <button type="button" className="py-4 mt-10 mb-2 text-lg font-semibold tracking-wider text-white rounded-lg focus:outline-none bg-light-green hover:bg-green-800 focus:ring-4 focus:ring-green-300 px-11 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Discover Recipes</button>
        </div>
    );
}

export default Home;
