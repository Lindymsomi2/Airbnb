import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.18);
  padding: 5px 5px 5px 16px;
  max-width: 850px;
  width: 100%;
  max-height:70px;
  margin: 0 auto;
  
  

  .search-btn {
    background: #ff385c;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    flex-shrink: 0;
    margin-left: 8px;

    &:hover {
      background: #e0314f;
    }
  }
`;

export const FormGroup = styled.div`
  flex: 1;
  padding: 8px 16px;
  border-right: 1px solid #ebebeb;
  cursor: pointer;
  min-width: 0;

  &:last-of-type {
    border-right: none;
  }

  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 2px;
    color: #222;
  }

  .form-select,
  .form-control {
    border: none;
    padding: 0;
    font-size: 14px;
    color: #717171;
    background: transparent;
    box-shadow: none;
    cursor: pointer;

    &:focus {
      box-shadow: none;
      outline: none;
    }
  }
`;


