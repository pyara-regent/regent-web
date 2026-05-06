import { faqItems } from "@/lib/regent-content";

const docProduct = "/regent/products/doc";

export const initialProducts = [
  {
    name: "Blade & Tool Sharpening",
    slug: "precision-blade-sharpening",
    description:
      "Fully automated sharpening for industrial blades and precision cutting tools. Regent Technologies handles TCT, HSS, carbon, paper cutting, circular saw, profile, grooving, finger joint, crusher, winder, polythene bag cutting, metal plate cutting, planer, and hinge boring tools with consistent accuracy.",
    metaTitle: "Blade and Tool Sharpening in Sri Lanka",
    metaDescription:
      "Fully automated blade and tool sharpening for TCT, HSS, carbon, circular saw, paper cutting, profile, grooving, and industrial cutting tools.",
    images: [
      `${docProduct}/circular-saw-blade.jpg`,
      `${docProduct}/paper-cutting-blades.jpg`,
      `${docProduct}/finger-joint-cutter-blade.jpg`,
    ],
    sortOrder: 10,
  },
  {
    name: "ARDEN Routing Tools",
    slug: "arden-router-bits",
    description:
      "High-quality router bits and routing tools from Arden Precision Technology Co. Ltd. of Taiwan. Regent Technologies is the sole importer for ARDEN routing tools, supporting woodworking, profiling, trimming, and precision production applications.",
    metaTitle: "ARDEN Routing Tools Sri Lanka",
    metaDescription:
      "Regent Technologies is the sole importer for high-quality ARDEN router bits and routing tools from Arden Precision Technology Co. Ltd. of Taiwan.",
    images: [
      `${docProduct}/arden-router-bits-set.png`,
      `${docProduct}/router-bits-boring-bits.png`,
      `${docProduct}/tongue-groove-cutter-set.jpg`,
    ],
    sortOrder: 20,
  },
  {
    name: "Pneumatic Tools",
    slug: "pneumatic-tools",
    description:
      "Pneumatic tools for workshop production and furniture assembly, including Yugo brad nailers, stapler machines, pneumatic screwdrivers, nail pins, and stapler pins.",
    metaTitle: "Pneumatic Tools Sri Lanka",
    metaDescription:
      "Pneumatic tools including Yugo brad nailers, stapler machines, pneumatic screwdrivers, nail pins, and stapler pins from Regent Technologies.",
    images: [
      `${docProduct}/pneumatic-brad-nailer-f50.jpg`,
      `${docProduct}/pneumatic-brad-nailer-f32.jpg`,
      `${docProduct}/pneumatic-stapler-1013j.png`,
      `${docProduct}/pneumatic-screwdriver.png`,
    ],
    sortOrder: 25,
  },
  {
    name: "Pneumatic Brad Nailer Machine F50",
    slug: "pneumatic-brad-nailer-f50",
    description:
      "Yugo F50 pneumatic brad nailer machine with 100 nail capacity and 70-100 psi operating pressure for furniture, woodworking, and workshop fastening work.",
    metaTitle: "Yugo F50 Pneumatic Brad Nailer",
    metaDescription:
      "Yugo F50 pneumatic brad nailer machine with 100 nail capacity and 70-100 psi operating pressure from Regent Technologies.",
    images: [`${docProduct}/pneumatic-brad-nailer-f50.jpg`],
    sortOrder: 30,
  },
  {
    name: "Pneumatic Brad Nailer Machine F32",
    slug: "pneumatic-brad-nailer-f32",
    description:
      "Yugo F32 pneumatic brad nailer machine with 50-85 psi operating pressure for workshop fastening, furniture production, and daily pneumatic tool use.",
    metaTitle: "Yugo F32 Pneumatic Brad Nailer",
    metaDescription:
      "Yugo F32 pneumatic brad nailer machine with 50-85 psi operating pressure for workshops and furniture production.",
    images: [`${docProduct}/pneumatic-brad-nailer-f32.jpg`],
    sortOrder: 40,
  },
  {
    name: "Pneumatic Stapler Machine 1013J",
    slug: "pneumatic-stapler-1013j",
    description:
      "Yugo 1013J pneumatic stapler machine with 100 staple capacity for production fastening, furniture assembly, and workshop operations.",
    metaTitle: "Yugo 1013J Pneumatic Stapler",
    metaDescription:
      "Yugo 1013J pneumatic stapler machine with 100 staple capacity for furniture and workshop production.",
    images: [`${docProduct}/pneumatic-stapler-1013j.png`],
    sortOrder: 50,
  },
  {
    name: "Pneumatic Stapler Machine 422J",
    slug: "pneumatic-stapler-422j",
    description:
      "Yugo 422J pneumatic stapler machine for workshop fastening and furniture production, supported by Regent Technologies product guidance and accessory supply.",
    metaTitle: "Yugo 422J Pneumatic Stapler",
    metaDescription:
      "Yugo 422J pneumatic stapler machine for workshop fastening and furniture production from Regent Technologies.",
    images: [`${docProduct}/pneumatic-stapler-422j.jpg`],
    sortOrder: 60,
  },
  {
    name: "Pneumatic Screwdrivers",
    slug: "pneumatic-screwdrivers",
    description:
      "Pneumatic screwdrivers with 3/8 inch, 10 mm drilling capacity, 1,800 rpm free speed, and 180-220 mm overall length for production and maintenance work.",
    metaTitle: "Pneumatic Screwdrivers",
    metaDescription:
      "Pneumatic screwdrivers with 10 mm drilling capacity and 1,800 rpm free speed for workshop production and maintenance work.",
    images: [`${docProduct}/pneumatic-screwdriver.png`],
    sortOrder: 70,
  },
  {
    name: "Power Tools",
    slug: "power-tools",
    description:
      "Workshop-ready power tools including routers, drills, grinders, planers, jig-saws, circular saws, and screw drivers for woodworking, service, and production teams.",
    metaTitle: "Power Tools Sri Lanka",
    metaDescription:
      "Power tools including routers, drills, grinders, planers, jig-saws, circular saws, and screw drivers from Regent Technologies.",
    images: [
      `${docProduct}/drill-machine.png`,
      `${docProduct}/grinder-machine.jpg`,
      `${docProduct}/router-machine.jpg`,
    ],
    sortOrder: 80,
  },
  {
    name: "Routers",
    slug: "routers",
    description:
      "Router machines with 12 mm chuck diameter, 840-1,700 W rated input power, 22,000-23,000 rpm no-load speed, and 0-65 mm plunge running capability.",
    metaTitle: "Router Machines",
    metaDescription:
      "Router machines with 12 mm chuck diameter, 840-1,700 W input power, and 22,000-23,000 rpm no-load speed.",
    images: [`${docProduct}/router-machine.jpg`],
    sortOrder: 90,
  },
  {
    name: "Drills",
    slug: "industrial-drills",
    description:
      "Drills from Bosch, Skill, and Chinese brands with up to 10 mm drilling diameter, 250-450 W rated power input, 0-3500 rpm rated speed, speed control, and direction control.",
    metaTitle: "Workshop Drills",
    metaDescription:
      "Drills from Bosch, Skill, and Chinese brands with up to 10 mm drilling diameter, speed control, and direction control.",
    images: [
      `${docProduct}/drill-machine.png`,
      `${docProduct}/boring-bits.jpg`,
    ],
    sortOrder: 100,
  },
  {
    name: "Grinders",
    slug: "grinders",
    description:
      "Grinders for workshop cutting and surface work with 100-115 mm capacity, 10,000-12,000 rpm rated speed, and 500-720 W rated power input.",
    metaTitle: "Workshop Grinders",
    metaDescription:
      "Workshop grinders with 100-115 mm capacity, 10,000-12,000 rpm rated speed, and 500-720 W input power.",
    images: [`${docProduct}/grinder-machine.jpg`],
    sortOrder: 110,
  },
  {
    name: "Planers",
    slug: "planers",
    description:
      "Planer machines with 80-136 mm planing width, 1-3 mm planing depth, 16,000 rpm rated speed, 290-415 mm length, and 500-960 W rated input power.",
    metaTitle: "Planer Machines",
    metaDescription:
      "Planer machines with 80-136 mm planing width, 1-3 mm planing depth, and 16,000 rpm rated speed.",
    images: [`${docProduct}/planer-machine.png`],
    sortOrder: 120,
  },
  {
    name: "Jig-Saws",
    slug: "jig-saws",
    description:
      "Jig-saws with 65 mm size class, 55-65 mm cutting capacity, 500-3000 rpm no-load speed, and 390-600 W rated input power.",
    metaTitle: "Jig-Saws",
    metaDescription:
      "Jig-saws with 55-65 mm cutting capacity, 500-3000 rpm no-load speed, and 390-600 W rated input power.",
    images: [`${docProduct}/jig-saw-machine.jpg`],
    sortOrder: 130,
  },
  {
    name: "Circular Saws",
    slug: "circular-saws",
    description:
      "Circular saw machines with 185-235 mm capacity, 1,050-1,380 W rated power input, and 4,100-5,000 rpm rated speed for workshop cutting work.",
    metaTitle: "Circular Saw Machines",
    metaDescription:
      "Circular saw machines with 185-235 mm capacity, 1,050-1,380 W rated input, and 4,100-5,000 rpm speed.",
    images: [`${docProduct}/circular-saw-machine.jpg`],
    sortOrder: 140,
  },
  {
    name: "Screw Drivers",
    slug: "screw-drivers",
    description:
      "Power screw drivers for 6 mm screw diameter and 10-15 mm drill diameter, with 250-1,000 rpm no-load speed and 3.6-7.2 V battery voltage.",
    metaTitle: "Power Screw Drivers",
    metaDescription:
      "Power screw drivers for 6 mm screw diameter, 10-15 mm drilling, 250-1,000 rpm speed, and 3.6-7.2 V battery voltage.",
    images: [`${docProduct}/screwdriver-machine.png`],
    sortOrder: 150,
  },
  {
    name: "Tyre Rebuilding Tools",
    slug: "tyre-rebuilding-tools",
    description:
      "Tyre rebuilding tools for rebuild and restoration workflows, including tyre buffing blades and R6 refills for consistent rubber removal and surface preparation.",
    metaTitle: "Tyre Rebuilding Tools",
    metaDescription:
      "Tyre rebuilding tools including tyre buffing blades and R6 refills for rebuild and restoration workflows.",
    images: [
      `${docProduct}/tyre-buffing-blades.jpg`,
      `${docProduct}/r6-refills.jpg`,
    ],
    sortOrder: 160,
  },
  {
    name: "Tyre Buffing Blades",
    slug: "tyre-buffing-blades",
    description:
      "Tyre buffing blades used to maintain a consistent cutting edge and produce a uniform surface texture across the tyre during rebuilding work.",
    metaTitle: "Tyre Buffing Blades",
    metaDescription:
      "Tyre buffing blades for consistent cutting edge performance and uniform surface texture during tyre rebuilding.",
    images: [`${docProduct}/tyre-buffing-blades.jpg`],
    sortOrder: 170,
  },
  {
    name: "R6 Refills",
    slug: "r6-refills",
    description:
      "R5 and R6 rasp refills for removing large amounts of rubber quickly and easily during tyre rebuilding and restoration workflows.",
    metaTitle: "R6 Refills for Tyre Rebuilding",
    metaDescription:
      "R5 and R6 rasp refills for quick rubber removal during tyre rebuilding and restoration workflows.",
    images: [`${docProduct}/r6-refills.jpg`],
    sortOrder: 180,
  },
  {
    name: "Woodworking Tools",
    slug: "woodworking-tools",
    description:
      "Woodworking tools and furniture hardware including stainless steel tube handles, drawer runners, magnets, drawer lockers, hinges, shelf supports, sanding rolls, sanding belts, router bits, boring bits, cutter sets, mortising chisel bits, and planer blades.",
    metaTitle: "Woodworking Tools Sri Lanka",
    metaDescription:
      "Woodworking tools, furniture hardware, sanding products, router bits, boring bits, cutter sets, and planer blades.",
    images: [
      `${docProduct}/drawer-runners.png`,
      `${docProduct}/router-bits-boring-bits.png`,
      `${docProduct}/sanding-rolls-belts.jpg`,
    ],
    sortOrder: 190,
  },
  {
    name: "Stainless Steel Tube Handles",
    slug: "stainless-steel-tube-handles",
    description:
      "Stainless steel tube handles for furniture, cabinets, and woodworking installations that need durable and clean hardware finishes.",
    metaTitle: "Stainless Steel Tube Handles",
    metaDescription:
      "Stainless steel tube handles for furniture, cabinet, and woodworking hardware applications.",
    images: [`${docProduct}/stainless-steel-tube-handles.png`],
    sortOrder: 200,
  },
  {
    name: "Drawer Runners",
    slug: "drawer-runners",
    description:
      "Drawer runners for furniture and cabinet production, supplied as practical woodworking hardware for daily workshop installation needs.",
    metaTitle: "Drawer Runners",
    metaDescription:
      "Drawer runners for furniture and cabinet production from Regent Technologies.",
    images: [`${docProduct}/drawer-runners.png`],
    sortOrder: 210,
  },
  {
    name: "Magnets",
    slug: "magnets",
    description:
      "Furniture and cabinet magnets for woodworking installations, cabinet closures, and daily hardware fitting work.",
    metaTitle: "Furniture Magnets",
    metaDescription:
      "Furniture and cabinet magnets for woodworking installations and hardware fitting work.",
    images: [`${docProduct}/magnets.png`],
    sortOrder: 220,
  },
  {
    name: "Drawer Lockers",
    slug: "drawer-lockers",
    description:
      "Drawer lockers for furniture, cabinet, and woodworking applications that need simple, dependable locking hardware.",
    metaTitle: "Drawer Lockers",
    metaDescription:
      "Drawer lockers for furniture, cabinet, and woodworking applications from Regent Technologies.",
    images: [`${docProduct}/drawer-lockers.jpg`],
    sortOrder: 230,
  },
  {
    name: "Hinges Set",
    slug: "hinges-set",
    description:
      "Hinges set options for furniture and cabinet production, supporting woodworking assembly and hardware installation needs.",
    metaTitle: "Hinges Set",
    metaDescription:
      "Hinges set options for furniture, cabinet production, and woodworking hardware installation.",
    images: [`${docProduct}/hinges-set.png`],
    sortOrder: 240,
  },
  {
    name: "Shelf Supports",
    slug: "shelf-supports",
    description:
      "Shelf supports for cabinets, shelving, furniture builds, and woodworking hardware supply requirements.",
    metaTitle: "Shelf Supports",
    metaDescription:
      "Shelf supports for cabinets, shelving, furniture builds, and woodworking hardware supply.",
    images: [`${docProduct}/shelf-supports.png`],
    sortOrder: 250,
  },
  {
    name: "Sanding Rolls & Sanding Belts",
    slug: "sanding-rolls-belts",
    description:
      "Sanding rolls and sanding belts for woodworking preparation, finishing, and workshop abrasive requirements.",
    metaTitle: "Sanding Rolls and Sanding Belts",
    metaDescription:
      "Sanding rolls and sanding belts for woodworking preparation, finishing, and workshop abrasive use.",
    images: [`${docProduct}/sanding-rolls-belts.jpg`],
    sortOrder: 260,
  },
  {
    name: "Router Bits & Boring Bits",
    slug: "router-bits-boring-bits",
    description:
      "Router bits and boring bits for woodworking routing, trimming, boring, cabinet work, and production cutting applications.",
    metaTitle: "Router Bits and Boring Bits",
    metaDescription:
      "Router bits and boring bits for woodworking routing, trimming, boring, cabinet work, and production cutting.",
    images: [`${docProduct}/router-bits-boring-bits.png`],
    sortOrder: 270,
  },
  {
    name: "Tongue & Groove Cutter Set",
    slug: "tongue-groove-cutter-set",
    description:
      "Tongue and groove cutter set for woodworking profiles, joinery, and repeatable board or panel production.",
    metaTitle: "Tongue and Groove Cutter Set",
    metaDescription:
      "Tongue and groove cutter set for woodworking profiles, joinery, and repeatable production.",
    images: [`${docProduct}/tongue-groove-cutter-set.jpg`],
    sortOrder: 280,
  },
  {
    name: "Mortising Chisel Bit",
    slug: "mortising-chisel-bit",
    description:
      "Mortising chisel bit for woodworking mortise preparation, square-hole boring, joinery, and furniture production.",
    metaTitle: "Mortising Chisel Bit",
    metaDescription:
      "Mortising chisel bit for woodworking mortise preparation, square-hole boring, joinery, and furniture production.",
    images: [`${docProduct}/boring-bits.jpg`],
    sortOrder: 290,
  },
  {
    name: "Hand Planer Blades",
    slug: "hand-planer-blades",
    description:
      "Hand planer blades for hand tool and woodworking applications, including replacement blade support for workshop preparation and finishing work.",
    metaTitle: "Hand Planer Blades",
    metaDescription:
      "Hand planer blades for hand tool and woodworking applications, replacement support, preparation, and finishing work.",
    images: [`${docProduct}/hand-planer-blades.jpg`],
    sortOrder: 300,
  },
  {
    name: "Power Tool Accessories",
    slug: "power-tool-accessories",
    description:
      "Power tool accessories including band saw blades, boring bits, circular saw blades, mortising chisel bits, planer blades, router bits, sanding belts, sanding rolls, Bosch screw bits, and tongue and groove cutter sets.",
    metaTitle: "Power Tool Accessories",
    metaDescription:
      "Power tool accessories including band saw blades, boring bits, circular saw blades, planer blades, router bits, sanding products, and screw bits.",
    images: [
      `${docProduct}/boring-bits.jpg`,
      `${docProduct}/sanding-rolls-belts.jpg`,
      `${docProduct}/circular-saw-blade.jpg`,
    ],
    sortOrder: 310,
  },
  {
    name: "Nail Pins",
    slug: "nail-pins",
    description:
      "Nail pins for pneumatic brad nailer machines, supporting F50 and F32 fastening workflows in furniture and woodworking production.",
    metaTitle: "Nail Pins for Pneumatic Tools",
    metaDescription:
      "Nail pins for pneumatic brad nailer machines including F50 and F32 fastening workflows.",
    images: [`${docProduct}/pneumatic-brad-nailer-f50.jpg`],
    sortOrder: 320,
  },
  {
    name: "Stapler Pins",
    slug: "stapler-pins",
    description:
      "Stapler pins for pneumatic stapler machines, supporting 1013J and 422J fastening applications in workshop and furniture production.",
    metaTitle: "Stapler Pins for Pneumatic Tools",
    metaDescription:
      "Stapler pins for pneumatic stapler machines including 1013J and 422J fastening applications.",
    images: [`${docProduct}/pneumatic-stapler-1013j.png`],
    sortOrder: 330,
  },
  {
    name: "Band Saw Blades",
    slug: "band-saw-blades",
    description:
      "Band saw blades for power tool accessory requirements, workshop cutting applications, and production support.",
    metaTitle: "Band Saw Blades",
    metaDescription:
      "Band saw blades for power tool accessory requirements, workshop cutting applications, and production support.",
    images: [`${docProduct}/circular-saw-blade.jpg`],
    sortOrder: 340,
  },
  {
    name: "Boring Bits",
    slug: "boring-bits",
    description:
      "Boring bits for power tool and woodworking accessory needs, including cabinet, hinge, and production boring applications.",
    metaTitle: "Boring Bits",
    metaDescription:
      "Boring bits for power tool and woodworking accessory needs, cabinet, hinge, and production boring applications.",
    images: [`${docProduct}/boring-bits.jpg`],
    sortOrder: 350,
  },
  {
    name: "Circular Saw Blades",
    slug: "power-tool-circular-saw-blades",
    description:
      "Circular saw blades for power tool accessory supply, cutting applications, and sharpening-supported production workflows.",
    metaTitle: "Circular Saw Blades",
    metaDescription:
      "Circular saw blades for power tool accessory supply, cutting applications, and sharpening-supported workflows.",
    images: [
      `${docProduct}/circular-saw-blade.jpg`,
      `${docProduct}/circular-saw-machine.jpg`,
    ],
    sortOrder: 360,
  },
  {
    name: "Planer Blades",
    slug: "planer-blades",
    description:
      "Planer blades for power tool and woodworking accessory requirements, supported by Regent Technologies sharpening and product guidance.",
    metaTitle: "Planer Blades",
    metaDescription:
      "Planer blades for power tool and woodworking accessory requirements with sharpening and product guidance.",
    images: [`${docProduct}/planer-carbon-blades.png`],
    sortOrder: 370,
  },
  {
    name: "Router Bits",
    slug: "router-bits",
    description:
      "Router bits for power tool and woodworking use, including profiling, trimming, shaping, and production routing applications.",
    metaTitle: "Router Bits",
    metaDescription:
      "Router bits for woodworking profiling, trimming, shaping, and production routing applications.",
    images: [`${docProduct}/router-bits-boring-bits.png`],
    sortOrder: 380,
  },
  {
    name: "Screw Bits (Bosch)",
    slug: "screw-bits-bosch",
    description:
      "Bosch screw bits for power tool accessory requirements, screw driving, assembly work, and daily workshop fastening tasks.",
    metaTitle: "Bosch Screw Bits",
    metaDescription:
      "Bosch screw bits for power tool accessory requirements, screw driving, assembly work, and workshop fastening tasks.",
    images: [`${docProduct}/drill-machine.png`],
    sortOrder: 390,
  },
  {
    name: "TCT Blades",
    slug: "tct-blades",
    description:
      "Tungsten carbide tipped blades for industrial cutting applications, supported by Regent Technologies automated sharpening and service expertise.",
    metaTitle: "TCT Blades and Sharpening",
    metaDescription:
      "TCT blades and automated sharpening support for industrial cutting applications in Sri Lanka.",
    images: [
      `${docProduct}/circular-saw-blade.jpg`,
      `${docProduct}/profile-cutting-blade.png`,
    ],
    sortOrder: 400,
  },
  {
    name: "HSS Blades",
    slug: "hss-blades",
    description:
      "High-speed steel blade support for paper cutting, workshop production, and industrial tooling applications that need dependable sharpening turnaround.",
    metaTitle: "HSS Blades and Sharpening",
    metaDescription:
      "HSS blade support and automated sharpening for paper cutting, workshop production, and industrial tooling applications.",
    images: [
      `${docProduct}/paper-cutting-blades.jpg`,
      `${docProduct}/winder-blades.png`,
    ],
    sortOrder: 410,
  },
  {
    name: "Maintenance Kits",
    slug: "maintenance-kits",
    description:
      "Workshop maintenance kits, consumables, and support items for routine servicing, tool care, quick on-site work, and production support.",
    metaTitle: "Workshop Maintenance Kits",
    metaDescription:
      "Workshop maintenance kits, consumables, and support items for routine servicing, tool care, and quick on-site work.",
    images: [
      `${docProduct}/boring-bits.jpg`,
      `${docProduct}/hand-planer-blades.jpg`,
    ],
    sortOrder: 420,
  },
  {
    name: "Technician Toolkits",
    slug: "technician-toolkits",
    description:
      "Portable technician toolkits for service work, maintenance teams, and field-ready workshop support, confirmed for the Regent Technologies catalog.",
    metaTitle: "Technician Toolkits",
    metaDescription:
      "Portable technician toolkits for service work, maintenance teams, and field-ready workshop support.",
    images: [
      `${docProduct}/stainless-steel-tube-handles.png`,
      `${docProduct}/boring-bits.jpg`,
    ],
    sortOrder: 430,
  },
  {
    name: "Rebuild Wheel Systems",
    slug: "rebuild-wheel-systems",
    description:
      "Rebuild wheel systems and compatible tooling support for rebuild, restoration, tyre rebuilding, and workshop workflows that need consistent uptime.",
    metaTitle: "Rebuild Wheel Systems",
    metaDescription:
      "Rebuild wheel systems and compatible tooling support for rebuild, restoration, and tyre rebuilding workflows.",
    images: [
      `${docProduct}/tyre-buffing-blades.jpg`,
      `${docProduct}/r6-refills.jpg`,
    ],
    sortOrder: 440,
  },
] as const;

export const initialFaqs = faqItems.map((item, index) => ({
  question: item.question,
  answer: item.answer,
  isPublished: true,
  sortOrder: (index + 1) * 10,
}));
