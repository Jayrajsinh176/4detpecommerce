import React, { useState, useRef, useEffect } from 'react'
import { LiaInfoCircleSolid } from "react-icons/lia";
import axios from "axios";

function Helpform() {

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({

    category: '',
    subject: '',
    details: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [tickets, setTickets] = useState([]);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  // 🔥 AUTO FILL USER DATA
  useEffect(() => {
    window.scrollTo(0, 0);

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setFormData(prev => ({
        ...prev,
        mobile_no: user.mobile_no || '',
        email: user.email || ''
      }));
    }

    fetchTickets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!formData.category || formData.category === "Select Category") {
      errors.category = "Please select a category";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.details.trim()) {
      errors.details = "Details are required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const form = new FormData();

      form.append("member_id", user.id); // ✅ MAIN
      form.append("category", formData.category);
      form.append("subject", formData.subject);
      form.append("details", formData.details);

      if (fileInputRef.current.files[0]) {
        form.append("image", fileInputRef.current.files[0]);
      }

      await axios.post("http://127.0.0.1:8000/api/help-ticket", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("We have received your query. We will contact you soon.");

      setFormData(prev => ({
        ...prev,
        category: '',
        subject: '',
        details: ''
      }));

      setImagePreview(null);

      fetchTickets();

    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error?.response);
      console.log("DATA:", error?.response?.data);

      alert(error?.response?.data?.message || "Something went wrong!");
    }

  };

  // 🔥 FETCH TICKETS
  const fetchTickets = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://127.0.0.1:8000/api/help-ticket/${user.id}`
      );

      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-3 sm:px-4 md:px-6 py-4 sm:py-10">
      <div className="max-w-5xl mx-auto">

        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Home &gt; Help &gt; New Ticket
        </p>

        <h1 className="text-xl sm:text-2xl font-semibold mb-2">How can we help?</h1>
        <p className="text-xs sm:text-sm text-gray-700 font-semibold mb-6 sm:mb-8">
          Need assistance with your order or interested in joining Team Tira?
          Submit a ticket here. Have you looked at our{" "}
          <span className="text-red-500 cursor-pointer">FAQs</span>?
        </p>

        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>

          {/* ✅ AUTO-FILLED + DISABLED */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile_no || ''}
                readOnly
                className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                readOnly
                className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Select Category</option>
              <option>Order Issue</option>
              <option>Account Issue</option>
              <option>General Query</option>
            </select>
            {formErrors.category && <p className="text-red-500 text-xs">{formErrors.category}</p>}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Subject<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              onChange={handleChange}
              value={formData.subject}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
            {formErrors.subject && <p className="text-red-500 text-xs">{formErrors.subject}</p>}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Share details here<span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              name="details"
              onChange={handleChange}
              value={formData.details}
              className="w-full border rounded-md px-3 py-2 resize-none text-sm"
            />
            {formErrors.details && <p className="text-red-500 text-xs">{formErrors.details}</p>}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">
              Upload Image (Optional)
            </label>

            <div
              onClick={handleFileClick}
              className="border rounded-md px-3 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-600 text-center">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (Max 2MB)</span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/png,image/jpeg,image/jpg"
              />
            </div>

            {error && (
              <div className="mt-2 bg-red-100 text-red-700 text-xs px-3 py-2 rounded text-center">
                {error}
              </div>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 max-h-40 sm:max-h-48 object-contain border rounded"
              />
            )}

            <div className="mt-2 bg-yellow-100 text-xs px-3 py-2 rounded text-center">
              <LiaInfoCircleSolid className="inline text-lg text-red-600 mr-2" />
              <span>Upload clear images of Product & Packaging Box in PNG, JPG, JPEG format only</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 text-sm"
          >
            Submit
          </button>

        </form>

        {/* ✅ USER TICKETS */}
       {/* ✅ USER TICKETS */}
<div className="mt-10">
  <h2 className="text-lg font-semibold mb-4">Support Chat</h2>

  {tickets.length === 0 && (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-500">No tickets submitted yet</p>
      <p className="text-xs text-gray-400 mt-1">Your support conversations will appear here</p>
    </div>
  )}

  <div className="space-y-4">
    {tickets.map((t) => (
      <div key={t.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        {/* Ticket Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{t.subject}</p>
              <p className="text-xs text-gray-400">{t.category}</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ml-2 ${
            t.status === 'pending'
              ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200'
              : 'bg-green-50 text-green-600 ring-1 ring-green-200'
          }`}>
            {t.status === 'pending' ? '⏳ Pending' : '✅ Resolved'}
          </span>
        </div>

        {/* Chat Body */}
        <div className="px-4 py-5 space-y-4 bg-white">

          {/* User Message */}
          <div className="flex items-end gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              You
            </div>
            <div className="flex flex-col gap-1 max-w-[80%]">
              <div className="bg-gray-100 text-gray-800 text-sm rounded-2xl rounded-bl-sm px-4 py-2.5 leading-relaxed">
                {t.details}
              </div>
              {t.created_at && (
                <span className="text-[10px] text-gray-400 pl-1">
                  {new Date(t.created_at).toLocaleString('en-IN', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              )}
            </div>
          </div>

          {/* Agent Reply */}
          {t.admin_reply ? (
            <div className="flex items-end gap-2.5 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                CS
              </div>
              <div className="flex flex-col items-end gap-1 max-w-[80%]">
                <div className="bg-blue-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed shadow-sm shadow-blue-100">
                  {t.admin_reply}
                </div>
                <span className="text-[10px] text-gray-400 pr-1">Customer Support</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:300ms]" />
              </div>
              <span className="text-xs text-gray-400">Support team will reply soon</span>
            </div>
          )}

        </div>

      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}

export default Helpform;