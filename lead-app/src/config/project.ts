import heroImg from '../assets/newlaunch.jpeg'
import highlightImg1 from '../assets/newlaunch1.jpeg'
import highlightImg2 from '../assets/de.jpg'
import highlightImg3 from '../assets/newlaunch.jpeg'
import highlightImg4 from '../assets/imt.webp'
import highlightImg5 from '../assets/rps.jpg'

export const SECTION_ORDER = ['highlights', 'amenities', 'location', 'contact'] as const

export const highlightLabels = [
  'Launch Celebration',
  'Hyper-Connected Location',
  'Signature Residences',
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

export const PROJECT_CONFIG = {
  companyName: 'Ganga Realty',
  partnerName: 'Ganga Realty',
  projectName: 'Ganga Realty Sector 90',
  location: 'Sector 90, Gurugram',
  tagline: 'Your Gateway to Luxury Living in New Gurugram',
  description:
    'Ganga Realty presents an exclusive residential project in Sector 90, Gurugram. Experience a blend of modern design, strategic location, and world-class amenities.',
  highlights: [
    'After the grand success of Kashi Ganga Realty, we are proud to launch a new landmark project in Sector 90, Gurugram.',
    'Prime location with excellent connectivity via Dwarka Expressway and NH-48',
    'Luxury 3, and 4 BHK apartments with modern amenities',
    'Investment opportunity in rapidly developing New Gurugram',
    'Resort-style amenities curated for premium living',
    'Secure community with elevated wellbeing features',
  ],
  amenities: [
    'Swimming Pool & Clubhouse',
    'Gymnasium & Spa',
    "Children's Play Area",
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
      description: 'Seamless connectivity to Delhi and beyond',
    },
    {
      name: 'IMT Manesar',
      image: highlightImg4,
      description: 'Major industrial and business hub nearby',
    },
    {
      name: 'RPS International School',
      image: highlightImg5,
      description: 'Quality education options for families',
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

