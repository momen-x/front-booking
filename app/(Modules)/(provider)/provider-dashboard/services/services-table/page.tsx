"use client";

import React from "react";
import { useGetProviderServices } from "../_hooks/useGetProviderServices";
import ServicesTable from "../_components/services-table";

const ServicePage = () => {
  const { data: services, isLoading } = useGetProviderServices();

  return (
    <div>
      <ServicesTable isLoading={isLoading} services={services ?? []} />
    </div>
  );
};

export default ServicePage;
