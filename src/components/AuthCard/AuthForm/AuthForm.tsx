import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button, StyledField, ButtonSize, ButtonAction } from '@/components';
import styles from './AuthForm.module.scss';

const AuthSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  userName: Yup.string().required('Username is required'),
});

interface InitialFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export const AuthForm = (): JSX.Element => {
  const initialValues: InitialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  };

  const handleLocalAuthSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AuthSchema}
      onSubmit={handleLocalAuthSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.root}>
          <StyledField
            name="firstName"
            placeholder="First name"
            error={errors.firstName}
            touched={touched.firstName}
          />
          <StyledField
            name="lastName"
            placeholder="Last name"
            error={errors.lastName}
            touched={touched.lastName}
          />
          <StyledField
            name="email"
            type="email"
            placeholder="Email"
            error={errors.email}
            touched={touched.email}
          />
          <StyledField
            name="username"
            type="username"
            placeholder="Username"
            error={errors.username}
            touched={touched.username}
          />
          <Button
            size={ButtonSize.small}
            action={ButtonAction.secondary}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
