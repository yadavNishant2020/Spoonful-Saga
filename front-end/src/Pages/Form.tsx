import { useState, ChangeEvent, FormEvent } from "react";
import { RingLoader } from "react-spinners";
import axios from "axios";

interface Props {
  onClose: () => void;
}

interface Instruction {
  listItems: string;
}

function Form({ onClose }: Props) {
  const [formData, setFormData] = useState({
    prompt: "",
    servings: "1",
    dishType: "main course",
    spiceLevel: "Low Spice Level",
    allergyType: "",
    chatGptResponse: "",
    get_recipeName: "",
    get_ingredients: [],
    get_instructions: [] as Instruction[],

  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsModalOpen(true);

    try {
      const response = await axios.post("https://wandering-impulse-production.up.railway.app/chat", {
        prompt: formData.prompt,
        servings: formData.servings,
        dishType: formData.dishType,
        spiceLevel: formData.spiceLevel,
        allergyType: formData.allergyType,

      });

      if (response.data.chatGptResponse) {
        const responseData = JSON.parse(response.data.chatGptResponse);
        const title = responseData.get_recipeName;
        const ingredientsUsed = responseData.get_ingredients;
        const instructions = responseData.get_instructions;
        setFormData({
          ...formData,
          chatGptResponse: responseData,
          get_recipeName: title || "",
          get_ingredients: ingredientsUsed || "",
          get_instructions: instructions || "",

        });
      } else {
        throw new Error("Invalid or empty response from the server.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (isModalOpen) {
      try {
        const get_recipeName = formData.get_recipeName;
        const get_ingredients = formData.get_ingredients;
        const get_instructions = formData.get_instructions;

        return (
          <div className={`fixed inset-0 overflow-y-auto z-30 h-screen ${loading ? 'flex items-center justify-center' : ''}`}>
            <div className="flex items-center justify-center mx-5 md:mt-8 ">
              <div className="overlay fixed inset-0 bg-black bg-opacity-80"></div>

              <div className="modal bg-[url('/img/recipeBg.jpeg')] p-6 rounded-lg shadow-lg relative  md:w-[80vw]">
                <div className="modal-content">
                  <span
                    className="close-btn cursor-pointer text-gray-500 text-3xl flex justify-end"
                    onClick={() => {
                      onClose();
                      setIsModalOpen(false);
                    }}
                  >
                    &times;
                  </span>
                  {loading ? (

                    <div className="flex flex-col justify-center items-center md:h-[80vh] ">
                      <RingLoader color="#91C851" size={100} loading={loading} />
                      <h2 className="text-xl mt-4 text-gray-600 text-center">Cooking up a delectable recipe. Take it easy...</h2>

                    </div>
                  ) : (
                    <div className="modal-header mb-4 ">

                      <h2 className="md:text-3xl text-xl font-extrabold mb-2 flex justify-center ">
                        {get_recipeName}
                      </h2>
                      <div className="flex flex-col md:flex-row my-5 md:my-10 items-center">
                        <div className="bg-black bg-opacity-80 text-white p-5 md:mx-8 h-fit md:w-1/2">
                          <p className="text-light-green font-semibold text-xl md:text-2xl pb-2">
                            Ingredients:
                          </p>
                          <ul className="pl-3 md:text-lg text-base">
                            {(get_ingredients as any[]).map((ingredient: any, index: number) => (
                              <li className="leading-10" key={index}>{`~ ${ingredient.name}`}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-10 md:pt-0 md:pl-10 px-2">
                          <p className="font-semibold text-xl md:text-2xl pb-5">
                            Read Cooking Instructions Carefully:
                          </p>
                          <ol className="pl-3">
                            {get_instructions.map((instruction, index) => (
                              <li
                                className="pb-10 md:pb-0 leading-7 md:leading-10"
                                key={index}
                              >{`${index + 1}. ${instruction.listItems}`}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      } catch (error) {
        console.error("Error rendering modal content:", error);
        // You might want to display an error message or handle the error in a way that fits your application.
      }
    }

    return null;
  };



  return (
    <div className="bg-black bg-opacity-20 h-full py-12 ">
      <p className="text-center text-white text-4xl lg:text-5xl font-black">Make your own Special Recipe</p>
      <div className="bg-white  bg-opacity-60 text-xl p-4 max-w-6xl mx-2 md:mx-auto my-10  rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <label className="block mb-8 ">
            List all available ingredients:
            <input
              className="border rounded px-2 py-1 my-2 w-full h-20"
              type="text"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}

            />
          </label>
          <div className="flex flex-col md:flex-row gap-10 mb-8">
            <label >
              Number of Servings:
              <select
                className="border rounded px-2 py-1 w-20 ml-2"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label >
              Dish Type:
              <select
                className="border rounded px-2 py-1 w-fit ml-2"
                name="dishType"
                value={formData.dishType}
                onChange={handleChange}
              >
                <option value="main course">Main Course</option>
                <option value="appetizer">Appetizer</option>
                <option value="dessert">Dessert</option>
              </select>
            </label>
            <label >
              Spice Level:
              <select
                className="border rounded px-2 py-1 w-fit ml-2"
                name="spiceLevel"
                value={formData.spiceLevel}
                onChange={handleChange}
              >
                <option value="No Spice">None</option>
                <option value="Low Spice Level">Low Spice Level</option>
                <option value="Medium Spice Level">Medium Spice Level</option>
                <option value="High Spice Level">High Spice Level</option>
              </select>
            </label>

          </div>
          <label className="block mb-4">
            Please specify if you have any Allergy:
            <select
              className="border rounded px-2 py-1 w-fit ml-2"
              name="allergyType"
              value={formData.allergyType}
              onChange={handleChange}
            >
              <option value="None">None</option>
              <option value="Milk">Milk</option>
              <option value="Eggs">Eggs</option>
              <option value="Peanuts">Peanuts</option>
              <option value="Soybeans">Soybeans</option>
            </select>
          </label>
          <button
            className="p-2 text-white bg-green-600 hover:bg-green-400 rounded w-36"
            type="submit"
            disabled={loading}
          >
            Start Cooking

          </button>
        </form>
        {renderResponse()}
      </div>
    </div>
  );
}

export default Form;