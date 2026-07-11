import AppButton from "../Button/Button";

type ButtonProps = {
  text: string;
  classes?: string;
};

function Button({ text, classes = "" }: ButtonProps) {
  return <AppButton className={classes}>{text}</AppButton>;
}

export default Button;
