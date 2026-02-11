import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PersonalInfoForm from "../components/home/PersonalInfoForm";
import ResumePreview from "../components/home/ResumePreview";
import { dummyResumeData } from "../assets/assets";
import TemplateSelector from "../components/home/TemplateSelector";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(
      (resume) => resume._id === String(resumeId),
    );

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  return (
    <div>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel – Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>

              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-700"
                style={{
                  width: `${(activeSectionIndex / (sections.length - 1)) * 100}%`,
                }}
              ></div>
              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center mt-4">
                {activeSectionIndex !== 0 && (
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.max(prevIndex - 1, 0),
                      )
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>
                )}
                <button
                  onClick={() =>
                    setActiveSectionIndex((prevIndex) =>
                      Math.min(prevIndex + 1, sections.length - 1),
                    )
                  }
                  className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium
    text-gray-600 hover:bg-gray-50 transition-all ml-auto
    ${activeSectionIndex === sections.length - 1 && "opacity-50"}`}
                  disabled={activeSectionIndex === sections.length - 1}
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
              {/* Form Content */}
              <div className="space-y-6">
                {/* Form Content */}
                <div className="space-y-6">
                  {activeSection.id === "personal" && (
                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel – Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div>{/* --- buttons --- */}</div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
