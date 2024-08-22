import React, { useState } from "react";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, input, useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [submissions, setSubmissions] = useState([]);

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    address: Yup.string().required("Address is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^(\+91\s?|0)?[789]\d{9}$/, "Phone number is not valid")
      .required("Phone Number is required"),
    heightFt: Yup.number().min(0).max(8).required("Height in feet is required"),
    weight: Yup.number().required("Weight is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      address: "",
      country: "",
      state: "",
      zipCode: "",
      email: "",
      phone: "",
      heightFt: "",
      heightIn: "",
      weight: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setSubmissions([...submissions, values]);
      resetForm();
      toast.success(" Data Saved Successfully ");
    },
  });

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "IN", label: "India" },
    { value: "CA", label: "Canada" },
    { value: "UAE", label: "United Arab Emirates" },
    { value: "JP", label: "Japan" },
  ];

  const stateOptions = {
    US: [
      { value: "CA", label: "California" },
      { value: "NY", label: "New York" },
      { value: "TX", label: "Texas" },
    ],
    IN: [
      { value: "TN", label: "Tamil Nadu" },
      { value: "DL", label: "Delhi" },
      { value: "KA", label: "Karnataka" },
    ],
    CA: [
      { value: "ON", label: "Ontario" },
      { value: "QC", label: "Quebec" },
      { value: "BC", label: "British Columbia" },
    ],
    UAE: [
      { value: "DXB", label: "Dubai" },
      { value: "AUH", label: "Abu Dhabi" },
      { value: "SHJ", label: "Sharjah" },
    ],
    JP: [
      { value: "TK", label: "Tokyo" },
      { value: "OS", label: "Osaka" },
      { value: "KY", label: "Kyoto" },
    ],
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            Sign In Form
          </Typography>
          <TextField
            margin="normal"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="firstName"
            label="firstName"
            name="firstName"
            helperText={
              formik.touched.firstName && formik.errors.firstName ? (
                <span style={{ color: "red" }}>{formik.errors.firstName}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>
          <TextField
            margin="normal"
            fullWidth
            type="text"
            variant="outlined"
            placeholder="lastName"
            label="lastName"
            name="lastName"
            helperText={
              formik.touched.lastName && formik.errors.lastName ? (
                <span style={{ color: "red" }}>{formik.errors.lastName}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>

          <TextField
            margin="normal"
            fullWidth
            type="text"
            variant="outlined"
            placeholder="middleName"
            label="middleName"
            name="middleName"
            helperText={
              formik.touched.middleName && formik.errors.middleName ? (
                <span style={{ color: "red" }}>{formik.errors.middleName}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.middleName}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>

          <TextField
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="address"
            label="address"
            name="address"
            helperText={
              formik.touched.address && formik.errors.address ? (
                <span style={{ color: "red" }}>{formik.errors.address}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.address}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>

          <FormControl fullWidth margin="normal">
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              name="country"
              required
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {countryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formik.values.country && (
            <FormControl fullWidth margin="normal">
              <InputLabel>State</InputLabel>
              <Select
                label="State"
                name="state"
                required
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {stateOptions[formik.values.country].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="zipCode"
            label="zipCode"
            name="zipCode"
            helperText={
              formik.touched.zipCode && formik.errors.zipCode ? (
                <span style={{ color: "red" }}>{formik.errors.zipCode}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.zipCode}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>

          <TextField
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="email"
            label="email"
            name="email"
            helperText={
              formik.touched.email && formik.errors.email ? (
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>

          <TextField
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="phone"
            label="phone"
            name="phone"
            helperText={
              formik.touched.phone && formik.errors.phone ? (
                <span style={{ color: "red" }}>{formik.errors.phone}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>

          <TextField
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="heightFt"
            label="heightFt"
            name="heightFt"
            helperText={
              formik.touched.heightFt && formik.errors.heightFt ? (
                <span style={{ color: "red" }}>{formik.errors.heightFt}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.heightFt}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>
          <TextField
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="weight"
            label="weight"
            name="weight"
            helperText={
              formik.touched.weight && formik.errors.weight ? (
                <span style={{ color: "red" }}>{formik.errors.weight}</span>
              ) : null
            }
            onChange={formik.handleChange}
            value={formik.values.weight}
            onBlur={formik.handleBlur}
            formik={formik}
          ></TextField>

          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="success"
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>

      {submissions.length > 0 && (
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={500}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          border={1}
          boxShadow={"5px 5px 5px 5px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 10px 10px #ccc",
            },
          }}
        >
          {submissions.map((submission, index) => (
            <div key={index}>
              <p>First Name: {submission.firstName}</p>
              <p>Last Name: {submission.lastName}</p>
              <p>Middle Name: {submission.middleName}</p>
              <p>
                Address: {submission.address},{" "}
                {submission.country === "US" ||
                submission.country === "IN" ||
                submission.country === "CA" ||
                submission.country === "UAE" ||
                submission.country === "JP"
                  ? submission.state + ", "
                  : ""}
                {submission.country}, {submission.zipCode}
              </p>
              <p>
                Email: {submission.email}. Phone Number: {submission.phone}.
              </p>
              <p>
                Height: {submission.heightFt} ft . Weight: {submission.weight}{" "}
                kg.
              </p>
            </div>
          ))}
        </Box>
      )}
    </>
  );
};

export default Form;
