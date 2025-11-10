import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import usePageTitle from "@/lib/usePageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, Copy, Download, Palette, Type, Layout, Layers, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SpotlightCard from "@/components/ui/SpotlightCard";

const BrandKit = () => {
  usePageTitle("Brand Kit");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = [
    {
      name: "Primary Gold",
      hsl: "43 84% 55%",
      hex: "#E6B325",
      usage: "Primary brand color, CTAs, highlights"
    },
    {
      name: "Accent Gold",
      hsl: "38 90% 50%",
      hex: "#F2A818",
      usage: "Accent elements, hover states"
    },
    {
      name: "Background",
      hsl: "0 0% 5%",
      hex: "#0D0D0D",
      usage: "Page backgrounds"
    },
    {
      name: "Card",
      hsl: "0 0% 8%",
      hex: "#141414",
      usage: "Card backgrounds, elevated surfaces"
    },
    {
      name: "Border",
      hsl: "0 0% 18%",
      hex: "#2E2E2E",
      usage: "Borders, dividers"
    },
    {
      name: "Foreground",
      hsl: "40 10% 96%",
      hex: "#F7F5F3",
      usage: "Primary text color"
    },
    {
      name: "Muted",
      hsl: "0 0% 15%",
      hex: "#262626",
      usage: "Muted backgrounds"
    },
    {
      name: "Muted Foreground",
      hsl: "40 5% 60%",
      hex: "#9D968E",
      usage: "Secondary text, descriptions"
    }
  ];

  const gradients = [
    {
      name: "Primary Gradient",
      css: "linear-gradient(135deg, hsl(38 90% 50%), hsl(43 84% 55%), hsl(45 80% 60%))",
      usage: "Backgrounds, hero sections"
    },
    {
      name: "Radial Gradient",
      css: "radial-gradient(circle at center, hsl(38 90% 50% / 0.2), transparent 70%)",
      usage: "Subtle backgrounds, decorative elements"
    },
    {
      name: "Text Gradient",
      css: "linear-gradient(135deg, hsl(38 90% 50%), hsl(45 80% 60%))",
      usage: "Headline text effects"
    }
  ];

  const typography = [
    {
      level: "H1",
      className: "text-5xl md:text-6xl font-bold",
      sample: "Hero Headlines"
    },
    {
      level: "H2",
      className: "text-4xl md:text-5xl font-bold",
      sample: "Section Headlines"
    },
    {
      level: "H3",
      className: "text-3xl md:text-4xl font-semibold",
      sample: "Subsection Headlines"
    },
    {
      level: "H4",
      className: "text-2xl md:text-3xl font-semibold",
      sample: "Card Headlines"
    },
    {
      level: "Body",
      className: "text-base md:text-lg",
      sample: "Body text for paragraphs and content"
    },
    {
      level: "Small",
      className: "text-sm",
      sample: "Small text for captions and labels"
    }
  ];

  const spacing = [
    { token: "xs", value: "0.5rem", pixels: "8px" },
    { token: "sm", value: "0.75rem", pixels: "12px" },
    { token: "md", value: "1rem", pixels: "16px" },
    { token: "lg", value: "1.5rem", pixels: "24px" },
    { token: "xl", value: "2rem", pixels: "32px" },
    { token: "2xl", value: "3rem", pixels: "48px" },
    { token: "3xl", value: "4rem", pixels: "64px" },
  ];

  const borderRadius = [
    { name: "Default", value: "0.75rem", usage: "Cards, buttons, inputs" },
    { name: "Medium", value: "calc(0.75rem - 2px)", usage: "Nested elements" },
    { name: "Small", value: "calc(0.75rem - 4px)", usage: "Small components" },
    { name: "Full", value: "9999px", usage: "Pills, badges" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <Badge className="mb-4">Brand Guidelines</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              LevoAir Brand Kit
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete brand guidelines, design system, and assets for LevoAir.
              Download logos, explore our color palette, and learn about our design principles.
            </p>
          </div>

          {/* Logo Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <CardTitle>Logo Assets</CardTitle>
              </div>
              <CardDescription>
                Official LevoAir logo in various formats. Always maintain proper spacing and never distort.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-muted p-8 rounded-lg flex items-center justify-center">
                  <img
                    src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png"
                    alt="LevoAir Logo"
                    className="h-16 w-auto"
                  />
                </div>
                <div className="bg-background border border-border p-8 rounded-lg flex items-center justify-center">
                  <img
                    src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png"
                    alt="LevoAir Logo"
                    className="h-16 w-auto"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download SVG
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Brand Kit (ZIP)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Different Sections */}
          <Tabs defaultValue="colors" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="h-4 w-4 mr-2" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="spacing">
                <Layout className="h-4 w-4 mr-2" />
                Spacing
              </TabsTrigger>
              <TabsTrigger value="components">
                <Layers className="h-4 w-4 mr-2" />
                Components
              </TabsTrigger>
              <TabsTrigger value="reactbits">
                <Sparkles className="h-4 w-4 mr-2" />
                React Bits
              </TabsTrigger>
            </TabsList>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Colors</CardTitle>
                  <CardDescription>
                    Our signature gold and dark color palette. Click any color to copy its value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {colors.map((color) => (
                      <div key={color.name} className="space-y-3">
                        <div
                          className="h-32 rounded-lg border border-border cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: `hsl(${color.hsl})` }}
                          onClick={() => copyToClipboard(color.hex, color.name)}
                        />
                        <div>
                          <h4 className="font-semibold text-sm">{color.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {color.hex}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(color.hex, color.name)}
                            >
                              {copiedColor === color.name ? (
                                <Check className="h-3 w-3 text-primary" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <code className="text-xs text-muted-foreground block mt-1">
                            hsl({color.hsl})
                          </code>
                          <p className="text-xs text-muted-foreground mt-2">
                            {color.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gradients</CardTitle>
                  <CardDescription>
                    Pre-defined gradients used throughout the brand.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {gradients.map((gradient) => (
                      <div key={gradient.name} className="space-y-3">
                        <div
                          className="h-32 rounded-lg border border-border"
                          style={{ background: gradient.css }}
                        />
                        <div>
                          <h4 className="font-semibold text-sm">{gradient.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {gradient.usage}
                          </p>
                          <code className="text-xs bg-muted px-2 py-1 rounded block mt-2 break-all">
                            {gradient.css}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Typography Scale</CardTitle>
                  <CardDescription>
                    Our typographic hierarchy using system fonts for optimal performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {typography.map((type) => (
                    <div key={type.level} className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className={type.className}>{type.sample}</span>
                        <Badge variant="outline">{type.level}</Badge>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {type.className}
                      </code>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Font Stack</CardTitle>
                  <CardDescription>
                    System font stack for optimal performance and native feel.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <code className="text-sm bg-muted px-4 py-3 rounded block break-all">
                    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
                  </code>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Spacing Tab */}
            <TabsContent value="spacing" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Spacing System</CardTitle>
                  <CardDescription>
                    Consistent spacing scale based on 4px/0.25rem increments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {spacing.map((space) => (
                      <div key={space.token} className="flex items-center gap-4">
                        <div className="w-20">
                          <Badge variant="secondary">{space.token}</Badge>
                        </div>
                        <div
                          className="bg-primary h-8"
                          style={{ width: space.value }}
                        />
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <code>{space.value}</code>
                          <code>{space.pixels}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Border Radius</CardTitle>
                  <CardDescription>
                    Rounded corners for a modern, friendly aesthetic.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {borderRadius.map((radius) => (
                      <div key={radius.name} className="space-y-3">
                        <div
                          className="h-24 bg-primary"
                          style={{ borderRadius: radius.value }}
                        />
                        <div>
                          <h4 className="font-semibold text-sm">{radius.name}</h4>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {radius.value}
                          </code>
                          <p className="text-xs text-muted-foreground mt-2">
                            {radius.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Components Tab */}
            <TabsContent value="components" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>UI Components</CardTitle>
                  <CardDescription>
                    Built with shadcn/ui and Radix primitives for accessibility and consistency.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Buttons */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Buttons</h4>
                    <div className="flex flex-wrap gap-3">
                      <Button>Primary Button</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Badges */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Cards */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Cards</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>
                            Card description with supporting text
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          Card content goes here with various elements.
                        </CardContent>
                      </Card>
                      <Card className="border-primary">
                        <CardHeader>
                          <CardTitle className="text-primary">Featured Card</CardTitle>
                          <CardDescription>
                            Highlighted with primary border
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          Used for emphasis and featured content.
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Design Principles</CardTitle>
                  <CardDescription>
                    Core principles guiding our design decisions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Professional Excellence</h4>
                    <p className="text-sm text-muted-foreground">
                      Clean, sophisticated design that conveys expertise and reliability in drone services.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Premium Quality</h4>
                    <p className="text-sm text-muted-foreground">
                      Gold accents and dark theme create a premium, high-end aesthetic.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Accessibility First</h4>
                    <p className="text-sm text-muted-foreground">
                      Built with Radix primitives ensuring keyboard navigation and screen reader support.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Performance Optimized</h4>
                    <p className="text-sm text-muted-foreground">
                      System fonts, optimized assets, and modern build tools for fast load times.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* React Bits Tab */}
            <TabsContent value="reactbits" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>React Bits Components</CardTitle>
                  <CardDescription>
                    Modern, interactive components inspired by React Bits for enhanced user experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <p className="text-sm text-muted-foreground">
                    These components add sophisticated interactions and animations to the site. They're built with GSAP
                    for smooth animations and follow our brand aesthetic perfectly.
                  </p>
                </CardContent>
              </Card>

              {/* SpotlightCard Component */}
              <Card>
                <CardHeader>
                  <CardTitle>SpotlightCard</CardTitle>
                  <CardDescription>
                    Interactive card with a spotlight effect that follows the cursor, creating an engaging hover experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Live Preview */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Live Preview</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <SpotlightCard
                        className="p-6"
                        spotlightColor="rgba(230, 179, 37, 0.2)"
                      >
                        <div className="space-y-2">
                          <h5 className="font-semibold text-primary">Hover Over Me</h5>
                          <p className="text-sm text-muted-foreground">
                            Move your cursor over this card to see the spotlight effect in action.
                          </p>
                        </div>
                      </SpotlightCard>
                      <SpotlightCard
                        className="p-6"
                        spotlightColor="rgba(242, 168, 24, 0.3)"
                      >
                        <div className="space-y-2">
                          <h5 className="font-semibold text-accent">Custom Spotlight</h5>
                          <p className="text-sm text-muted-foreground">
                            The spotlight color can be customized to match your design needs.
                          </p>
                        </div>
                      </SpotlightCard>
                    </div>
                  </div>

                  <Separator />

                  {/* Usage Example */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Usage Example</h4>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-xs overflow-x-auto">
                        <code>{`import SpotlightCard from "@/components/ui/SpotlightCard";

<SpotlightCard
  className="p-6"
  spotlightColor="rgba(230, 179, 37, 0.2)"
>
  <div className="space-y-2">
    <h3>Card Title</h3>
    <p>Card content goes here...</p>
  </div>
</SpotlightCard>`}</code>
                      </pre>
                    </div>
                  </div>

                  <Separator />

                  {/* Props Documentation */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Props</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">className</div>
                        <div className="text-muted-foreground">
                          Optional CSS classes to apply to the card wrapper
                        </div>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">spotlightColor</div>
                        <div className="text-muted-foreground">
                          RGBA color for the spotlight effect (default: "rgba(255, 255, 255, 0.25)")
                        </div>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">children</div>
                        <div className="text-muted-foreground">
                          Content to display inside the card
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Best Practices */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Best Practices</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      <li>Use brand-appropriate spotlight colors (gold tones with low opacity)</li>
                      <li>Apply to feature cards or important interactive elements</li>
                      <li>Avoid overuse - reserve for key content areas</li>
                      <li>Combine with group-hover utilities for nested element animations</li>
                    </ul>
                  </div>

                  <Separator />

                  {/* Where It's Used */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Where It's Used</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary">FeaturesSection.tsx</Badge>
                      <p className="text-sm text-muted-foreground">
                        Used in the home page features section to highlight key differentiators with an
                        interactive spotlight effect on hover.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* StaggeredMenu Component */}
              <Card>
                <CardHeader>
                  <CardTitle>StaggeredMenu</CardTitle>
                  <CardDescription>
                    Full-screen animated navigation menu with GSAP-powered staggered entrance animations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      A sophisticated mobile navigation component featuring:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside ml-4">
                      <li>Animated hamburger to X icon transformation</li>
                      <li>Multi-layer slide-in animation with staggered timing</li>
                      <li>Large-format menu items with number indicators</li>
                      <li>Smooth GSAP-powered transitions</li>
                      <li>Customizable colors, positioning, and accent colors</li>
                    </ul>
                  </div>

                  <Separator />

                  {/* Usage Example */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Usage Example</h4>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-xs overflow-x-auto">
                        <code>{`import { StaggeredMenu } from "@/components/ui/StaggeredMenu";
import type { StaggeredMenuItem } from "@/components/ui/StaggeredMenu";

const menuItems: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

<StaggeredMenu
  position="right"
  items={menuItems}
  displaySocials={false}
  displayItemNumbering={true}
  menuButtonColor="hsl(40, 10%, 96%)"
  openMenuButtonColor="hsl(40, 10%, 96%)"
  colors={['hsl(0, 0%, 8%)', 'hsl(0, 0%, 12%)']}
  accentColor="hsl(38, 90%, 50%)"
  isFixed={false}
/>`}</code>
                      </pre>
                    </div>
                  </div>

                  <Separator />

                  {/* Key Props */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Props</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">position</div>
                        <div className="text-muted-foreground">
                          Menu slide direction: "left" | "right"
                        </div>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">items</div>
                        <div className="text-muted-foreground">
                          Array of menu items with label, ariaLabel, and link
                        </div>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">colors</div>
                        <div className="text-muted-foreground">
                          Array of background colors for layered animation effect
                        </div>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">accentColor</div>
                        <div className="text-muted-foreground">
                          Accent color for numbers and social links (use brand gold)
                        </div>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">displayItemNumbering</div>
                        <div className="text-muted-foreground">
                          Show/hide numeric indicators next to menu items
                        </div>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">onMenuOpen</div>
                        <div className="text-muted-foreground">
                          Callback function when menu opens
                        </div>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded">onMenuClose</div>
                        <div className="text-muted-foreground">
                          Callback function when menu closes
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Best Practices */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Best Practices</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      <li>Use primarily for mobile navigation (hide on desktop with md:hidden)</li>
                      <li>Keep menu items concise (3-7 items optimal)</li>
                      <li>Use brand colors for consistency with the overall design</li>
                      <li>Set accentColor to primary brand gold for visual cohesion</li>
                      <li>Consider adding social links for enhanced discoverability</li>
                    </ul>
                  </div>

                  <Separator />

                  {/* Where It's Used */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Where It's Used</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary">Navbar.tsx</Badge>
                      <p className="text-sm text-muted-foreground">
                        Powers the mobile navigation experience, providing a full-screen animated menu
                        that appears only on mobile devices (hidden on desktop).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>
                    Learn more about React Bits and animation libraries used.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">React Bits</h4>
                      <p className="text-sm text-muted-foreground">
                        Community-driven collection of modern React components and patterns.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.reactbits.dev" target="_blank" rel="noopener noreferrer">
                          Visit React Bits
                        </a>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">GSAP Animation Library</h4>
                      <p className="text-sm text-muted-foreground">
                        Professional-grade animation library powering our interactive components.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://greensock.com/gsap/" target="_blank" rel="noopener noreferrer">
                          Learn GSAP
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Usage Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Usage Guidelines</CardTitle>
              <CardDescription>
                Best practices for using LevoAir brand assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Do
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use official logo files without modification</li>
                    <li>• Maintain minimum clear space around logo</li>
                    <li>• Use designated brand colors from palette</li>
                    <li>• Keep consistent typography hierarchy</li>
                    <li>• Ensure proper contrast ratios for accessibility</li>
                    <li>• Use shadcn/ui components for consistency</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive flex items-center gap-2">
                    <span className="text-xl">×</span>
                    Don't
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Distort, rotate, or modify the logo</li>
                    <li>• Use unauthorized colors or gradients</li>
                    <li>• Mix different typography styles</li>
                    <li>• Use low-resolution or pixelated assets</li>
                    <li>• Place logo on busy backgrounds without clear space</li>
                    <li>• Create custom component variants without approval</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrandKit;
