"use client";
import Template from "../../Components/Template/Template";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "../../Components/Card/Card";
import Button from "@mui/material/Button";
import TemplatesList from "../../Components/Lists/TemplatesList";
import useTemplates from "./useTemplates";
import useGetSize from "../useGetSize";
export default function Templates() {
  const { width } = useGetSize();
  const {
    selectedWidget,
    setSelectedWidget,
    templates,
    widgets,
    templateName,
    setTemplateName,
    templateDescription,
    setTemplateDescription,
    deleteWidget,
    deleteTemplate,
    saveTemplate,
    widgetForm,
    widgetsOptions
  } = useTemplates();

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Templates</h1>
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12}>
        {widgetForm}
      </Grid>
      <Grid item xs={12}>
        <Template widgets={widgets} deleteWidget={deleteWidget} />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: "20px", marginBottom: "20px", alignItems: "center" }}>
        <Card title="">
          <Grid
            container
            spacing={1}
            sx={{ paddingBottom: "15px", alignItems: "center", justifyContent: "space-evenly" }}
          >
            <Grid item xs={width < 650 ? 12 : 5}>
              <TextField
                required
                label="Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                sx={{ width: "100%", marginLeft: "5px", marginRight: "5px" }}
              ></TextField>
            </Grid>
            <Grid item xs={width < 650 ? 12 : 5}>
              <TextField
                required
                label="Template Description"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                sx={{ width: "100%", marginLeft: "5px", marginRight: "5px" }}
              ></TextField>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" onClick={saveTemplate}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <TemplatesList templates={templates} del={deleteTemplate} />
      </Grid>
    </Grid>
  );
}
