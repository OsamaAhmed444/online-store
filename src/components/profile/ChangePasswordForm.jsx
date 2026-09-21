import { useState } from "react";
import { Lock, Eye, EyeOff, X } from "lucide-react";

const ChangePasswordForm = ({ onClose }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Change password:", formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-orange-500/30 bg-[#101114] p-6 shadow-2xl shadow-orange-500/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Change <span className="text-orange-500">Password</span>
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Keep your account secure
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-full hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            show={showCurrent}
            setShow={setShowCurrent}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            show={showNew}
            setShow={setShowNew}
          />

          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            show={showConfirm}
            setShow={setShowConfirm}
          />

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 font-semibold text-gray-300 border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center flex-1 gap-2 py-3 font-semibold text-black bg-orange-500 rounded-xl hover:bg-orange-400"
            >
              <Lock size={18} />
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange, show, setShow }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute text-orange-500 -translate-y-1/2 left-4 top-1/2"
        />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-white/10 bg-[#17181c] py-3 pl-12 pr-12 text-white outline-none focus:border-orange-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2 hover:text-white"
        >
          {show ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
