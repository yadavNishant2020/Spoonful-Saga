import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";


function Form() {
  const [formData, setFormData] = useState({
    prompt: "",
    chatGptResponse: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/chat", { prompt: formData.prompt });
      setFormData({
        ...formData,
        chatGptResponse: JSON.stringify(response.data.chatGptResponse),
      });
      console.log(setFormData);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {formData.chatGptResponse && (
        <div>
          <h2>ChatGPT Response:</h2>
          <p>{formData.chatGptResponse}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
