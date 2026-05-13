"use server";
import User from "@/app/(Modules)/(shared)/__entities/user";
import { cookies } from "next/headers";

export const getAllUser = async (): Promise<User[] | null> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  const response = await fetch("http://localhost:5000/api/users", {
    headers: {
      Cookie: allCookies,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    return null;
  }
  const users = await response.json();
  return users;
};

export const getSingleUser = async (id: string): Promise<User | null> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    headers: {
      Cookie: allCookies,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    return null;
  }
  const user = await response.json();
  return user;
};

// export const dealWithUserByAdmin = async (id: string) => {}
