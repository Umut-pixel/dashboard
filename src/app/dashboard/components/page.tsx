import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  IconCode, 
  IconPlus, 
  IconEdit, 
  IconCopy, 
  IconTrash,
  IconEye,
  IconPalette,
  IconLayout,
  IconFileCode,
  IconComponents
} from "@tabler/icons-react"

const components = [
  {
    id: 1,
    name: "Hero Section",
    type: "UI Component",
    status: "active",
    lastModified: "2 hours ago",
    category: "Layout",
    description: "Main hero section with call-to-action"
  },
  {
    id: 2,
    name: "Product Card",
    type: "UI Component",
    status: "draft",
    lastModified: "1 day ago",
    category: "E-commerce",
    description: "Product display card with image and price"
  },
  {
    id: 3,
    name: "Contact Form",
    type: "Form Component",
    status: "active",
    lastModified: "3 days ago",
    category: "Forms",
    description: "Contact form with validation"
  },
  {
    id: 4,
    name: "Navigation Menu",
    type: "UI Component",
    status: "active",
    lastModified: "1 week ago",
    category: "Navigation",
    description: "Main navigation menu component"
  },
  {
    id: 5,
    name: "Testimonial Slider",
    type: "UI Component",
    status: "draft",
    lastModified: "2 weeks ago",
    category: "Content",
    description: "Customer testimonial carousel"
  }
]

const templates = [
  {
    id: 1,
    name: "Landing Page",
    category: "Page Template",
    description: "Complete landing page with hero, features, and CTA",
    usage: 15
  },
  {
    id: 2,
    name: "Product Grid",
    category: "Layout Template",
    description: "Responsive product grid layout",
    usage: 8
  },
  {
    id: 3,
    name: "Blog Post",
    category: "Content Template",
    description: "Blog post layout with sidebar",
    usage: 12
  }
]

export default function ComponentsPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Components</h1>
                    <p className="text-muted-foreground">
                      Create and manage your website components
                    </p>
                  </div>
                  <Button className="flex items-center gap-2">
                    <IconPlus className="h-4 w-4" />
                    New Component
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="components" className="px-4 lg:px-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="components">Components</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="editor">Code Editor</TabsTrigger>
                </TabsList>

                <TabsContent value="components" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input placeholder="Search components..." />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="ui">UI Components</SelectItem>
                        <SelectItem value="form">Form Components</SelectItem>
                        <SelectItem value="layout">Layout Components</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4">
                    {components.map((component) => (
                      <Card key={component.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <IconComponents className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{component.name}</h3>
                                <p className="text-sm text-muted-foreground">{component.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{component.category}</Badge>
                                  <Badge 
                                    variant={component.status === "active" ? "default" : "secondary"}
                                    className={component.status === "active" ? "bg-green-500" : ""}
                                  >
                                    {component.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {component.lastModified}
                              </span>
                              <Button variant="ghost" size="sm">
                                <IconEye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <IconEdit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <IconCopy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <IconTrash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template) => (
                      <Card key={template.id}>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <IconLayout className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                          </div>
                          <CardDescription>{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{template.category}</Badge>
                            <span className="text-sm text-muted-foreground">
                              Used {template.usage} times
                            </span>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="flex-1">
                              <IconEye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <IconCopy className="h-4 w-4 mr-2" />
                              Use Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="editor" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Component Editor</CardTitle>
                      <CardDescription>Create and edit component code</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="component-name">Component Name</Label>
                            <Input id="component-name" placeholder="Enter component name" />
                          </div>
                          <div>
                            <Label htmlFor="component-type">Component Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ui">UI Component</SelectItem>
                                <SelectItem value="form">Form Component</SelectItem>
                                <SelectItem value="layout">Layout Component</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="component-description">Description</Label>
                          <Textarea 
                            id="component-description" 
                            placeholder="Describe your component..."
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="component-code">Component Code</Label>
                          <div className="relative">
                            <Textarea 
                              id="component-code" 
                              placeholder="Write your component code here..."
                              rows={15}
                              className="font-mono text-sm"
                            />
                            <div className="absolute top-2 right-2">
                              <Button size="sm" variant="outline">
                                <IconPalette className="h-4 w-4 mr-2" />
                                Format
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button>
                            <IconCode className="h-4 w-4 mr-2" />
                            Save Component
                          </Button>
                          <Button variant="outline">
                            <IconEye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
