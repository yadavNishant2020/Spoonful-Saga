import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    prompt: "",
    servings: "1",
    dishType: "main course",
    chatGptResponse: "",
  });

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
    if (formData.chatGptResponse) {
      try {
        const chatGptResponse = JSON.parse(formData.chatGptResponse);
  
        console.log("Parsed chatGptResponse:", chatGptResponse); // Add this line for debugging
  
        return (
          <div className="mt-4">
            <div className="bg-blue-500 text-white p-4 rounded">
              <h2 className="text-xl font-bold mb-2">Recipe Details</h2>
              <p className="text-sm">{chatGptResponse}</p>
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
    <div className="bg-white p-4 max-w-md mx-auto mt-8 rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Prompt:
          <input
            className="border rounded px-2 py-1 w-full"
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4">
          Number of Servings:
          <select
            className="border rounded px-2 py-1 w-full"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label className="block mb-4">
          Dish Type:
          <select
            className="border rounded px-2 py-1 w-full"
            name="dishType"
            value={formData.dishType}
            onChange={handleChange}
          >
            <option value="main course">Main Course</option>
            <option value="appetizer">Appetizer</option>
            <option value="dessert">Dessert</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
      {renderResponse()}
    </div>
  );
}

export default Form;