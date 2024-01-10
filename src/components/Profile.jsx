import { IoIosArrowBack } from "react-icons/io";
import { saveData } from "../utils/localStorage";

const Profile = ({
  togglePage,
  setOpenAiKey,
  openAiKey,
  setResume,
  resume,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    togglePage("Generator");
    saveData("resume", resume);
    saveData("openAiKey", openAiKey);
  };
  return (
    <div className=" flex flex-col mx-5 mt-2">
      <div className=" flex justify-between my-3 items-center">
        <h2 className=" text-2xl font-bold ">Profile</h2>
        <button
          className=" border mr-1 p-1 border-solid border-gray-600 rounded-[100%]"
          onClick={() => togglePage("Generator")}
        >
          <IoIosArrowBack />
        </button>
      </div>
      <div>
        <form className=" flex flex-col">
          <div className=" mb-6">
            <label
              htmlFor="openAIKey"
              className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your OpenAI Api Key
            </label>
            <input
              id="openAIKey"
              name="openAIKey"
              type="text"
              className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              placeholder="sk****1234"
              required
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
            />
          </div>
          <div className=" mb-6">
            <label
              htmlFor="openAIKey"
              className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Resume
            </label>
            <textarea
              id="resume"
              name="resume"
              type="text"
              className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              placeholder="Paste your resume here..."
              rows={10}
              required
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className=" mb-6 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className=" border-2 border-solid border-blue-500 text-lg font-bold rounded p-2 px-4 text-blue-500 "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
