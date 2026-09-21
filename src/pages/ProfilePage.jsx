import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Pencil,
  Plus,
  LogOut,
  CheckCircle,
  Globe,
  Building2,
  Home,
  Hash,
} from "lucide-react";

import { getMe, logout } from "../api/authApi";
import { updateProfile } from "../api/userApi";

import ProfileForm from "../components/profile/ProfileForm";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();

        const userData =
          response?.data?.data || response?.data?.user || response?.data;

        setUser(userData);
      } catch (error) {
        console.error("Failed to get user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async (data) => {
    try {
      const id = user?._id || user?.id;

      const response = await updateProfile(id, data);

      const updatedUser =
        response?.data?.data || response?.data?.user || response?.data;

      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        ...data,
      }));

      setShowEdit(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070809] px-4 py-20 text-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#070809] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
        <div className="absolute right-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[120px]" />

        <div className="absolute left-[-200px] bottom-20 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-6xl px-4 py-12 mx-auto md:px-8">
        <section className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Account
          </p>

          <h1 className="text-4xl font-black md:text-5xl">
            My <span className="text-orange-500">Profile</span>
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your personal information and account settings.
          </p>
        </section>

        <section className="mb-4 rounded-2xl border border-white/10 bg-[#111214]/90 p-5 shadow-xl backdrop-blur md:p-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-orange-500 bg-[#1b1c20]">
                  {user?.image || user?.avatar ? (
                    <img
                      src={user.image || user.avatar}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User size={42} className="text-orange-500" />
                  )}
                </div>

                <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#111214] bg-orange-500 text-black">
                  <User size={14} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {user?.username || user?.name || "ADMIN"}
                  </h2>

                  <CheckCircle
                    size={19}
                    fill="#22c55e"
                    className="text-green-500"
                  />
                </div>

                <p className="text-sm text-gray-400">
                  {user?.email || "admin@koda.com"}
                </p>

                <p className="text-sm text-gray-400">{user?.role || "Admin"}</p>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail size={15} className="text-orange-500" />
                    {user?.email || "admin@koda.com"}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone size={15} className="text-orange-500" />
                    {user?.phone || "01000000000"}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 font-semibold text-orange-500 transition border border-orange-500 rounded-xl hover:bg-orange-500 hover:text-black"
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          </div>
        </section>

        <section className="mb-4 rounded-2xl border border-white/10 bg-[#111214]/90 p-5 md:p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center text-orange-500 h-11 w-11 rounded-xl bg-orange-500/10">
              <MapPin size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Addresses</h2>

              <p className="text-sm text-gray-400">
                Manage your shipping addresses.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AddressInput icon={<Globe size={18} />} placeholder="Country" />

            <AddressInput icon={<MapPin size={18} />} placeholder="City" />

            <AddressInput icon={<Home size={18} />} placeholder="Street" />

            <AddressInput
              icon={<Building2 size={18} />}
              placeholder="Building"
            />

            <div className="md:col-span-2">
              <AddressInput
                icon={<Hash size={18} />}
                placeholder="Postal code"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 px-5 py-3 mt-5 font-semibold text-orange-500 transition border border-orange-500 rounded-xl hover:bg-orange-500 hover:text-black">
            <Plus size={19} />
            Add Address
          </button>
        </section>

        <section className="mb-4 rounded-2xl border border-white/10 bg-[#111214]/90 p-5 md:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center text-orange-500 h-11 w-11 rounded-xl bg-orange-500/10">
                <Lock size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold">Change Password</h2>

                <p className="text-sm text-gray-400">
                  Keep your account secure.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPassword(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 font-semibold text-orange-500 transition border border-orange-500 rounded-xl hover:bg-orange-500 hover:text-black"
            >
              <Lock size={17} />
              Change Password
            </button>
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full gap-2 py-4 font-bold transition bg-red-600 rounded-xl hover:bg-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>
      </main>

      {showEdit && (
        <ProfileForm
          user={user}
          onClose={() => setShowEdit(false)}
          onSave={handleUpdateProfile}
        />
      )}

      {showPassword && (
        <ChangePasswordForm onClose={() => setShowPassword(false)} />
      )}
    </div>
  );
};

const AddressInput = ({ icon, placeholder }) => {
  return (
    <div className="relative">
      <span className="absolute text-orange-500 -translate-y-1/2 left-4 top-1/2">
        {icon}
      </span>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#17181c] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500"
      />
    </div>
  );
};

export default ProfilePage;
