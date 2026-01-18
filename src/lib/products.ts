export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  specifications?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: "stalls", name: "Stalls & Hangers", icon: "🏗️", description: "Octonorm, Maxima stalls & German hangers", productCount: 12 },
  { id: "furniture", name: "Furniture", icon: "🪑", description: "Chairs, tables & special furniture", productCount: 18 },
  { id: "flooring", name: "Flooring & Platforms", icon: "🟫", description: "Wooden platforms & synthetic carpets", productCount: 8 },
  { id: "climate", name: "Climate Control", icon: "❄️", description: "Temporary air conditioners & cooling", productCount: 6 },
  { id: "lighting", name: "Lighting & Power", icon: "💡", description: "Lighting systems, generators & cables", productCount: 15 },
  { id: "staging", name: "Staging & Barriers", icon: "🎭", description: "Stages, iron barricading & structures", productCount: 10 },
  { id: "services", name: "Labour & Services", icon: "👷", description: "Skilled labour, supervisors & managers", productCount: 5 },
  { id: "logistics", name: "Logistics", icon: "🚛", description: "Vehicles, warehousing & transport", productCount: 7 },
];

export const products: Product[] = [
  // Stalls & Hangers
  { id: "1", name: "Aluminium German Hanger", category: "stalls", description: "Premium quality aluminium German hangers, perfect for large-scale exhibitions and outdoor events. Weather-resistant and easy to assemble.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", pricePerDay: 500, available: true, specifications: ["Load capacity: 500kg", "Height adjustable", "Quick assembly"] },
  { id: "2", name: "Octonorm Stall System", category: "stalls", description: "Modular octanorm exhibition stall system. Versatile and professional appearance for trade shows.", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80", pricePerDay: 350, available: true, specifications: ["3m x 3m standard", "Customizable panels", "Lockable storage"] },
  { id: "3", name: "Maxima Stall Premium", category: "stalls", description: "High-end Maxima stall system with sleek finish. Ideal for corporate exhibitions and premium events.", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", pricePerDay: 450, available: true, specifications: ["Modern design", "LED compatible", "Premium finish"] },
  
  // Furniture
  { id: "4", name: "Cushion Chair with Cover", category: "furniture", description: "Comfortable cushion chairs with elegant fabric covers. Perfect for conferences and formal events.", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80", pricePerDay: 25, available: true, specifications: ["Washable covers", "Multiple colors", "Stackable"] },
  { id: "5", name: "Plastic Chair Standard", category: "furniture", description: "Durable plastic chairs suitable for outdoor events and large gatherings.", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80", pricePerDay: 10, available: true, specifications: ["Weather-resistant", "Lightweight", "Easy to clean"] },
  { id: "6", name: "VIP Lounge Sofa Set", category: "furniture", description: "Premium lounge sofa set for VIP areas and executive zones.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", pricePerDay: 200, available: true, specifications: ["3+1+1 seating", "Premium upholstery", "Coffee table included"] },
  
  // Flooring
  { id: "7", name: "Wooden Platform Module", category: "flooring", description: "Sturdy wooden platforms for elevated stages and walkways. Modular design for flexible configurations.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", pricePerDay: 150, available: true, specifications: ["4ft x 4ft modules", "Non-slip surface", "Height adjustable legs"] },
  { id: "8", name: "Synthetic Carpet Roll", category: "flooring", description: "High-quality synthetic carpet in various colors. Perfect for exhibition floors and event spaces.", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80", pricePerDay: 30, available: true, specifications: ["Per 50 sq ft", "Multiple colors", "Fire retardant"] },
  
  // Climate Control
  { id: "9", name: "Portable AC 2 Ton", category: "climate", description: "Industrial portable air conditioner for temporary cooling solutions at events.", image: "https://images.unsplash.com/photo-1631545806609-35e14ea67c4d?w=800&q=80", pricePerDay: 400, available: true, specifications: ["2 Ton capacity", "Quick cooling", "Low noise"] },
  { id: "10", name: "Industrial Cooler", category: "climate", description: "Large industrial air coolers for outdoor events and semi-open spaces.", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80", pricePerDay: 150, available: true, specifications: ["High airflow", "Water tank included", "Energy efficient"] },
  
  // Lighting & Power
  { id: "11", name: "LED Par Light Set", category: "lighting", description: "Professional LED par lights for stage and event lighting. DMX compatible.", image: "https://images.unsplash.com/photo-1504501650895-f5e7a7c2f39f?w=800&q=80", pricePerDay: 80, available: true, specifications: ["Set of 4 lights", "RGB colors", "DMX control"] },
  { id: "12", name: "Generator 25 KVA", category: "lighting", description: "Silent diesel generator for reliable power backup at events.", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80", pricePerDay: 800, available: true, specifications: ["25 KVA output", "Silent operation", "Auto start"] },
  { id: "13", name: "Power Cable Set", category: "lighting", description: "Industrial power cables and distribution boxes for event power setup.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", pricePerDay: 50, available: true, specifications: ["100m cables", "Distribution box", "Safety certified"] },
  
  // Staging & Barriers
  { id: "14", name: "Stage Platform 20x16", category: "staging", description: "Professional stage platform with skirting. Ideal for performances and presentations.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", pricePerDay: 600, available: true, specifications: ["20ft x 16ft", "Adjustable height", "Includes skirting"] },
  { id: "15", name: "Iron Barricade Set", category: "staging", description: "Crowd control iron barricades for event management and safety.", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80", pricePerDay: 15, available: true, specifications: ["Set of 10", "Interlocking", "Heavy duty"] },
  
  // Services
  { id: "16", name: "Skilled Labour Team", category: "services", description: "Experienced technicians for setup, operation, and dismantling of equipment.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", pricePerDay: 300, available: true, specifications: ["Team of 4", "Trained professionals", "8-hour shift"] },
  { id: "17", name: "Site Supervisor", category: "services", description: "Experienced supervisor for on-site coordination and management.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80", pricePerDay: 500, available: true, specifications: ["12-hour availability", "Communication device", "Experienced"] },
  
  // Logistics
  { id: "18", name: "Transport Vehicle", category: "logistics", description: "Dedicated transport vehicle for equipment delivery and pickup.", image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80", pricePerDay: 400, available: true, specifications: ["20ft container", "Driver included", "Loading assistance"] },
  { id: "19", name: "Warehouse Storage", category: "logistics", description: "Secure warehouse storage facility for event materials.", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80", pricePerDay: 200, available: true, specifications: ["500 sq ft", "24/7 security", "Climate controlled"] },
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(p => p.category === categoryId);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const getCategoryById = (id: string) => {
  return categories.find(c => c.id === id);
};
