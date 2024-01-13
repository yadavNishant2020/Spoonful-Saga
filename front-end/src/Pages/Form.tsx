import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Props {
  onClose: () => void;
}

function Form( { onClose }: Props) {
  const [formData, setFormData] = useState({
    prompt: "",
    servings: "1",
    dishType: "main course",
    spiceLevel: "Low Spice Level",
    allergyType: "",
    chatGptResponse: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/chat", {
        prompt: formData.prompt,
        servings: formData.servings,
        dishType: formData.dishType,
        spiceLevel: formData.spiceLevel,
        allergyType: formData.allergyType,

      });

      if (response.data.chatGptResponse) {
        const responseData = JSON.stringify(response.data.chatGptResponse);
        setFormData({
          ...formData,
          chatGptResponse: responseData,
        });
      } else {
        throw new Error("Invalid or empty response from the server.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderResponse = () => {
    if (formData.chatGptResponse && isModalOpen ) {
      try {
        const chatGptResponse = JSON.parse(formData.chatGptResponse);

        console.log("Parsed chatGptResponse:", chatGptResponse);

        return (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  items-center justify-center mt-32 mx-5">
              <div className="overlay fixed inset-0 bg-black bg-opacity-80"></div>

              <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-5xl  relative">
                <div className="modal-content">
                  <div className="modal-header mb-4">
                    <h2 className="text-3xl font-bold mb-2 flex justify-between">Recipe Details <span
                      className="close-btn cursor-pointer text-gray-500 text-3xl"
                      onClick={() => {
                        onClose();
                        setIsModalOpen(false);
                      }}
                    >
                      &times;
                    </span></h2>
                    <p className="text-lg pt-8">{chatGptResponse}</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } catch (error) {
        console.error("Error parsing chatGptResponse:", error);
      }
    }

    return null;
  };


  return (
    <div className="bg-black bg-opacity-20 h-full py-12 ">
      <p className="text-center text-white text-[4rem] md:text-4xl lg:text-5xl font-black">Make your own special recipe.</p>
      <div className="bg-white bg-opacity-60 text-xl p-4 max-w-6xl mx-auto my-10  rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <label className="block mb-8 ">
            Describe what you want to make:
            <input
              className="border rounded px-2 py-1 my-2 w-full h-20"
              type="text"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
            />
          </label>
          <div className="flex gap-10 mb-8">
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
                <option value="4">5</option>
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
              name="dishType"
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