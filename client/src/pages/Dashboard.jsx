import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
  UploadCloud,
} from "lucide-react";

import { dummyResumeData } from "../assets/assets";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  // Load dummy data
  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // Create resume handler
  const createResume = (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    setTitle("");

    navigate("/app/builder/res123");
  };

  // Upload resume handler
  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    navigate("/app/builder/res123");
  };

  const editTitle = async (event) => {
    event.preventDefault();
  };
  //  delete resume
  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (confirmDelete) {
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
        Welcome, Joe Doe
      </p>

      {/* Create + Upload Buttons */}
      <div className="flex gap-4">
        {/* Create Resume */}
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
        >
          <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
          <p className="text-sm group-hover:text-indigo-600">Create Resume</p>
        </button>

        {/* Upload Resume */}
        <button
          onClick={() => setShowUploadResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-pink-500 hover:shadow-lg transition-all duration-300"
        >
          <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-pink-200 to-pink-400 text-white rounded-full" />
          <p className="text-sm group-hover:text-pink-600">Upload Existing</p>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* Resume Cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];

          return (
            <button
              key={resume._id || index}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: baseColor + "40",
              }}
            >
              <FilePenLineIcon
                className="size-7"
                style={{ color: baseColor }}
              />

              <p
                className="text-sm px-2 text-center"
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>

              <p
                className="absolute bottom-1 text-[11px]"
                style={{ color: baseColor + "90" }}
              >
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              {/* Edit / Delete Overlay */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1"
              >
                <TrashIcon
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer"
                  onClick={() => deleteResume(resume._id)}
                />

                <PencilIcon
                  onClick={() => {
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Create Resume Modal */}
      {showCreateResume && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          onClick={() => setShowCreateResume(false)}
        >
          <form
            onSubmit={createResume}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 rounded w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Create a Resume</h2>

            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 border rounded"
              required
            />

            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Create Resume
            </button>

            <XIcon
              className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600"
              onClick={() => setShowCreateResume(false)}
            />
          </form>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 border rounded"
              required
            />

            <label
              htmlFor="resume-input"
              className="block text-sm text-slate-700"
            >
              Select resume file
              <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                {resume ? (
                  <p className="text-green-700">{resume.name}</p>
                ) : (
                  <>
                    <UploadCloud className="size-14 stroke-1" />
                    <p>Upload resume</p>
                  </>
                )}
              </div>
            </label>

            <input
              type="file"
              id="resume-input"
              accept=".pdf"
              hidden
              onChange={(e) => setResume(e.target.files[0])}
            />

            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Upload Resume
            </button>

            <XIcon
              className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600"
              onClick={() => setShowUploadResume(false)}
            />
          </div>
        </form>
      )}

      {/* Edit Resume Modal */}
      {editResumeId && (
        <form
          onSubmit={editTitle}
          onClick={() => setEditResumeId("")}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 border rounded"
              required
            />

            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Update
            </button>

            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setEditResumeId("");
                setTitle("");
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
