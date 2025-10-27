"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isReset, setIsReset] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Handle password reset logic here
    console.log("Password reset:", { password });
    setIsReset(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-base-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">
            {isReset ? "Password Changed!" : "Create New Password"}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {isReset
              ? "Your password has been successfully reset"
              : "Enter a strong password for your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isReset ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-12"
                />
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium">
                Reset Password
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-success/10 p-6">
                  <Lock className="h-12 w-12 text-success" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  You can now use your new password to sign in
                </p>
              </div>

              <Link href="/login">
                <Button type="button" className="w-full h-12 text-base font-medium">
                  Go to Login
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
