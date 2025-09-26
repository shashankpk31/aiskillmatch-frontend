import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import Navbar from "../../components/common/Navbar";

const TOTAL_STEPS = 3;

const RegisterPage = () => {
  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      fullName: "",
      headline: "",
      bio: "",
      skills: [""],
      experience: [
        { organization: "", role: "", duration: "", responsibilities: [""] },
      ],
      education: [
        { institution: "", degree: "", fieldOfStudy: "", duration: "" },
      ],
      projects: [
        { projectName: "", description: "", technologies: "", duration: "" },
      ],
    },
  });

  const { registerUser, isLoading, error, success, clearAuthMessages, user } =
    useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: methods.control,
    name: "skills",
  });
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: methods.control,
    name: "experience",
  });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: methods.control,
    name: "education",
  });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: methods.control,
    name: "projects",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (success) {
      navigate("/login");
    }
    return () => clearAuthMessages();
  }, [user, success, navigate, clearAuthMessages]);

  // Only submit on last step
  const onSubmit = async (data) => {
    // Transform skills and responsibilities to arrays
    const formattedData = {
      ...data,
      skills: data.skills.filter((skill) => skill.trim() !== ""),
      experience: data.experience.map((exp) => ({
        ...exp,
        responsibilities: Array.isArray(exp.responsibilities)
          ? exp.responsibilities.filter((resp) => resp.trim() !== "")
          : [],
      })),
    };
    console.log("Submitting registration data:", formattedData);
    
    await registerUser(formattedData);
  };

  // Next step handler with validation
  const handleNext = async () => {
    console.log("Attempting to go to the next step");
    const valid = await methods.trigger();
    console.log("Validation result:", valid);
    if (valid) {
      console.log("Validation passed, moving to the next step");
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    } else {
      console.log("Validation failed, not moving to the next step");
    }
  };

  // Previous step handler
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputField
              name="username"
              label="Username"
              placeholder="Enter your username"
              required
            />
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <InputField
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                Role
              </label>
              <select
                {...methods.register("role", { required: true })}
                className="w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)]"
              >
                <option value="">Select your role</option>
                <option value="Jobseeker">Jobseeker</option>
                <option value="Employer">Employer</option>
              </select>
            </div>
            <InputField
              name="headline"
              label="Headline"
              placeholder="e.g., Full Stack Developer"
            />
            <InputField
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself"
            />
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
              Experience
            </h3>
            {experienceFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 border rounded-lg">
                <InputField
                  name={`experience[${index}].organization`}
                  label="Organization"
                  placeholder="Enter organization name"
                />
                <InputField
                  name={`experience[${index}].role`}
                  label="Role"
                  placeholder="Enter role"
                />
                <InputField
                  name={`experience[${index}].duration`}
                  label="Duration"
                  placeholder="e.g., Jan 2020 - Dec 2022"
                />
                <div className="mb-2">
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Responsibilities
                  </label>
                  <textarea
                    {...methods.register(
                      `experience[${index}].responsibilities`
                    )}
                    className="w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)]"
                    placeholder="Enter responsibilities (one per line)"
                    rows="4"
                  ></textarea>
                </div>
                {experienceFields.length > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => removeExperience(index)}
                  >
                    Remove Experience
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                appendExperience({
                  organization: "",
                  role: "",
                  duration: "",
                  responsibilities: [""],
                })
              }
            >
              Add Experience
            </Button>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4 mt-6">
              Education
            </h3>
            {educationFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 border rounded-lg">
                <InputField
                  name={`education[${index}].institution`}
                  label="Institution"
                  placeholder="Enter institution name"
                />
                <InputField
                  name={`education[${index}].degree`}
                  label="Degree"
                  placeholder="Enter degree"
                />
                <InputField
                  name={`education[${index}].fieldOfStudy`}
                  label="Field of Study"
                  placeholder="Enter field of study"
                />
                <InputField
                  name={`education[${index}].duration`}
                  label="Duration"
                  placeholder="e.g., 2016 - 2020"
                />
                {educationFields.length > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => removeEducation(index)}
                  >
                    Remove Education
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                appendEducation({
                  institution: "",
                  degree: "",
                  fieldOfStudy: "",
                  duration: "",
                })
              }
            >
              Add Education
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
              Skills
            </h3>
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex items-center mb-2">
                <InputField
                  name={`skills[${index}]`}
                  label={`Skill ${index + 1}`}
                  placeholder="Enter a skill"
                />
                {skillFields.length > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => removeSkill(index)}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => appendSkill("")}
            >
              Add Skill
            </Button>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4 mt-6">
              Projects
            </h3>
            {projectFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 border rounded-lg">
                <InputField
                  name={`projects[${index}].projectName`}
                  label="Project Name"
                  placeholder="Enter project name"
                />
                <InputField
                  name={`projects[${index}].description`}
                  label="Description"
                  placeholder="Enter project description"
                />
                <InputField
                  name={`projects[${index}].technologies`}
                  label="Technologies"
                  placeholder="Enter technologies used"
                />
                <InputField
                  name={`projects[${index}].duration`}
                  label="Duration"
                  placeholder="e.g., Jan 2023 - Mar 2023"
                />
                {projectFields.length > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => removeProject(index)}
                  >
                    Remove Project
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                appendProject({
                  projectName: "",
                  description: "",
                  technologies: "",
                  duration: "",
                })
              }
            >
              Add Project
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      <div className="flex justify-center flex-grow overflow-auto py-8">
        <div className="w-full max-w-3xl bg-white dark:bg-[var(--color-background)] shadow-lg rounded-lg flex flex-col h-full max-h-[90vh]">
          <div className="p-6 overflow-y-auto flex-grow">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">
              Register - Step {step} of {TOTAL_STEPS}
            </h2>
            {/* Step Indicators */}
            <div className="flex justify-between mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-1/3 h-2 mx-1 rounded-full ${
                    s <= step
                      ? "bg-[var(--color-primary)]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <div className="space-y-6">{renderStep()}</div>
                {/* Error or Success */}
                {error && (
                  <p className="text-red-500 text-sm mt-4" role="alert">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-green-500 text-sm mt-4" role="alert">
                    {success}
                  </p>
                )}
                {/* Link to Login */}
                <p className="mt-6 text-sm text-[var(--color-text)] text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    Login
                  </Link>
                </p>
                {/* Only show Register button on last step */}
                {step === TOTAL_STEPS && (
                  <div className="flex justify-end mt-8">
                    <Button type="submit" isLoading={isLoading}>
                      Register
                    </Button>
                  </div>
                )}
              </form>
            </FormProvider>
          </div>
          {/* Sticky Bottom Button Bar */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[var(--color-background)] flex justify-between">
            {step > 1 ? (
              <Button type="button" variant="secondary" onClick={handlePrev}>
                Previous
              </Button>
            ) : (
              <span />
            )}
            {step < TOTAL_STEPS && (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
