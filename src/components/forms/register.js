import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginForm = ({ className, formClass, onSubmit = () => { } }) => {
    return (
        <div className={className}>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    email: '',
                }}
                onSubmit={onSubmit}
                render={({ errors, touched, isSubmitting }) => (
                    <Form >
                        <div className={formClass}>
                            <Field type="text" name="username" placeholder="Username" />
                            {errors.username && touched.username && <div>{errors.username}</div>}
                            <Field type="email" name="email" placeholder="Email" />
                            {errors.email && touched.social.email && <div>{errors.email}</div>}
                            <Field type="password" name="password" placeholder="Password" />
                            {errors.password && touched.password && <div>{errors.password}</div>}
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            />
            <style jsx>{`
                .${formClass}{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
                .${formClass} input {
                    padding: 20px;
                }
                 
                `}</style>
        </div>
    )
}

export default LoginForm;