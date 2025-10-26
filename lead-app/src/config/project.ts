import heroImg from '../assets/newlaunch.jpeg'
import highlightImg1 from '../assets/newlaunch1.jpeg'
import highlightImg2 from '../assets/de.jpg'
import highlightImg3 from '../assets/newlaunch.jpeg'
import highlightImg4 from '../assets/imt.webp'
import highlightImg5 from '../assets/rps.jpg'

export const SECTION_ORDER = ['highlights', 'amenities', 'location', 'contact'] as const

export const highlightLabels = [
  'Ganga Sec90 Gurgaon Innovation Launch',
  'Smart Apartment Connectivity',
  'Futuristic Residential Design',
  'High-Growth Tech Investment',
  'Sustainable Living Experience',
  'Smart Investment Future',
]

export const highlightImages = [
  highlightImg1,
  highlightImg2,
  highlightImg3,
  highlightImg4,
  highlightImg5,
  highlightImg1,
]

export const highlightCTA = [
  'Explore Innovation',
  'Discover Smart Living',
  'View Modern Homes',
  'Analyze Tech Investment',
  'Experience Sustainability',
  'Learn Future Living',
]

export const amenityCTA = 'Smart amenities included'

export const PROJECT_CONFIG = {
  companyName: 'Avyukta Realty',
  partnerName: 'Ganga Realty',
  projectName: 'Ganga Sec90 Gurgaon',
  location: 'Sector 90, Gurugram',
  tagline: 'Modern Luxury Living in Sec90 Gurgaon - Where Dreams Come Home',
  description:
    'Welcome to Ganga Sec90 Gurgaon - a revolutionary residential project offering contemporary 3, 4 BHK apartments with cutting-edge amenities, strategic Dwarka Expressway access, and sustainable living solutions. Experience the future of urban living.',
  highlights: [
    'Ganga Sec90 Gurgaon: Innovative residential development showcasing futuristic design and eco-friendly construction in Sector 90',
    'Strategic positioning with direct Dwarka Expressway connectivity and metro accessibility - perfect for modern urban professionals',
    'Contemporary 2, 3, 4 BHK apartments featuring smart home technology, energy-efficient systems, and premium finishes',
    'High-potential investment destination in New Gurugram\'s emerging residential hub with excellent appreciation prospects',
    'Sustainable living with green building features, solar panels, rainwater harvesting, and eco-friendly amenities',
    'Technology-enabled community with smart security, automated systems, and digital lifestyle conveniences',
  ],
  amenities: [
    'Olympic-Size Swimming Pool & Modern Clubhouse',
    'Advanced Fitness Studio & Yoga Pavilion',
    'Interactive Kids Zone & Learning Center',
    'AI-Powered Security & Smart Access Control',
    'Vertical Gardens & Sustainable Landscaping',
    'Solar Power Integration & Green Energy',
    'Automated Parking System & EV Charging',
    'Multi-Purpose Sports Complex & Wellness Center',
  ],
  landmarks: [
    {
      name: 'Dwarka Expressway Smart Connectivity',
      image: highlightImg2,
      description: 'Ganga Sec90 Gurgaon offers intelligent connectivity to Dwarka Expressway with smart traffic management and reduced commute times to Delhi',
    },
    {
      name: 'IMT Manesar Tech Hub',
      image: highlightImg4,
      description: 'Proximity to IMT Manesar technology and business district - ideal for IT professionals and entrepreneurs',
    },
    {
      name: 'RPS International School Network',
      image: highlightImg5,
      description: 'Access to premium educational institutions including RPS International School - ensuring world-class education for your children',
    },
  ],
  contact: {
    email: 'realtyavyukta@gmail.com',
    phone: '9289329903',
    whatsapp: '9289329903',
  },
  heroImage: heroImg,
}

export const CARD_COUNTS = {
  highlights: PROJECT_CONFIG.highlights.length,
  amenities: PROJECT_CONFIG.amenities.length,
  location: PROJECT_CONFIG.landmarks.length,
}

export type SectionKey = (typeof SECTION_ORDER)[number]
