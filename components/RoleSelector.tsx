'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/lib/store/userStore';

export default function RoleSelector() {
  const { role, setRole } = useUserStore();

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="border-2 hover:border-primary transition-colors">
        <CardHeader>
          <CardTitle>Brand</CardTitle>
          <CardDescription>
            Post content and work with clippers to create engaging videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setRole('brand')}
            className="w-full"
            variant={role === 'brand' ? 'default' : 'outline'}
          >
            Select Brand
          </Button>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary transition-colors">
        <CardHeader>
          <CardTitle>Clipper</CardTitle>
          <CardDescription>
            Create clips from brand content and earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setRole('clipper')}
            className="w-full"
            variant={role === 'clipper' ? 'default' : 'outline'}
          >
            Select Clipper
          </Button>
        </CardContent>
      </Card>

      {role && (
        <div className="md:col-span-2">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <p className="text-center text-lg">
                You selected: <strong className="uppercase">{role}</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
