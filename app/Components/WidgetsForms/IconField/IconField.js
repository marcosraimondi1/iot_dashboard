import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import options from "./icons.json";
export default function IconField({ value, setValue, inputValue, setInputValue }) {
  return (
    <Autocomplete
      disablePortal
      options={options.icons}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Icon" />}
    />
  );
}
