// import { toast } from "react-toastify";
// import { TRegisterForm } from "../_dto/register";

// const handleRegisterSubmit = async (data: TRegisterForm) => {
//   handleRegister(
//     {
//       password: data.password,
//       username: data.username,
//       email: data.email,
//     },
//     {
//       onSuccess: () => {
//         toast.success("register successfully!");
//         localStorage.removeItem("registerFormData");
//         setTimeout(() => {
//           router.push("/");
//           router.refresh();
//         }, 500);
//       },
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       onError: (error: any) => {
//         const errorMessage = getErrorMessage(error);
//         toast.error(errorMessage);
//       },
//     },
//   );
// };
// export default handleRegisterSubmit;