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
      <div className="w-full max-w-xl rounded-2xl border border-primary/30 bg-surface p-6 shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Edit <span className="text-primary">Profile</span>
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your personal information
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-muted-foreground transition rounded-full hover:bg-surface-hover hover:text-foreground"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              Username
            </label>

            <div className="relative">
              <User
                size={19}
                className="absolute text-primary -translate-y-1/2 left-4 top-1/2"
              />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-muted py-3 pl-12 pr-4 text-foreground outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              Email
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute text-primary -translate-y-1/2 left-4 top-1/2"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-muted py-3 pl-12 pr-4 text-foreground outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              Phone
            </label>

            <div className="relative">
              <Phone
                size={19}
                className="absolute text-primary -translate-y-1/2 left-4 top-1/2"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-muted py-3 pl-12 pr-4 text-foreground outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 font-semibold text-muted-foreground transition border rounded-xl border-border bg-muted hover:bg-surface-hover"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center flex-1 gap-2 py-3 font-semibold text-primary-foreground transition bg-primary rounded-xl hover:bg-primary-hover"
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
