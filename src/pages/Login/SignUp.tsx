import { SignUp } from "@clerk/react";

export default function SignupPage() {
  return (
    <>
      <SignUp
        fallback={"Loading..."}
        forceRedirectUrl="/dashboard"
        signInUrl="/dashboard"
      />
    </>
  );
}
