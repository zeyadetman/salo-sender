import {
  Box,
  Button,
  LinearProgress,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import Lottie from "lottie-react";
import animationData from "@/assets/lottie-register.json";
import { useTheme } from "@mui/material/styles";
import React from "react";
import {
  FormContainerStyled,
  FormOverviewContainerStyled,
  FormStyled,
} from "@/modules/auth/styles";

interface IRegisterationForm {
  email: string;
  name: string;
  password: string;
}

export const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
      }}
      validate={(values) => {
        const errors: Partial<IRegisterationForm> = {};
        if (!values.name) {
          errors.name = "Required";
        }

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <FormContainerStyled>
            <FormOverviewContainerStyled>
              <Typography variant="h4">Join us</Typography>
              {isMobile ? null : (
                <>
                  <Typography variant="subtitle1" fontStyle="italic">
                    and start delivering
                  </Typography>
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    style={{
                      height: "200px",
                    }}
                  />
                </>
              )}
            </FormOverviewContainerStyled>
            <FormStyled>
              <Field
                component={TextField}
                name="name"
                type="name"
                label="Name"
              />
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />
              <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
              />
              {isSubmitting && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </FormStyled>
          </FormContainerStyled>
        </Form>
      )}
    </Formik>
  );
};
