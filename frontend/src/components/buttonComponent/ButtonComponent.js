import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#8D8741",
  "&:hover": {
    backgroundColor: "#DAAD86",
  },
}));

export const ButtonComponent = (props) => {
  return (
    <ColorButton
      variant="contained"
      style={{ alignSelf: "flex-start", width: "100%" }}
      size={props.size ? props.size : "medium"}
      disabled={props.disabled ? props.disabled : false}
      onClick={props.onClick}
      href={props.href ? props.href : undefined}
      target="_blank"
    >
      {props.name && props.name}
      {!props.name && (
        <input type="file" accept=".pdf" />
      )}
    </ColorButton>
  );
};

export default ButtonComponent;
