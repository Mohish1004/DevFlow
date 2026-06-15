export const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const featureCards = [
  {
    description: "Plan, track, and manage all your projects.",
    imageSrc: "/content/frame-1707479758-1.jpg",
    title: "Project Management",
  },
  {
    description: "Streamline code reviews and feedback.",
    imageSrc: "/content/frame-1707479758-2.jpg",
    title: "Review Zone",
  },
  {
    description: "Automate tasks and get smart insights.",
    imageSrc: "/content/frame-1707479758.jpg",
    title: "AI Assistant",
  },
] as const;

export const keyFeatures = [
  {
    description:
      "Manage projects, assign tasks, and track progress with Kanban boards, all in one intuitive workspace.",
    imageSrc: "/content/frame-1707479969.jpg",
    kicker: "Feature 1",
    title: "Project Management & Task Tracking.",
  },
  {
    description:
      "Streamline code reviews, manage team documentation, and onboard new members efficiently.",
    imageSrc: "/content/frame-1707479970.jpg",
    kicker: "Feature 2",
    title: "Review Zone & Documentation.",
  },
  {
    description:
      "Conduct meetings, collaborate in real-time, and get insights with an AI assistant.",
    imageSrc: "/content/frame-1707479971.jpg",
    kicker: "Feature 3",
    title: "Meetings & Realtime Productivity.",
  },
] as const;

export const solutions = [
  {
    description:
      "Empower your development teams to plan, build, review, and ship projects seamlessly from a single platform.",
    title: "Developer Teams",
  },
  {
    description:
      "Gain full visibility into project progress, team workload, and performance with comprehensive analytics and reporting.",
    title: "Engineering Managers",
  },
  {
    description:
      "Facilitate smooth communication and collaboration between development, design, and product teams.",
    title: "Cross-Functional Collaboration",
  },
  {
    description:
      "Scalable solutions for all team sizes, ensuring efficient workflow management and increased productivity.",
    title: "Startups to Enterprises",
  },
] as const;

export const benefits = [
  { title: "+30%", text: "Productivity Boost" },
  { title: "-25%", text: "Context Switching" },
  { title: "15K+", text: "Happy Devs" },
  { title: "5+", text: "Years in DevTools" },
] as const;

export const testimonials = [
  {
    imageSrc: "/content/image-1927.png",
    name: "Jane Doe",
    quote:
      "DevFlow has revolutionized our development process. Our team stays in sync, and productivity has soared. A game-changer!",
    role: "CTO, TechCorp",
  },
  {
    imageSrc: "/content/image-1928.png",
    name: "Alex Smith",
    quote:
      "The unified workspace is incredible. No more jumping between apps - everything we need is right here. Highly recommended.",
    role: "Lead Dev, Innovate Solutions",
  },
  {
    imageSrc: "/content/image-1929.png",
    name: "Maria Garcia",
    quote: "Their insights were practical, data-driven, and immediately actionable.",
    role: "Product Manager, Global Dev",
  },
] as const;

export const pricingPlans = [
  {
    cta: "Sign Up",
    description: "Perfect for individuals or small teams starting out.",
    features: [
      "Up to 5 users",
      "Basic project management",
      "Task tracking & Kanban",
      "Real-time messaging",
    ],
    highlighted: false,
    price: "$19",
    priceSuffix: "/user/mo",
    title: "Starter",
  },
  {
    cta: "Contact Sales",
    description: "Ideal for growing teams needing advanced features.",
    features: [
      "Up to 25 users",
      "Advanced project management",
      "Review Zone & Docs",
      "AI assistant access",
    ],
    highlighted: true,
    price: "$49",
    priceSuffix: "/user/mo",
    title: "Professional",
  },
  {
    cta: "Contact Sales",
    description: "Best for large teams and enterprises.",
    features: [
      "Unlimited Users",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
    ],
    highlighted: false,
    price: "Custom",
    priceSuffix: "Pricing",
    title: "Enterprise",
  },
] as const;

export const footerSocials = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "Linkedin" },
  { href: "https://x.com", label: "X" },
] as const;
