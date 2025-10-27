"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-base-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">
            {isSubmitted ? "Check Your Email" : "Reset Password"}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {isSubmitted
              ? "We've sent you a password reset link"
              : "Enter your email to receive a reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isSubmitted ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-base font-medium">
                  Send Reset Link
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-muted-foreground">
                  We&apos;ve sent a password reset link to
                </p>
                <p className="font-medium text-foreground">{email}</p>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base font-medium"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Different Email
                </Button>

                <Link href="/login" className="block">
                  <Button
                    type="button"
                    className="w-full h-12 text-base font-medium"
                  >
                    Back to Login
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
