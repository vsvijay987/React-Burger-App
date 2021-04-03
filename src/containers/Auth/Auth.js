import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

const auth = props => {
  const [controls, setControls] = useState({
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Mail",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        touched: false,
        valid: false,
        value: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        touched: false,
        valid: false,
        value: "",
      }
    })

  const [isSignup, setIsSignup] = useState(true)
  

  useEffect(() => {
    if (!props.burgerBuilding && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }}, [])
  

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls)
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup
    );
  };

  const switchAuthHandler = () => {
    setIsSignup(!isSignup);
  };

  
    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation}
        changed={(event) => inputChangedHandler(event, formElement.id)}
      />
    ));

    if (props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
      errorMessage = <p>{props.error.message}</p>;
    }

    let authRedirect = null;
    if (props.isAuthenticate) {
      authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={switchAuthHandler}>
          SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticate: state.auth.tokenId !== null,
    burgerBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
