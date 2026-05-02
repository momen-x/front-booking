import { useQuery } from "@tanstack/react-query";
import resService from "../_repo/resService";
import Service from "@/app/(Modules)/(public)/services/_entity/service";

export const SERVICES_KEY = "services";
export const useGetProviderServices = () => {
  return useQuery<Service[] | null, Error>({
    queryKey: [SERVICES_KEY],
    queryFn: resService.getServicesByProvider,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
