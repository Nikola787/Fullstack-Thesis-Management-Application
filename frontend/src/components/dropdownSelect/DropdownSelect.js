import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useEffect } from "react";

import { getAllTeachers } from "../../services/service";
import { getAllStudents } from "../../services/service";
import { getTableData } from "../../services/service";

const CssDropdown = styled(FormControl)({
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

export const DropdownSelect = (props) => {
  const [person, setPerson] = React.useState();
  const [dataArr, setDataArr] = React.useState([]);

  const [menuItem, setMenuItem] = React.useState("");

  useEffect(() => {
    if (props.label === "Mentor") {
      // izvuci sve mentore i napuni dropdown listu
      getAllTeachers(setDataArr);
    } else if (props.label === "Član komisije") {
      // izvuce sve clanove komisije i napuni dropdown listu
      getAllTeachers(setDataArr);
    } else if (props.label === "Student") {
      // izvuci sve studente koji nemaju prijavljen diplomski rad!
      //     getTableData(setJsonData);
      getAllStudents(setDataArr);
    }
    setPerson("");
    props.setId("");
  }, [props.updated]);

  const defaultProps = {
    options: dataArr,
    getOptionLabel: (item) => {
      if (props.label === "Mentor" || props.label === "Član komisije") {
        return `${item.name} ${item.surname}`;
      } else if (props.label === "Student") {
        return `${item.name} ${item.surname} (${item.index_number})`;
      }
      // Default fallback label
      return "";
    },
  };

  return (
    <CssDropdown variant="standard" sx={{ m: 0, marginTop: 0, minWidth: 250 }}>
      <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        onChange={(event, newValue) => {
          setPerson(newValue);
          props.setId(newValue.id);
        }}
        renderInput={(params) => (
          <TextField {...params} label={props.label} variant="standard" />
        )}
        disableClearable={true}
      />
    </CssDropdown>
  );
};
