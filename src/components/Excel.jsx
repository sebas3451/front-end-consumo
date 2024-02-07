import React, { Component } from "react";
import {
  Button,
  CardContent,
  Card,
  Backdrop,
  CircularProgress,
  Grid,
  Avatar,
  Typography,
  Switch,
  Stack,
  Divider,
  Collapse,
  Alert,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loading: false,
      token: "",
      checkFile:false,
      alert:{
        message:'Alerta',
        open:false
      }
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  componentDidMount() {
    this.handleToken();
  }

  handleAlert(message){
    this.setState({alert:{message:message,open:true}})
    setTimeout(() => {
      this.setState({alert:{message:'Alerta',open:false}});
    }, 5*1000);
  }

  async handleToken() {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "usuario",
          password: "contraseña",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ token: data.access_token });
      } else {
        throw new Error("Error en la autenticación");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      this.setState({
        selectedFile: file,
      });
    } else {
      alert("Please select a CSV file");
      event.target.value = null;
    }
  }

  handleUpload() {
    const { selectedFile, token, checkFile} = this.state;
    if (selectedFile) {
      this.setState({ loading: true });
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch(checkFile?"http://localhost:5000//upload_json":"http://localhost:5000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("La respuesta de la red no fue correcta");
          }
          return response.text();
        })
        .then((data) => {
          this.setState({ loading: false });
          this.handleAlert(data.message)
        })
        .catch((error) => {
          console.error("Error al cargar el archivo: ", error);
          this.setState({ loading: false });
        });
    }
  }
  handleChangeSwitch (event) {
    this.setState({checkFile : event.target.checked })
  }

  render() {
    const { loading, selectedFile, checkFile, alert} = this.state;
    return (
      <>
        <Collapse in={alert.open}>
        <Alert
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      </Collapse>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h6">Cargando Archivo</Typography>
        </Backdrop>
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems="center" justify="center">
              <Grid item xs={4}>
                <Typography variant="h9">Tipo de archivo</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>.CSV</Typography>
                  <AntSwitch
                    value={checkFile}
                    onChange={this.handleChangeSwitch}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>.JSON</Typography>
                </Stack>
              </Grid>
              <Grid item xs={8}>
                <Button variant="contained" component="label">
                  Subir archivo
                  <input
                    accept={checkFile?'.json':".csv"}
                    type="file"
                    hidden
                    onChange={this.handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={1}>
                <Avatar sx={{ bgcolor: selectedFile ? 'green' : ''}}>
                  <FolderIcon />
                </Avatar>
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h6">
                  {selectedFile
                    ? selectedFile.name
                    : "No hay archivo"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Button disabled={!selectedFile} variant="contained" onClick={this.handleUpload}>
                  cargar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  }
}
