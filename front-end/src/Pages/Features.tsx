import CardsFeatures from "../components/CardsFeatures"

function Features() {
  return (
    <div className="bg-black bg-opacity-60  py-10 px-10">
      <p className="text-center text-white  text-4xl lg:text-5xl font-black">Get Started.</p>
      <div className="flex flex-wrap md:flex-row justify-around gap-5  my-10 ">
      <CardsFeatures img="img/openai.png" heading="Powered by Chat-GPT 4" description="A personalized recipe will be generated based on your selection. " />
      <CardsFeatures img="img/ingredients.png" heading="Add ingredients" description="Add list of all the ingredients you have available at home. " />
      <CardsFeatures img="img/heart.png" heading="Favourites" description="Add your special recipes to Favourites section." />
      <CardsFeatures img="img/dietary.png" heading="Allergy Safe" description="We take care of all your allergies. " />
    </div>
    </div>
  )
}

export default Features