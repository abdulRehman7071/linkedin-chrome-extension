import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { loadData } from "../utils/localStorage";
import { postChatGPTMessage } from "../utils/chatgpt";
import { CirclesWithBar } from "react-loader-spinner";

const Generator = ({ togglePage, resume, openAiKey }) => {
  const [isLoading, setIsLoding] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const fetchJobDesc = async () => {
      const fetchedJobDesc = await loadData("test");
      setJobDescription(fetchedJobDesc);
    };
    fetchJobDesc();
  }, []);

  const generateCoverLetter = async () => {
    setIsLoding(true);
    try {
      const message = `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\n\nJob Description:\n${jobDescription}`;
      const chatGPTResponse = await postChatGPTMessage(message, openAiKey);
      setCoverLetter(chatGPTResponse);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <div className=" flex flex-col">
      <div className=" flex justify-between mx-5 my-3 items-center">
        <button
          onClick={generateCoverLetter}
          className=" border-2 border-solid border-blue-500 text-lg font-bold rounded p-2 px-4 text-blue-500 "
        >
          {isLoading ? (
            <CirclesWithBar color="#3f83f8" height="28" width="80" />
          ) : (
            "Generate"
          )}
        </button>
        <h2 className=" text-2xl font-bold ">
          Linkedin Cover Letter Generator
        </h2>
        <button
          className=" border mr-1 p-1 border-solid border-gray-600 rounded-[100%]"
          onClick={() => togglePage("Profile")}
        >
          <CiSettings />
        </button>
      </div>
      <div className=" flex mx-5 ">
        <textarea
          placeholder="Generated Cover Letter"
          rows={10}
          className=" w-full outline rounded p-2 "
          value={coverLetter}
          readOnly
        />
      </div>
    </div>
  );
};

export default Generator;
