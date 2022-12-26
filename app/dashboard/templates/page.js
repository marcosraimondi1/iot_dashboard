"use client";
import Template from "../../Components/Template/Template";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "../../Components/Card/Card";
import Button from "@mui/material/Button";
import TemplatesList from "../../Components/Lists/TemplatesList";
import useTemplates from "./useTemplates";

export default function Templates() {
  const {
    selectedWidget,
    setSelectedWidget,
    templates,
    widgets,
    templateNameRef,
    deleteWidget,
    deleteTemplate,
    saveTemplate,
    widgetForm,
    widgetsOptions,
  } = useTemplates();

  return (
    <>
      <h1>Templates</h1>
      <TextField
        select
        value={selectedWidget}
        onChange={(e) => {
          setSelectedWidget(e.target.value);
        }}
      >
        {widgetsOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {widgetForm}
      <Template widgets={widgets} deleteWidget={deleteWidget} />
      <Card title="">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "10px",
            marginTop: "50px",
          }}
        >
          <TextField
            required
            label="Template Name"
            onChange={(e) => {
              templateNameRef.current = e.target.value;
            }}
            sx={{ width: "100%", margin: "5px" }}
          ></TextField>
          <Button variant="contained" onClick={saveTemplate}>
            Save
          </Button>
        </div>
      </Card>
      <div style={{ margin: "15px" }}>
        <TemplatesList templates={templates} del={deleteTemplate} />
      </div>
    </>
  );
}
