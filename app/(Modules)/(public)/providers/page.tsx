import React from "react";
import ProviderCard from "./_Components/provider-card";
import UpdateProviderData from "./_Components/update-provider-card-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddAvailableTimes from "./_Components/add-available-time";
import Provider from "./entities/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider",
};

const ProviderPage = async () => {
  const response = await fetch("http://localhost:5000/api/provider-profile");
  const providers: Provider[] = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <Input
        type="search"
        placeholder="Search providers...🔍"
        className="mb-4"
      />{" "}
      <Button>Search</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {providers.map((provider, index) => (
          <ProviderCard key={index} {...provider} />
        ))}
      </div>
      <UpdateProviderData />
      <AddAvailableTimes />
    </div>
  );
};

export default ProviderPage;
