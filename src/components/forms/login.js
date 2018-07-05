import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginForm = ({ user, onSubmit = () => { } }) => {
    return (
        <div>
            <Formik
                initialValues={user}
                onSubmit={onSubmit}
                render={({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" placeholder="Email" />
                        {errors.email && touched.social.email && <div>{errors.email}</div>}
                        <Field type="text" name="social.facebook" placeholder="Facebook" />
                        {errors.facebook && touched.social.facebook && <div>{errors.facebook}</div>}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                    </button>
                    </Form>
                )}
            />
        </div>
    )
}

export default LoginForm;