// import { TService } from "../_dto/add-service";
// import { TUpdateService } from "../_dto/update-service";

// const onSubmit = (
//   isUpdate: boolean,
//   data: TUpdateService | TService,
//   handleService: () => void,
// ) => {
//   if (isUpdate) {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (handleService as any)(
//       { id, data: data as TUpdateService },
//       {
//         onSuccess: () => {
//           toast.success("Service updated successfully!");
//           setTimeout(() => {
//             router.push("/services");
//             router.refresh();
//           }, 500);
//         },
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         onError: (error: any) => {
//           const errorMessage = getErrorMessage(error);
//           toast.error(errorMessage);
//         },
//       },
//     );
//   } else {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (handleService as any)(data as TService, {
//       onSuccess: () => {
//         toast.success("Service added successfully!");
//         setTimeout(() => {
//           form.reset();
//           router.refresh();
//         }, 500);
//       },
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       onError: (error: any) => {
//         const errorMessage = getErrorMessage(error);
//         toast.error(errorMessage);
//       },
//     });
//   }
// };
