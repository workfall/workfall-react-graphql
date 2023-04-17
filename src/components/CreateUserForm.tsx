import { FunctionComponent } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/CreateUserForm.module.css';
import { gql, useMutation } from "@apollo/client";

interface CreateUserFormProps {

}

interface FormValues {
    username: string;
    email: string;
    fullName: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    fullName: Yup.string().required('Full name is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
        username
        email
        fullName
        password
    }
  }
`;


const CreateUserForm: FunctionComponent<CreateUserFormProps> = () => {
    const [createUser, /*{ data, loading, error }*/] = useMutation(CREATE_USER);
    const initialValues: FormValues = {
        username: '',
        email: '',
        fullName: '',
        password: '',
    };

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        // Implement your registration logic here
        createUser({ variables: { user: values } });
        setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <div className={styles.form_container}>
                    <h2>Register</h2>
                    <Form>
                        <div className={styles.form_field}>
                            <label htmlFor="username">Username:</label>
                            <Field id="username" name="username" type="text" />
                            <ErrorMessage name="username" component="div" className={styles.form_error} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="email">Email:</label>
                            <Field id="email" name="email" type="email" />
                            <ErrorMessage name="email" component="div" className={styles.form_error} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="fullName">Full Name:</label>
                            <Field id="fullName" name="fullName" type="text" />
                            <ErrorMessage name="fullName" component="div" className={styles.form_error} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="password">Password:</label>
                            <Field id="password" name="password" type="password" />
                            <ErrorMessage name="password" component="div" className={styles.form_error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submit_button}>
                            Register
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );

}

export default CreateUserForm;