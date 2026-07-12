import { SignInButton, UserButton, useAuth } from "@clerk/react";
import Button from "../../atoms/Button/Button";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <h2 className="text-xl font-bold">Business Management System</h2>
      </div>

      <div className="flex-none">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal" forceRedirectUrl="/dasjboard">
            <Button>Login</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
