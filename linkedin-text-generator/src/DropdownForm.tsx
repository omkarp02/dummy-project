import { useState } from "react";

type FormType = "exp" | "post" | "hr" | ""; // Added "hr" as a new form type

interface FormData {
  name: string;
  job1?: string;
  job2?: string;
  postDescription?: string;
}

const DropdownForm: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormType>("exp"); // State for dropdown
  const [formData, setFormData] = useState<FormData>({ name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(e.target.value as FormType);
    resetForm(); // Reset form when dropdown changes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const pasteFromClipboard = async (field: keyof FormData) => {
    try {
      const text = await navigator.clipboard.readText();
      setFormData((prev) => ({ ...prev, [field]: text }));
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  };

  const handleSubmit = async () => {
    let copiedText = "";

    if (selectedForm === "exp") {
      copiedText = `Hi ${formData.name}, hope you're having a fantastic week! I came across your profile, and your journey from ${formData.job1} to ${formData.job2} stood out to me. If you don't mind sharing, what resource helped you the most in that shift? Would love to connect and learn from your insights!!`;
    } else if (selectedForm === "post") {
      copiedText = `Hey ${formData.name}, hope you're doing well! I've been loving your content, especially your recent post on ${formData.postDescription}. Just wanted to connect so I could stay up to date with your posts!`;
    } else if (selectedForm === "hr") {
      copiedText = `
Hi ${formData.name}, hope you're having a great week! I came across your profile while exploring ${formData.job1} opportunities and was impressed by your talent acquisition experience. I'd love to connect and explore any roles that align with my skills. Looking forward to learning from your insights!
      `;
    }

    try {
      await navigator.clipboard.writeText(copiedText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }

    resetForm(); // Reset form after submit
  };

  const resetForm = () => {
    setFormData({ name: "", job2: "Microsoft" }); // Reset all form fields
  };

  return (
    <div>
      <label>Select Form:</label>
      <select value={selectedForm} onChange={handleChange}>
        <option value="">Select</option>
        <option value="exp">Experience</option>
        <option value="post">Post</option>
        <option value="hr">HR</option> {/* New HR option */}
      </select>

      {selectedForm === "exp" && (
        <div>
          <h3>Experience Form</h3>
          <div>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <button onClick={() => pasteFromClipboard("name")}>📋 Paste</button>
          </div>
          <div>
            <input type="text" name="job1" placeholder="Job 1" value={formData.job1 || ""} onChange={handleInputChange} />
            <button onClick={() => pasteFromClipboard("job1")}>📋 Paste</button>
          </div>
          <div>
            <input type="text" name="job2" placeholder="Job 2" value={formData.job2 || ""} onChange={handleInputChange} />
            <button onClick={() => pasteFromClipboard("job2")}>📋 Paste</button>
          </div>
        </div>
      )}

      {selectedForm === "post" && (
        <div>
          <h3>Post Form</h3>
          <div>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <button onClick={() => pasteFromClipboard("name")}>📋 Paste</button>
          </div>
          <div>
            <input type="text" name="postDescription" placeholder="Post Description" value={formData.postDescription || ""} onChange={handleInputChange} />
            <button onClick={() => pasteFromClipboard("postDescription")}>📋 Paste</button>
          </div>
        </div>
      )}

      {selectedForm === "hr" && (
        <div>
          <h3>HR Form</h3>
          <div>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <button onClick={() => pasteFromClipboard("name")}>📋 Paste</button>
          </div>
          <div>
            <input type="text" name="job1" placeholder="Job" value={formData.job1 || ""} onChange={handleInputChange} />
            <button onClick={() => pasteFromClipboard("job1")}>📋 Paste</button>
          </div>
        </div>
      )}

      {selectedForm && (
        <div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={resetForm}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default DropdownForm;
