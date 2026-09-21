import { useState } from "react";
import { User, Mail, Phone, X, Save } from "lucide-react";

const ProfileForm = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: user?.username || user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-orange-500/30 bg-[#101114] p-6 shadow-2xl shadow-orange-500/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Edit <span className="text-orange-500">Profile</span>
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Update your personal information
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition rounded-full hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>

            <div className="relative">
              <User
                size={19}
                className="absolute text-orange-500 -translate-y-1/2 left-4 top-1/2"
              />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#17181c] py-3 pl-12 pr-4 text-white outline-none transition focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute text-orange-500 -translate-y-1/2 left-4 top-1/2"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#17181c] py-3 pl-12 pr-4 text-white outline-none transition focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Phone
            </label>

            <div className="relative">
              <Phone
                size={19}
                className="absolute text-orange-500 -translate-y-1/2 left-4 top-1/2"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#17181c] py-3 pl-12 pr-4 text-white outline-none transition focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 font-semibold text-gray-300 transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center flex-1 gap-2 py-3 font-semibold text-black transition bg-orange-500 rounded-xl hover:bg-orange-400"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
