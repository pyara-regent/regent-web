import { siteConfig } from "@/lib/site-config";

export const navItems = [
  { label: "SERVICES", href: "/services", hasChevron: false },
  { label: "PRODUCTS", href: "/products", hasChevron: false },
  { label: "INDUSTRIES", href: "/industries", hasChevron: false },
  { label: "ABOUT US", href: "/about", hasChevron: false },
  { label: "CONTACT", href: "/contact", hasChevron: false },
] as const;

export const aboutHighlights = [
  siteConfig.experienceLabel,
  "Advanced Sharpening Technology",
  "Specialized TCT & HSS Expertise",
  "Extended Tool Lifespan",
  "Convenient Pick-Up & Delivery",
] as const;

export const partnerCompanies = [
  {
    name: "Singer Sri Lanka",
    logo: "/regent/partners/singer-sri-lanka.svg",
    width: 220,
    height: 48,
  },
  {
    name: "Alpha Industries",
    logo: "/regent/partners/alpha-industries.svg",
    width: 190,
    height: 46,
  },
  {
    name: "AT Cooray",
    logo: "/regent/partners/at-cooray.png",
    width: 210,
    height: 101,
  },
  {
    name: "E.H. Cooray & Sons Pvt Ltd",
    logo: "/regent/partners/eh-cooray.svg",
    width: 190,
    height: 68,
  },
  {
    name: "Polydime Plastics Pvt Ltd",
    logo: "/regent/partners/polydime.png",
    width: 220,
    height: 55,
  },
] as const;

export const industries = [
  {
    title: "Woodworking Industry",
    slug: "woodworking-industry",
    description:
      "Sharpening and product support for circular saw blades, router bits, planer blades, and other woodworking cutting tools.",
    longDescription:
      "Woodworking teams depend on clean edges, consistent profiles, and predictable tool life. Regent Technologies supports woodworking shops with sharpening, Arden Router Bits, cutting tools, and practical product guidance for daily production.",
    image: "/regent/industry-woodworking.png",
  },
  {
    title: "Furniture Manufacturing",
    slug: "furniture-manufacturing",
    description:
      "Tooling support for furniture makers who need accurate cuts, clean finishes, and dependable repeat production.",
    longDescription:
      "Furniture manufacturing needs stable cutting performance across panels, profiles, frames, and finishing work. Regent Technologies helps maintain blades and supports workshops with the right tooling for smoother output.",
    image: "/regent/industry-furniture.png",
  },
  {
    title: "Packaging Industry",
    slug: "packaging-industry",
    description:
      "Blade care for packaging operations where clean cutting, uptime, and repeatability matter.",
    longDescription:
      "Packaging operations run on repeatable cutting quality. Regent Technologies supports teams with sharpening workflows that reduce avoidable downtime and help keep production moving.",
    image: "/regent/industry-packaging.png",
  },
  {
    title: "Printing Industry",
    slug: "printing-industry",
    description:
      "Sharpening support for cutting tools used around print finishing, trimming, and production workflows.",
    longDescription:
      "Print finishing and related production work depend on sharp tooling and consistent cuts. Regent Technologies helps maintain those tools with practical service coordination and blade care.",
    image: "/regent/industry-printing.png",
  },
  {
    title: "Metal Fabrication",
    slug: "metal-fabrication",
    description:
      "Support for fabrication teams that need durable cutting tools and reliable sharpening turnaround.",
    longDescription:
      "Fabrication teams need tools that hold up under demanding workshop conditions. Regent Technologies supports maintenance teams with sharpening and tool care for production-critical cutting work.",
    image: "/regent/industry-metal.png",
  },
  {
    title: "Plastic Processing",
    slug: "plastic-processing",
    description:
      "Cutting tool support for plastic processing teams focused on clean edges and stable output.",
    longDescription:
      "Plastic processing can expose weak tooling quickly. Regent Technologies supports clean, consistent cutting with blade sharpening, tool care, and direct coordination for active production teams.",
    image: "/regent/industry-plastic.png",
  },
] as const;

export const services = [
  {
    title: "Blade & Tool Sharpening",
    description:
      "Fully automated tool sharpening with advanced machines for rare accuracy, consistency, efficiency, cleaner cutting, and longer service life.",
    image: "/regent/service-sharpening.png",
    cta: "View Sharpening Process",
    modalIntro:
      "A fully automated sharpening service for production teams that need consistent cutting quality, reduced downtime, and better tool performance.",
    details: [
      "Advanced automated sharpening machines, a capability that remains rare in Sri Lanka.",
      "Accurate and repeatable sharpening for industrial blades and precision cutting tools.",
      "Controlled grinding and cooling support to protect tool geometry and cutting performance.",
      "Service outcomes focused on improved tool performance, reduced downtime, and higher profitability.",
    ],
    bestFor: "TCT tools, HSS tools, carbon blades, circular saw blades, paper cutting blades, profile cutters, grooving cutters, and production cutting tools.",
  },
  {
    title: "Pick-Up & Delivery Support",
    description:
      "Convenient workshop pickup and return delivery, keeping blade maintenance simple while reducing travel time and production interruptions.",
    image: "/regent/service-delivery.png",
    cta: "Contact for More Details",
    modalIntro:
      "A simple coordination service for customers who want blade maintenance handled without extra workshop travel.",
    details: [
      "Pickup coordination for blades and tooling that need sharpening or service review.",
      "Clear communication around service requirements, quantities, and expected return flow.",
      "Return delivery support after sharpening so teams can keep production moving.",
      "Useful for repeat customers who maintain blades on a recurring schedule.",
    ],
    bestFor: "Workshops, factories, furniture producers, woodworking teams, and repeat-service customers.",
  },
] as const;

export const sharpenedToolTypes = [
  {
    title: "Polythene Bag Cutting Blade",
    image: "/regent/products/doc/polythene-bag-cutting-blades.jpg",
  },
  {
    title: "Winder Blade",
    image: "/regent/products/doc/winder-blades.png",
  },
  {
    title: "Metal Plate Cutting Blade",
    image: "/regent/products/doc/metal-plate-cutting-blades.jpg",
  },
  {
    title: "Reel Cutting Blade",
    image: "/regent/products/doc/reel-cutting-blades.jpg",
  },
  {
    title: "Crusher Blade",
    image: "/regent/products/doc/crusher-blades.png",
  },
  {
    title: "Paper Cutting Blades",
    image: "/regent/products/doc/paper-cutting-blades.jpg",
  },
  {
    title: "Planer Blade",
    image: "/regent/products/doc/planer-carbon-blades.png",
  },
  {
    title: "Circular Saw Blade",
    image: "/regent/products/doc/circular-saw-blade.jpg",
  },
  {
    title: "Profile Cutting Blade",
    image: "/regent/products/doc/profile-cutting-blade.png",
  },
  {
    title: "Grooving Cutter Blade",
    image: "/regent/products/doc/grooving-cutter-blade.jpg",
  },
  {
    title: "Finger Joint Cutter Blade",
    image: "/regent/products/doc/finger-joint-cutter-blade.jpg",
  },
  {
    title: "Hinge Boring Bit",
    image: "/regent/products/doc/hinge-boring-bit.jpg",
  },
] as const;

export const productFeatures = [
  {
    title: "Blade & Tool Sharpening",
    slug: "precision-blade-sharpening",
    category: "Sharpening Services",
    image: "/regent/products/doc/circular-saw-blade.jpg",
    summary: "Fully automated sharpening for blades and precision cutting tools.",
  },
  {
    title: "ARDEN Routing Tools",
    slug: "arden-router-bits",
    category: "Featured Brand",
    image: "/regent/products/doc/arden-router-bits-set.png",
    summary: "Sole importer for high-quality router bits from Arden Precision Technology Co. Ltd. of Taiwan.",
  },
  {
    title: "Pneumatic Tools",
    slug: "pneumatic-tools",
    category: "Pneumatic Tools",
    image: "/regent/products/doc/pneumatic-brad-nailer-f50.jpg",
    summary: "Brad nailers, staplers, and pneumatic screwdrivers for workshop production.",
  },
  {
    title: "Power Tools",
    slug: "power-tools",
    category: "Power Tools",
    image: "/regent/products/doc/drill-machine.png",
    summary: "Routers, drills, grinders, planers, jig-saws, circular saws, and screw drivers.",
  },
  {
    title: "Woodworking Tools",
    slug: "woodworking-tools",
    category: "Woodworking Tools",
    image: "/regent/products/doc/drawer-runners.png",
    summary: "Furniture hardware, sanding products, router bits, cutter sets, and planer blades.",
  },
  {
    title: "Tyre Rebuilding Tools",
    slug: "tyre-rebuilding-tools",
    category: "Industrial Equipment",
    image: "/regent/products/doc/tyre-buffing-blades.jpg",
    summary: "Tyre buffing blades and R6 refills for tyre rebuilding workflows.",
  },
] as const;

export const whyChoosePoints = [
  {
    title: siteConfig.experienceLabel,
    detail:
      "Long-term sharpening and tooling support for workshops, manufacturers, and production teams.",
  },
  {
    title: "Advanced Sharpening Technology",
    detail:
      "Automated grinding helps restore accurate cutting edges with consistent angles and repeatable finish.",
  },
  {
    title: "Expertise in TCT & HSS Tools",
    detail:
      "Practical support for tungsten carbide tipped and high-speed steel tools used in daily production.",
  },
  {
    title: "Extended Tool Lifespan",
    detail:
      "Correct sharpening and careful handling help reduce premature replacement and unstable cutting quality.",
  },
  {
    title: "Integrated Cooling System",
    detail:
      "Controlled cooling during sharpening helps limit heat stress and protect blade hardness.",
  },
  {
    title: "Reliable Pick-up & Delivery",
    detail:
      "Coordinated collection and return keeps maintenance easier for busy industrial customers.",
  },
] as const;

export const quickLinks = [
  { label: "HOME", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export const footerIndustries = industries.map(({ title, slug }) => ({ title, slug }));

export const contactEmail = siteConfig.email;

export const contactNumbers = siteConfig.phoneNumbers.map((phone) => phone.label);

export const contactAddress = siteConfig.address;

export const contactSupportPoints = [
  "Pickup and delivery coordination for industrial blade sharpening",
  "Support for TCT and HSS blade maintenance requirements",
  "Product guidance for workshops, factories, and woodworking operations",
  "Direct guidance for workshops, factories, and production teams",
  "Fast response for repeat-service and ongoing operational needs",
] as const;

export const serviceBenefits = [
  "Fully automated sharpening for rare accuracy and repeatability",
  "Improved tool performance with reduced production downtime",
  "Reliable pickup and delivery for industrial customers",
  "Support for blades, cutters, bits, and production-critical tools",
] as const;

export const serviceProcess = [
  {
    title: "Tool Assessment",
    body: "We inspect blade type, cutter profile, edge condition, and tool geometry before selecting the correct automated sharpening path.",
  },
  {
    title: "Automated Sharpening",
    body: "Advanced machines restore cutting edges with repeatable accuracy across blades, cutters, boring bits, TCT, HSS, and carbon tools.",
  },
  {
    title: "Controlled Finishing",
    body: "Cooling-supported finishing helps protect tool integrity, reduce heat stress, and support cleaner cutting performance.",
  },
  {
    title: "Return To Operation",
    body: "Blades are packed for return or coordinated for delivery so production teams can get back to work quickly.",
  },
] as const;

export const productCatalog = productFeatures;

export const faqItems = [
  {
    question: "What types of blades do you sharpen?",
    answer:
      "We focus on TCT (Tungsten Carbide Tipped) and HSS (High-Speed Steel) cutting tools used across industrial operations, workshops, and manufacturing environments.",
  },
  {
    question: "Do you offer pickup and delivery?",
    answer:
      "Yes. Regent Technologies provides pickup and delivery coordination so customers can keep maintenance moving without interrupting production unnecessarily.",
  },
  {
    question: "How do I request a sharpening service?",
    answer:
      "You can contact us by phone or email with your blade details, quantity, and preferred timing. We will confirm the right service flow and coordinate the next steps.",
  },
  {
    question: "Can you support repeat or scheduled sharpening work?",
    answer:
      "Yes. We can work with ongoing industrial customers who need recurring sharpening and predictable service coordination for operational continuity.",
  },
  {
    question: "Why use automated sharpening instead of manual grinding?",
    answer:
      "Automated sharpening provides more consistent geometry, repeatable grinding accuracy, and better control over edge recovery for production-critical tooling.",
  },
  {
    question: "Does cooling matter during sharpening?",
    answer:
      "Yes. Cooling helps reduce overheating, protects blade integrity, and supports a cleaner finish, which is especially important for extending tool life.",
  },
  {
    question: "Can I ask about products as well as services?",
    answer:
      "Absolutely. We can help with both sharpening-related services and the relevant tools, accessories, and workshop products shown in our catalog.",
  },
  {
    question: "Do you supply Arden Router Bits?",
    answer:
      "Yes. Regent Technologies is the sole agent for Arden Router Bits and can help you choose suitable options for woodworking and precision cutting applications.",
  },
  {
    question: "Where are you located?",
    answer:
      "Regent Technologies is located at No. 403, Bandaranayake Mawatha, Katubedda, Moratuwa 10400, Sri Lanka.",
  },
] as const;

export const privacySections = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We collect information you provide when you contact Regent Technologies, request sharpening services, ask about products, or coordinate pickup and delivery.",
      "This may include your name, business details, contact numbers, email address, service requirements, and any operational information necessary to fulfill your request.",
    ],
  },
  {
    title: "How We Use Information",
    paragraphs: [
      "We use your information to respond to inquiries, coordinate sharpening services, manage deliveries, provide support, and improve the way we serve industrial customers.",
      "We do not use your information for unrelated purposes that are inconsistent with the services you request from us.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "We retain business and service records for as long as reasonably necessary to fulfill service obligations, maintain customer relationships, and meet operational or legal requirements.",
    ],
  },
  {
    title: "Data Sharing",
    paragraphs: [
      "We do not sell your personal information. We may share relevant operational information with service partners or logistics providers only when necessary to fulfill pickup, delivery, or related support requirements.",
    ],
  },
  {
    title: "Your Choices",
    paragraphs: [
      "You can contact us at any time to update your information, request corrections, or ask questions about how your information is used in connection with Regent Technologies services.",
    ],
  },
] as const;

export const termsSections = [
  {
    title: "Service Scope",
    paragraphs: [
      "Regent Technologies provides industrial blade sharpening, pickup and delivery coordination, and related product support based on customer requirements and operational feasibility.",
    ],
  },
  {
    title: "Customer Responsibilities",
    paragraphs: [
      "Customers are responsible for providing accurate service details, blade information, contact information, and any operational constraints relevant to pickup, sharpening, or delivery.",
    ],
  },
  {
    title: "Quotations And Scheduling",
    paragraphs: [
      "Any timelines, quotations, and service expectations are subject to confirmation based on workload, blade condition, logistics requirements, and other operational factors.",
    ],
  },
  {
    title: "Products And Availability",
    paragraphs: [
      "Product availability, specifications, and recommendations may change. Regent Technologies may update product options or service availability without prior notice.",
    ],
  },
  {
    title: "Liability",
    paragraphs: [
      "Regent Technologies will take reasonable care in handling customer tooling and orders. To the fullest extent permitted by applicable law, liability is limited to the direct service relationship and confirmed work scope.",
    ],
  },
] as const;
