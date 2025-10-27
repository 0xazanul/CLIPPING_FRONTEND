"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/lib/store/authStore";
import { CATEGORIES } from "@/lib/constants/categories";
import { Search, DollarSign, Clock, Users, LogIn, Filter, ExternalLink, Download, FileText, CheckCircle2, Info } from "lucide-react";

export default function CampaignsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const campaigns = [
    {
      id: "1",
      title: "Summer Product Launch",
      brand: "TechBrand",
      category: "Technology",
      description: "Create engaging clips for our new product line",
      budget: "$5,000",
      deadline: "2025-11-15",
      submissions: 24,
      assetsLink: "https://drive.google.com/drive/folders/sample-tech-assets",
      brandLogoLink: "https://example.com/techbrand-logo.png",
      duration: { min: 30, max: 60 },
      rules: [
        "Must include brand logo in first 3 seconds",
        "Use brand colors: #3B82F6 (primary) and #1E293B (dark)",
        "Must show product clearly for at least 5 seconds",
        "No competitor products visible in frame"
      ],
      guidelines: [
        "Use energetic, upbeat music",
        "Fast-paced editing with quick cuts",
        "Include captions or text overlays",
        "Prefer vertical (9:16) format for social media"
      ]
    },
    {
      id: "2",
      title: "Brand Awareness Campaign",
      brand: "LifeStyle Co",
      category: "Lifestyle",
      description: "Short-form content highlighting our brand values",
      budget: "$3,500",
      deadline: "2025-11-20",
      submissions: 16,
      assetsLink: "https://dropbox.com/s/lifestyle-campaign-assets",
      brandLogoLink: "https://example.com/lifestyle-logo.png",
      duration: { min: 15, max: 45 },
      rules: [
        "Logo must appear at start and end",
        "Maintain brand aesthetic (minimal, clean)",
        "Use only provided footage",
        "Include hashtag #LiveLifestyle"
      ],
      guidelines: [
        "Soft, calming background music",
        "Smooth transitions",
        "Natural lighting preferred",
        "Authentic, lifestyle-focused content"
      ]
    },
    {
      id: "3",
      title: "Holiday Special Promo",
      brand: "FestiveBrand",
      category: "Entertainment",
      description: "Festive clips for our holiday promotions",
      budget: "$2,000",
      deadline: "2025-12-01",
      submissions: 8,
      assetsLink: "https://mega.nz/folder/holiday-promo-2025",
      brandLogoLink: "https://example.com/festive-logo.png",
      duration: { min: 20, max: 40 },
      rules: [
        "Holiday theme required (decorations, colors)",
        "Brand logo watermark throughout",
        "Family-friendly content only",
        "Must mention holiday sale"
      ],
      guidelines: [
        "Festive music and sound effects",
        "Warm color grading",
        "Include celebration elements",
        "Create sense of urgency for sale"
      ]
    }
  ];

  const handleParticipate = (campaignId: string) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    } else {
      // Navigate to campaign submission page
      router.push(`/campaigns/${campaignId}/submit`);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <header className="border-b border-base-300 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-xl font-bold">The Clipping Company</h1>
            </Link>
            <div className="flex gap-2">
              {!isAuthenticated && (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-9 px-4 text-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="h-9 px-4 text-sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Browse Campaigns</h2>
          <p className="text-sm text-muted-foreground">
            Find exciting campaigns and start creating clips
          </p>
        </div>

        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 text-sm"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-52 h-10 text-sm">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:border-primary transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {campaign.category}
                      </span>
                    </div>
                    <CardDescription className="text-sm">
                      {campaign.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-bold text-success">{campaign.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{campaign.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-warning" />
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="font-medium">{campaign.submissions} clips</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedCampaign(campaign)} 
                    className="h-9 px-4 text-sm"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleParticipate(campaign.id)} 
                    className="h-9 px-6 text-sm"
                  >
                    Participate Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Campaign Details Dialog */}
      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-2">
                      {selectedCampaign.title}
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedCampaign.category}</Badge>
                      <span className="text-sm text-muted-foreground">by {selectedCampaign.brand}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Campaign Description
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedCampaign.description}</p>
                </div>

                <Separator />

                {/* Campaign Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold text-success">{selectedCampaign.budget}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="text-lg font-semibold">{selectedCampaign.deadline}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Submissions</p>
                    <p className="text-lg font-semibold">{selectedCampaign.submissions} clips</p>
                  </div>
                </div>

                <Separator />

                {/* Video Duration */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Required Duration
                  </h3>
                  <p className="text-sm">
                    <span className="font-medium">{selectedCampaign.duration.min}-{selectedCampaign.duration.max} seconds</span>
                    <span className="text-muted-foreground ml-2">per clip</span>
                  </p>
                </div>

                <Separator />

                {/* Assets & Logo */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Assets
                    </h3>
                    <a
                      href={selectedCampaign.assetsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Access Raw Footage
                    </a>
                    <p className="text-xs text-muted-foreground">
                      Download source videos and materials
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Brand Logo
                    </h3>
                    <a
                      href={selectedCampaign.brandLogoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Download Logo
                    </a>
                    <p className="text-xs text-muted-foreground">
                      Required in all submissions
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Qualification Rules */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Qualification Rules
                  </h3>
                  <div className="space-y-2">
                    {selectedCampaign.rules.map((rule: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                        <p className="text-sm">{rule}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    All rules must be met for clip to qualify for payment
                  </p>
                </div>

                <Separator />

                {/* Guidelines */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Creative Guidelines
                  </h3>
                  <div className="space-y-2">
                    {selectedCampaign.guidelines.map((guideline: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{guideline}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    Follow these suggestions for best results
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => {
                      setSelectedCampaign(null);
                      handleParticipate(selectedCampaign.id);
                    }}
                    className="flex-1 h-10"
                  >
                    Start Creating Clips
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCampaign(null)}
                    className="h-10"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Sign In Required
            </DialogTitle>
            <DialogDescription className="text-sm">
              You need to be signed in to participate in campaigns and submit clips.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-3">
            <Link href="/login" className="block">
              <Button className="w-full h-10 text-sm">
                Sign In to Continue
              </Button>
            </Link>
            <Link href="/signup" className="block">
              <Button variant="outline" className="w-full h-10 text-sm">
                Create New Account
              </Button>
            </Link>
            <p className="text-xs text-center text-muted-foreground pt-1">
              Join thousands of creators earning through clips
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
