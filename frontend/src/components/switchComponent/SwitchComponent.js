import React from "react";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useEffect } from "react";

import { deleteResource, createResource } from "../../services/service";

const SwitchStyle = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#659DBD",
    "&:hover": {
      backgroundColor: alpha("#659DBD", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#659DBD",
  },
}));

export const SwitchComponent = (props) => {
  const [state, setState] = React.useState(false);

  useEffect(() => {
    setState(props.switch);
  }, [props]);

  const handleChange = async () => {
    if (state === true) {
      // const confirmed = window.confirm(
      //   "Da li ste sigurni da želite da podesite ovaj resurs kao neobavezan (ukoliko je student otpremio resurs, on ce biti obrisan) ?"
      // );
      // if (confirmed) {
      setState(!state);
      // delete metoda sa resursom ciji je ID prosledjen
      await deleteResource(props.id);
      props.set({
        required: false,
        download: false,
        published: false,
        href: undefined,
        id: undefined,
      });
      // }
    } else {
      // const confirmed = window.confirm(
      //   "Da li ste sigurni da zelite da stavite ovaj resurs kao zahtevani?"
      // );
      // if (confirmed) {
      setState(!state);
      let resource_id = 0;
      // create zahtev sa novim resursom
      if (props.label.includes("PDF")) {
        resource_id = await createResource(
          1,
          `pdf_file_${props.thesis_id}`,
          undefined,
          false,
          props.thesis_id
        );
      } else if (props.label.includes("PTT")) {
        resource_id = await createResource(
          2,
          `ptt_file_${props.thesis_id}`,
          undefined,
          false,
          props.thesis_id
        );
      } else if (props.label.includes("ZIP")) {
        resource_id = await createResource(
          3,
          `zip_file_${props.thesis_id}`,
          undefined,
          false,
          props.thesis_id
        );
      }
      props.set({
        required: true,
        download: false,
        published: false,
        href: undefined,
        id: resource_id,
      });
      // }
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <FormControlLabel
          control={
            <SwitchStyle
              checked={state}
              onChange={handleChange}
              name="switch"
              size={props.size ? props.size : "small"}
            />
          }
          label={props.label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchComponent;
