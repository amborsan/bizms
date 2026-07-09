const buttonClasses = "";
function Button({ text: string, classes: string }) {
  return (
    <>
      <button className={classes}>{text}</button>
    </>
  );
}

export default Button;
