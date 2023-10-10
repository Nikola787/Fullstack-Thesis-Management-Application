import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

export const PasswordFieldComponent = (props) => {
  return (
    <CssTextField
      type="password"
      onChange={props.onChange}
      id="standard-password-input"
      label={props.label}
      //   value={props.defaultValue}
      autoComplete="current-password"
      variant="standard"
      fullWidth
      disabled={props.disabled ? props.disabled : false}
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#000000",
        },
      }}
      InputLabelProps={{
        shrink: props.shrink,
      }}
    />
  );
};

export default PasswordFieldComponent;
