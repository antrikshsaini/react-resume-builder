import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { fetchUserData, updateUser } from "../redux/actionCreators";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(4),
  },
  container: {
    maxWidth: "50%",
    marginLeft: "25%",
    marginRight: "0",
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      marginLeft: "unset",
    },
  },
  paper: {
    //marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  React.useEffect(() => {
    if (props.token) {
      props.fetchUserData(props.token, function () {
        //history.push("/builder")
      });
    }
  }, [props.token]); //eslint-disable-line

  React.useEffect(() => {
    if (props.resume.userData) {
      setValues({
        first_name: props.resume.userData.first_name,
        last_name: props.resume.userData.last_name,
        email: props.resume.userData.email,
      });
    }
  }, [props.resume.userData]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    const userData = {
      first_name: values.first_name || undefined,
      last_name: values.last_name || undefined,
      email: values.email || undefined,
    };
    props.updateUser(userData, props.token);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Personal Details
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="first_name"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="first_name"
                  onChange={handleChange("first_name")}
                  value={values.first_name}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="last_name"
                  onChange={handleChange("last_name")}
                  value={values.last_name}
                  label="Last Name"
                  name="last_name"
                  autoComplete="last_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  onChange={handleChange("email")}
                  value={values.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={clickSubmit}
            >
              Update Details
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    resume: state.resume,
    token: state.resume.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (props, callback) => {
    dispatch(fetchUserData(props, callback));
  },
  updateUser: (userData, token) => {
    dispatch(updateUser(userData, token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
