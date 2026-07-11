import { SignIn } from "@clerk/react";

export default function SigninPage() {
  return (
    <>
      <SignIn
        fallback={"Loading..."}
        signUpUrl="/signup"
        forceRedirectUrl="/dashboard"
      />
    </>
  );
}
