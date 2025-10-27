"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome, Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { login, loginWithWallet } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success && result.user) {
        // Redirect based on role
        if (result.user.role === 'brand') {
          router.push('/brand/dashboard');
        } else {
          router.push('/clipper/dashboard');
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletLogin = async (role: 'brand' | 'clipper') => {
    if (!address) return;
    
    setError("");
    setIsLoading(true);

    try {
      // Sign a message to verify wallet ownership
      const message = `Sign this message to login as ${role} on Clipping Platform`;
      await signMessageAsync({ message });
      
      const result = await loginWithWallet(address, role);
      
      if (result.success) {
        setShowRoleSelection(false);
        if (role === 'brand') {
          router.push('/brand/dashboard');
        } else {
          router.push('/clipper/dashboard');
        }
      }
    } catch (err) {
      setError("Wallet authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center text-sm">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-3">
            {error && (
              <div className="p-2 text-xs text-error bg-error/10 border border-error/20">
                {error}
              </div>
            )}

            <div className="p-2 text-xs bg-base-200 border border-base-300">
              <p className="font-medium mb-1">Test: brand@test.com / brand123</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-10"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-10 text-sm font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-base-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 text-sm"
              onClick={handleGoogleLogin}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>

            {!isConnected ? (
              <div className="w-full">
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-10 text-sm"
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </ConnectButton.Custom>
              </div>
            ) : (
              <>
                {!showRoleSelection ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 text-sm"
                    onClick={() => setShowRoleSelection(true)}
                  >
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-center text-muted-foreground">
                      Select account type
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={() => handleWalletLogin('brand')}
                        disabled={isLoading}
                        className="h-10 text-sm"
                      >
                        Brand
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleWalletLogin('clipper')}
                        disabled={isLoading}
                        className="h-10 text-sm"
                      >
                        Clipper
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
