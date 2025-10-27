"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/authStore";
import { CATEGORIES } from "@/lib/constants/categories";
import { Plus, BarChart3, LogOut, X } from "lucide-react";

export default function BrandDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    assetsLink: "",
    brandLogoLink: "",
    duration: { min: 30, max: 60 },
    rules: [""],
    guidelines: [""],
  });

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Summer Product Launch",
      category: "Technology",
      description: "Create engaging clips for our new product line",
      submissions: 24,
      budget: "$5,000",
      status: "Active",
      assetsLink: "https://drive.google.com/...",
      brandLogoLink: "https://example.com/logo.png",
    },
    {
      id: 2,
      title: "Brand Awareness Campaign",
      category: "Marketing",
      description: "Short-form content highlighting our brand values",
      submissions: 16,
      budget: "$3,500",
      status: "Active",
      assetsLink: "https://drive.google.com/...",
      brandLogoLink: "https://example.com/logo.png",
    },
    {
      id: 3,
      title: "Holiday Special Promo",
      category: "Lifestyle",
      description: "Festive clips for our holiday promotions",
      submissions: 8,
      budget: "$2,000",
      status: "Draft",
      assetsLink: "",
      brandLogoLink: "",
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'brand') {
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

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new campaign
    const newCampaign = {
      id: campaigns.length + 1,
      title: campaignData.title,
      category: campaignData.category.charAt(0).toUpperCase() + campaignData.category.slice(1),
      description: campaignData.description,
      submissions: 0,
      budget: `$${campaignData.budget}`,
      status: "Active",
      assetsLink: campaignData.assetsLink,
      brandLogoLink: campaignData.brandLogoLink,
      duration: campaignData.duration,
      rules: campaignData.rules.filter(r => r.trim() !== ""),
      guidelines: campaignData.guidelines.filter(g => g.trim() !== ""),
    };

    setCampaigns([newCampaign, ...campaigns]);
    setShowCreateCampaign(false);
    setCampaignData({
      title: "",
      description: "",
      category: "",
      budget: "",
      deadline: "",
      assetsLink: "",
      brandLogoLink: "",
      duration: { min: 30, max: 60 },
      rules: [""],
      guidelines: [""],
    });
  };

  const addRule = () => {
    setCampaignData({ ...campaignData, rules: [...campaignData.rules, ""] });
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...campaignData.rules];
    newRules[index] = value;
    setCampaignData({ ...campaignData, rules: newRules });
  };

  const removeRule = (index: number) => {
    const newRules = campaignData.rules.filter((_, i) => i !== index);
    setCampaignData({ ...campaignData, rules: newRules });
  };

  const addGuideline = () => {
    setCampaignData({ ...campaignData, guidelines: [...campaignData.guidelines, ""] });
  };

  const updateGuideline = (index: number, value: string) => {
    const newGuidelines = [...campaignData.guidelines];
    newGuidelines[index] = value;
    setCampaignData({ ...campaignData, guidelines: newGuidelines });
  };

  const removeGuideline = (index: number) => {
    const newGuidelines = campaignData.guidelines.filter((_, i) => i !== index);
    setCampaignData({ ...campaignData, guidelines: newGuidelines });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-100">
      <header className="border-b border-base-300 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Brand Dashboard</h1>
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
              <Button variant="outline" onClick={handleLogout} className="h-9 px-4 text-sm">
                <LogOut className="mr-2 h-3 w-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">My Campaigns</h2>
            <p className="text-sm text-muted-foreground">Manage your campaigns</p>
          </div>
          <Button className="h-10 px-5 text-sm" onClick={() => setShowCreateCampaign(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Total Campaigns</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Active Submissions</CardDescription>
              <CardTitle className="text-3xl">48</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Total Clippers</CardDescription>
              <CardTitle className="text-3xl">156</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {campaign.category}
                      </span>
                    </div>
                    <CardDescription className="text-sm">{campaign.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <BarChart3 className="mr-1 h-3 w-3" />
                    Stats
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="ml-2 font-medium">{campaign.submissions}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="ml-2 font-medium">{campaign.budget}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`ml-2 font-medium ${campaign.status === 'Active' ? 'text-success' : 'text-warning'}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

            <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Campaign</DialogTitle>
            <DialogDescription className="text-sm">
              Fill in the details to launch your campaign
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCampaign} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm font-medium">Campaign Title</Label>
              <Input
                id="title"
                placeholder="Enter campaign title"
                value={campaignData.title}
                onChange={(e) => setCampaignData({ ...campaignData, title: e.target.value })}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your campaign..."
                value={campaignData.description}
                onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                <Select
                  value={campaignData.category}
                  onValueChange={(value) => setCampaignData({ ...campaignData, category: value })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="budget" className="text-sm font-medium">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter budget"
                  value={campaignData.budget}
                  onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                  required
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="deadline" className="text-sm font-medium">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={campaignData.deadline}
                onChange={(e) => setCampaignData({ ...campaignData, deadline: e.target.value })}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="assetsLink" className="text-sm font-medium">Assets Link</Label>
              <Input
                id="assetsLink"
                type="url"
                placeholder="Google Drive, Dropbox, or any storage link..."
                value={campaignData.assetsLink}
                onChange={(e) => setCampaignData({ ...campaignData, assetsLink: e.target.value })}
                required
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">Link where clippers can download raw footage/assets</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="brandLogoLink" className="text-sm font-medium">Brand Logo Link</Label>
              <Input
                id="brandLogoLink"
                type="url"
                placeholder="Direct link to your brand logo..."
                value={campaignData.brandLogoLink}
                onChange={(e) => setCampaignData({ ...campaignData, brandLogoLink: e.target.value })}
                required
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">Logo that must be included in clips</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Video Duration (seconds)</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={campaignData.duration.min}
                    onChange={(e) => setCampaignData({ 
                      ...campaignData, 
                      duration: { ...campaignData.duration, min: parseInt(e.target.value) || 0 } 
                    })}
                    required
                    className="h-10"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={campaignData.duration.max}
                    onChange={(e) => setCampaignData({ 
                      ...campaignData, 
                      duration: { ...campaignData.duration, max: parseInt(e.target.value) || 0 } 
                    })}
                    required
                    className="h-10"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Required video length range</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Qualification Rules</Label>
                <Button type="button" variant="outline" size="sm" onClick={addRule} className="h-7 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Rule
                </Button>
              </div>
              <div className="space-y-2">
                {campaignData.rules.map((rule, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., Must include brand logo in first 3 seconds"
                      value={rule}
                      onChange={(e) => updateRule(index, e.target.value)}
                      className="h-9"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRule(index)}
                      className="h-9 w-9 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Specific requirements clips must meet to qualify</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">General Guidelines</Label>
                <Button type="button" variant="outline" size="sm" onClick={addGuideline} className="h-7 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Guideline
                </Button>
              </div>
              <div className="space-y-2">
                {campaignData.guidelines.map((guideline, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., Use energetic music and vibrant colors"
                      value={guideline}
                      onChange={(e) => updateGuideline(index, e.target.value)}
                      className="h-9"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGuideline(index)}
                      className="h-9 w-9 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Creative suggestions and best practices</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateCampaign(false)}
                className="h-9"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9">
                Create Campaign
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
