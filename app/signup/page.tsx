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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Chrome, Briefcase, Scissors } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignupPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { loginWithWallet } = useAuthStore();
  const [accountType, setAccountType] = useState<"brand" | "clipper">("brand");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup with:", { accountType, username, email, password });
    router.push('/login');
  };

  const handleWalletSignup = async () => {
    if (!address) return;
    
    setIsLoading(true);

    try {
      const message = `Sign this message to create your ${accountType} account on Clipping Platform`;
      await signMessageAsync({ message });
      
      const result = await loginWithWallet(address, accountType);
      
      if (result.success) {
        if (accountType === 'brand') {
          router.push('/brand/dashboard');
        } else {
          router.push('/clipper/dashboard');
        }
      }
    } catch (err) {
      console.error("Wallet signup failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
    console.log("Signup with Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center text-sm">
            Sign up to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-sm">Account Type</Label>
              <RadioGroup
                value={accountType}
                onValueChange={(value) => setAccountType(value as "brand" | "clipper")}
                className="flex gap-2"
              >
                <div className="flex-1">
                  <RadioGroupItem
                    value="brand"
                    id="brand"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="brand"
                    className="flex items-center justify-center h-10 cursor-pointer border border-border bg-background hover:bg-base-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary transition-all px-3"
                  >
                    <Briefcase className="h-4 w-4 mr-1.5" />
                    <span className="text-sm">Brand</span>
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem
                    value="clipper"
                    id="clipper"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="clipper"
                    className="flex items-center justify-center h-10 cursor-pointer border border-border bg-background hover:bg-base-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary transition-all px-3"
                  >
                    <Scissors className="h-4 w-4 mr-1.5" />
                    <span className="text-sm">Clipper</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-sm">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-10"
              />
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
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>

            <Button type="submit" className="w-full h-10 text-sm font-medium">
              Create Account
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
              onClick={handleGoogleSignup}
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
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 text-sm"
                onClick={handleWalletSignup}
                disabled={isLoading}
              >
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
