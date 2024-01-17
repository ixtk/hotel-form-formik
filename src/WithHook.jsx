import { useFormik } from "formik";
import { string, boolean, object } from "yup";

/*
const validateForm = (values) => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Minimum 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (/\S+@\S+\.\S+/.test(values.email) === false) {
    errors.email = "Invalid email format";
  }

  if (!values.roomType) {
    errors.roomType = "Room type is required";
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = "Accept terms to continue";
  }

  return errors;
};
*/

const formInitialValues = {
  fullName: "",
  email: "",
  roomType: "double",
  termsAccepted: false,
};

const submitForm = (values, submitProps) => {
  setTimeout(() => {
    console.log("Saving", values);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  }, 1500);
};

const formSchema = object({
  fullName: string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Fullname is required"),
  email: string()
    .matches(/\S+@\S+\.\S+/, "Invalid email format")
    .min(4, "Minimum 4 characters")
    .required("Email is required"),
  roomType: string().required("Room type is required"),
  termsAccepted: boolean().oneOf([true], "Please accept terms and conditions"),
});

function WithHook() {
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: formSchema,
    onSubmit: submitForm,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <fieldset>
        <legend>Book a room</legend>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && (
            <span className="error">{formik.errors.fullName}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && (
            <span className="error">{formik.errors.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="checkInDate">Room type</label>
          <select
            name="roomType"
            value={formik.values.roomType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
          {formik.touched.roomType && (
            <span className="error">{formik.errors.roomType}</span>
          )}
        </div>
        <div className="terms">
          <label htmlFor="termsAccepted">Accept terms and conditions</label>
          <input
            id="termsAccepted"
            name="termsAccepted"
            type="checkbox"
            checked={formik.values.termsAccepted}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.termsAccepted && (
            <span className="error">{formik.errors.termsAccepted}</span>
          )}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Reserve"}
        </button>
      </fieldset>
    </form>
  );
}

export default WithHook;
