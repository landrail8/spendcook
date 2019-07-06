import * as React from "react";

type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export default function useInput(defaultValue = "") {
  const [value, setValue] = React.useState(defaultValue);
  const onChange = React.useCallback<ChangeHandler>(e => {
    setValue(e.target.value);
  }, []);

  return [value, onChange] as [string, ChangeHandler];
}
