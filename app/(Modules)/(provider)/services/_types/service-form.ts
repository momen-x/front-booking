import Service from "../../../(public)/services/_entity/service";

type AddMode = {
  goal: "add";
  service?: never;
  id?: never;
};

type UpdateMode = {
  goal: "update";
  id: string;
  service: Service;
};

export type TServiceProps = (AddMode | UpdateMode) & {
  description?: string;
  providerId: string;
};
