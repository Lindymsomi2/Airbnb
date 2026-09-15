import React from "react";
import { FormContainer } from "./Form.styled";
import Button from "../Button";

const Form = () => {
  return (
    <FormContainer>
      <h1>Login</h1>
      <form className=" form mx-auto p-4">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div>
          <label for="forgorPassword" className="form-label">
            Forgot Password
          </label>
        </div>
        <Button className="loginButton" color="primary" type="submit">
          Login
        </Button>
      </form>
    </FormContainer>
  );
};

export default Form;
