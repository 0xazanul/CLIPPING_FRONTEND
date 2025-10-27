"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState("user@example.com");

  useEffect(() => {
    // Simulate email verification process
    const timer = setTimeout(() => {
      // You would normally check the verification token here
      // For demo purposes, we'll randomly succeed or fail
      const isSuccess = Math.random() > 0.3;
      setStatus(isSuccess ? "success" : "error");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleResendEmail = () => {
    setStatus("loading");
    // Handle resend verification email logic
    console.log("Resending verification email to:", email);
    
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-base-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">
            {status === "loading" && "Verifying Email"}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {status === "loading" && "Please wait while we verify your email"}
            {status === "success" && "Your email has been successfully verified"}
            {status === "error" && "We couldn't verify your email address"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {status === "loading" && (
              <div className="rounded-full bg-primary/10 p-6">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="rounded-full bg-success/10 p-6">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
            )}
            {status === "error" && (
              <div className="rounded-full bg-error/10 p-6">
                <XCircle className="h-12 w-12 text-error" />
              </div>
            )}
          </div>

          {status === "loading" && (
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                This will only take a moment...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  You can now access all features of your account
                </p>
              </div>

              <Link href="/login">
                <Button type="button" className="w-full h-12 text-base font-medium">
                  Continue to Login
                </Button>
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  The verification link may have expired or is invalid
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  className="w-full h-12 text-base font-medium"
                  onClick={handleResendEmail}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Resend Verification Email
                </Button>

                <Link href="/login">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 text-base font-medium"
                  >
                    Back to Login
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Need help? Contact our support team
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
