import styled, { css } from "styled-components";

export const FieldLabel = styled.label`
  font-size: 12px;
  position: absolute;
  top: -7px;
  left: 10px;
  padding: 0 4px;
  background: white;
  display: none;
`;

export const inputBase = css`
  box-sizing: border-box;
  display: block;
  height: 54px;
  line-height: 16px;
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
  padding: 16px 12px;

  :focus::placeholder {
    color: transparent;
  }

  :focus + ${FieldLabel} {
    display: block;
  }
`;

export const Input = styled.input`
  ${inputBase}
`;

export const TextArea = styled.textarea`
  ${inputBase};
  height: auto;
`;

export const TextField = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;

  & + & {
    margin-top: 16px;
  }
`;

export const Button = styled.button`
  font-family: "Roboto", sans-serif;
  min-width: 64px;
  height: 36px;
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px 0px,
    rgba(0, 0, 0, 0.137255) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.117647) 0px 3px 1px -2px;
`;

export const Form = styled.form`
  padding: 8px 16px;
  
  ${TextField} + ${Button} {
    margin-top: 16px
  }
`;
