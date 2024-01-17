import { string, boolean, object } from "yup"

export const formSchema = object({
  fullName: string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Fullname is required"),
  email: string()
    .matches(/\S+@\S+\.\S+/, "Invalid email format")
    .min(4, "Minimum 4 characters")
    .required("Email is required"),
  roomType: string().required("Room type is required"),
  termsAccepted: boolean().oneOf([true], "Please accept terms and conditions")
})
