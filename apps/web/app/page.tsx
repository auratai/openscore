import { prisma } from "@repo/database";
import { Button } from "@openscore/ui/components/button";   
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@openscore/ui/components/card";
import { Input } from "@openscore/ui/components/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@openscore/ui/components/dialog";


export default async function IndexPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">OpenScore UI Demo</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Button Variants</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Button Sizes</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🔍</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Input Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a basic card with header, content, and footer.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Card</CardTitle>
              <CardDescription>This card has some special content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You can put any content here. Images, text, forms, etc.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Simple Card</h3>
                <p className="text-sm text-muted-foreground">
                  This card only has content, no header or footer.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Database Users</h2>
        <pre className="bg-muted p-4 rounded text-sm overflow-auto">
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>

      <div className="space-y-4"> 
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>Dialog Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  );
}
