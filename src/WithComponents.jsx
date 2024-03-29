import { Formik, Form, Field, ErrorMessage } from "formik"
import { formSchema } from "./formSchema"
import { useState } from "react"
import { UserCard } from "./UserCard"

const formInitialValues = {
  fullName: "",
  email: "",
  roomType: "double",
  termsAccepted: false,
  roomView: ""
}

function WithComponents() {
  const [savedValues, setSavedValues] = useState(null)
  const [formVisible, setFormVisible] = useState(true)

  const submitForm = (values, submitProps) => {
    // network request simulation
    setTimeout(() => {
      console.log("Saving", values)
      submitProps.setSubmitting(false)
      submitProps.resetForm()
      setSavedValues(values)
      setFormVisible(false)
    }, 1500)
  }

  return (
    <>
      <UserCard
        savedValues={savedValues || {}}
        setFormVisible={setFormVisible}
      />
      {formVisible && (
        <Formik
          initialValues={savedValues || formInitialValues}
          onSubmit={submitForm}
          validationSchema={formSchema}
        >
          {(formik) => {
            console.log(formik)
            return (
              <Form>
                <fieldset>
                  <legend>Book a room</legend>
                  <div>
                    <label htmlFor="fullName">Full name</label>
                    <Field
                      name="fullName"
                      placeholder="John Doe"
                      type="text"
                      id="fullName"
                    />
                    <ErrorMessage
                      className="error"
                      component="span"
                      name="fullName"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      id="email"
                    />
                    <ErrorMessage
                      className="error"
                      component="span"
                      name="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="roomType">Room type</label>
                    <Field name="roomType" as="select" id="roomType">
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="suite">Suite</option>
                    </Field>
                    <ErrorMessage
                      className="error"
                      component="span"
                      name="roomType"
                    />
                  </div>
                  <div className="view-btns">
                    <button
                      className={`view-btn ${
                        formik.values.roomView === "city" ? "selected" : ""
                      }`}
                      type="button"
                      onClick={() => formik.setFieldValue("roomView", "city")}
                    >
                      City
                    </button>
                    <button
                      className={
                        formik.values.roomView === "sea"
                          ? "selected"
                          : "view-btn"
                      }
                      type="button"
                      onClick={() => formik.setFieldValue("roomView", "sea")}
                    >
                      Sea
                    </button>
                    <button
                      className={
                        formik.values.roomView === "garden"
                          ? "selected"
                          : "view-btn"
                      }
                      type="button"
                      onClick={() => formik.setFieldValue("roomView", "garden")}
                    >
                      Garden
                    </button>
                    {/* <label>
                  <span>City</span>
                  <Field name="roomView" type="radio" value="city" />
                </label>
                <label>
                  <span>Sea</span>
                  <Field name="roomView" type="radio" value="sea" />
                </label>
                <label>
                  <span>Garden</span>
                  <Field name="roomView" type="radio" value="garden" />
                </label> */}
                    <ErrorMessage
                      className="error"
                      component="span"
                      name="roomView"
                    />
                  </div>
                  <div className="terms">
                    <label htmlFor="termsAccepted">
                      Accept terms and conditions
                    </label>
                    <Field
                      name="termsAccepted"
                      type="checkbox"
                      id="termsAccepted"
                    />
                    <ErrorMessage
                      className="error"
                      component="span"
                      name="termsAccepted"
                    />
                  </div>
                  <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Loading..." : "Reserve"}
                  </button>
                </fieldset>
              </Form>
            )
          }}
        </Formik>
      )}
    </>
  )
}

export default WithComponents
