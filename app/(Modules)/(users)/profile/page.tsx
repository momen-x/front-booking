import { Metadata } from "next";
import UserProfile from "./_components/user-profile";

export const metadata: Metadata = {
  title: "Profile",
  description: "user profile",
};
const ProfilePage = () => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
