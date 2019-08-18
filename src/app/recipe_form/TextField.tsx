import * as React from "react";
import * as S from "./styled";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = (InputProps | TextAreaProps) & {
  id: string;
  label: string;
  multiline?: boolean;
};

let globalId = 0;

export default function TextField({
  id,
  className,
  style,
  label,
  multiline,
  ...props
}: Props) {
  const fieldId = `field-${globalId++}`;
  return (
    <S.TextField>
      {multiline ? (
        <S.TextArea id={id} placeholder={label} {...props as TextAreaProps} />
      ) : (
        <S.Input id={id} placeholder={label} {...props as InputProps} />
      )}
      <S.FieldLabel htmlFor={fieldId}>{label}</S.FieldLabel>
    </S.TextField>
  );
}
