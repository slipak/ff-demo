import { Box, Button, Paper, Stack } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useLazyGetUsersQuery } from "../users/api";
import FormField from "../../components/FormField";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/store";
import { saveUser } from "./authSlice";

const LoginPage = () => {
  const [authUser, { data }] = useLazyGetUsersQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = data?.[0];
    if (user) {
      dispatch(saveUser(user));
    }
  }, [data, dispatch]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", bgcolor: "grey.100" }}
    >
      <Box sx={{ minWidth: "320px" }}>
        <Paper sx={{ p: 2 }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              authUser({ email: values.email });
            }}
          >
            {({ handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                  <FormField
                    size="small"
                    name="email"
                    label="User Email"
                    required
                  />
                </Box>

                <Button
                  color="success"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Stack>
  );
};

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});

export default LoginPage;
