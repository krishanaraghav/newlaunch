import heroImg from '../assets/newlaunch.jpeg'
import highlightImg1 from '../assets/newlaunch1.jpeg'
import highlightImg2 from '../assets/de.jpg'
import highlightImg3 from '../assets/newlaunch.jpeg'
import highlightImg4 from '../assets/imt.webp'
import highlightImg5 from '../assets/rps.jpg'

export const SECTION_ORDER = ['highlights', 'amenities', 'location', 'contact'] as const

export const highlightLabels = [
  'Grand Launch Event',
  'Seamless Urban Connectivity',
  'Iconic Living Spaces',
  'High-Growth Opportunity',
  'Resort-Like Lifestyle',
  'Investment Advantage',
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
  'Explore the launch',
  'Unlock connectivity',
  'Browse our homes',
  'See growth insights',
  'Experience the lifestyle',
  'Understand the advantage',
]

export const amenityCTA = 'Exclusive with ownership'

export const PROJECT_CONFIG = {
  companyName: 'Ganga Realty',
  partnerName: 'Ganga Realty',
  projectName: 'Ganga Realty Sector 90',
  location: 'Sector 90, Gurugram',
  tagline: 'Where Luxury Meets Lifestyle',
  description:
    'Welcome to Ganga Realty\'s prestigious new address in Sector 90, Gurugram—where luxury, connectivity, and lifestyle come together in perfect harmony.',
  seoDescription:
    'Ganga Realty Sector 90 Luxury Apartments at Gurgaon is a new residential flats and Apartments with 2 BHK, 3 BHK, and 4 BHK residences. Book your home now with best deals.',
  seoKeywords: 'buy apartments in Ganga Realty Sector 90 gurgaon, book apartments in Ganga Realty Sector 90 gurgaon, apartments in Ganga Realty Sector 90 gurgaon, Book Ganga Realty Sector 90 gurgaon, apartments in ganga realty Sector 90 gurgaon',
  highlights: [
    'Following the remarkable success of Kashi by Ganga Realty, we proudly unveil our next landmark in Sector 90, Gurugram.',
    'Strategically positioned with effortless access to Dwarka Expressway and NH-48',
    'Premium 3 & 4 BHK homes crafted with contemporary design and features',
    'Investment opportunity in rapidly developing New Gurugram',
    'Resort-style amenities curated for premium living',
    'Secure community with elevated wellbeing features',
  ],
  amenities: [
    'Swimming Pool & Elegant Clubhouse',
    'Well-equipped Gym & Rejuvenating Spa',
    'Dedicated Children\'s Play Area',
    '24/7 Security',
    'Landscaped Gardens',
    'Power Backup',
    'Parking Facilities',
    'Jogging Track',
  ],
  landmarks: [
    {
      name: 'Dwarka Expressway',
      image: highlightImg2,
      description: 'Fast-track access to Delhi and major destinations',
    },
    {
      name: 'IMT Manesar',
      image: highlightImg4,
      description: 'Thriving hub for industry and commerce',
    },
    {
      name: 'RPS International School',
      image: highlightImg5,
      description: 'Top-tier education for growing families',
    },
  ],
  contact: {
    email: 'gopal.singh07@gmail.com',
    ccEmails: ['techiekrishana@gmail.com'],
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

