"use server";
import { cookies } from "next/headers";
import ProviderProfile from "@/app/(Modules)/(public)/providers/entities/provider";

export default async function getSingleProviderProfile(id: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(
    `http://localhost:5000/api/provider-profile/${id}`,
    {
      headers: {
        Cookie: allCookies,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  );

  if (!response.ok) return null;

  const provider = (await response.json()) as ProviderProfile;
  return provider;
}
