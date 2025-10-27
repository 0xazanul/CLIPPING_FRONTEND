"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/authStore";
import { Search, TrendingUp, LogOut, DollarSign } from "lucide-react";

export default function ClipperDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'clipper') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    if (address) {
      disconnect();
    }
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-100">
      <header className="border-b border-base-300 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Clipper Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                {user.username}
                {user.walletAddress && (
                  <span className="ml-2 text-primary font-mono">
                    ({user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)})
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              {address && <ConnectButton />}
              <Link href="/campaigns">
                <Button variant="outline" className="h-9 px-4 text-sm">
                  <Search className="mr-2 h-3 w-3" />
                  Browse
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="h-9 px-4 text-sm">
                <LogOut className="mr-2 h-3 w-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">My Submissions</h2>
          <p className="text-sm text-muted-foreground">Track your submissions and earnings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Total Submissions</CardDescription>
              <CardTitle className="text-3xl">8</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Approved Clips</CardDescription>
              <CardTitle className="text-3xl">5</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Total Earnings</CardDescription>
              <CardTitle className="text-3xl text-primary">$450</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">Summer Product Launch</CardTitle>
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      Technology
                    </span>
                  </div>
                  <CardDescription className="text-sm">Submitted 2 days ago</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-success">Approved</span>
                  <span className="text-lg font-bold text-primary">$120</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Views:</span>
                  <span className="ml-2 font-medium">2,450</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Engagement:</span>
                  <span className="ml-2 font-medium">8.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">Brand Awareness Campaign</CardTitle>
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      Marketing
                    </span>
                  </div>
                  <CardDescription className="text-sm">Submitted 5 days ago</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-warning">Pending</span>
                  <span className="text-lg font-bold text-muted-foreground">$80</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2 font-medium">Under Review</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">Tech Product Review</CardTitle>
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      Technology
                    </span>
                  </div>
                  <CardDescription className="text-sm">Submitted 1 week ago</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-success">Approved</span>
                  <span className="text-lg font-bold text-primary">$150</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Views:</span>
                  <span className="ml-2 font-medium">5,680</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Engagement:</span>
                  <span className="ml-2 font-medium">12.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Link href="/campaigns">
            <Button className="h-10 px-6 text-sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Find More Campaigns
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
