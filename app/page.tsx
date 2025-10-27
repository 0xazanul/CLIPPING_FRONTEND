import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, Scissors } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Clipping Platform
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect brands with talented content creators on a decentralized Web3 platform
          </p>
          
          <div className="flex gap-3 justify-center">
            <Link href="/login">
              <Button size="lg" className="h-11 px-8">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="h-11 px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="group p-8 border border-base-300 bg-background hover:border-primary transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 border border-primary/20">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">For Brands</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Post campaigns and collaborate with skilled clippers to create engaging content for your brand
            </p>
            <Link href="/signup">
              <Button className="w-full h-10">
                Get Started as Brand
              </Button>
            </Link>
          </div>

          <div className="group p-8 border border-base-300 bg-background hover:border-primary transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 border border-primary/20">
                <Scissors className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">For Clippers</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Browse campaigns, create amazing clips, and earn rewards for your creative work
            </p>
            <Link href="/campaigns">
              <Button variant="outline" className="w-full h-10">
                <Search className="mr-2 h-4 w-4" />
                Browse Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
