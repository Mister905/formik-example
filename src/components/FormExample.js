import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const FormExample = ({ values, errors, touched }) => {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>

      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>

      <label htmlFor="newsletter">
        <Field type="checkbox" name="newsletter" checked={values.newsletter} />
        Join our Newsletter
      </label>
      <Field component="select" name="plan">
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </Field>
      <input type="submit" value="Submit" />
    </Form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || true,
      plan: plan || "free"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(9, "Password must be 9 characters or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors }) {
    // Async code here
    setTimeout(() => {
        if (values.email == 'jdoe@gmail.com') {
            setErrors({ email: 'That email is already taken' })
        } else {
            resetForm();
        }
    }, 2000)
  }
})(FormExample);

export default FormikForm;
