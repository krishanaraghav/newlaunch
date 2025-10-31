import heroImg from '../assets/Emaar-Serenity-Hills-Sector-86-Gurgaon.png'
import highlightImg1 from '../assets/newlaunch1.jpeg'
import highlightImg2 from '../assets/de.jpg'
import highlightImg3 from '../assets/newlaunch.jpeg'
import highlightImg4 from '../assets/imt.webp'
import highlightImg5 from '../assets/IGI-Airport.png'

export const SECTION_ORDER = ['highlights', 'amenities', 'location', 'contact'] as const

export const highlightLabels = [
  'Dubai Style Luxury Living',
  'Total 7 Towers | G+37 Floors',
  '1700 - 2900 Sq.ft Sizes',
  '100000 Sq.Ft Grand Clubhouse',
  'Span 25 Acres Premium Development',
  'World-Class Emaar Quality',
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
  'Experience Dubai lifestyle',
  'Explore tower details',
  'View floor plans',
  'Discover clubhouse',
  'See master plan',
  'Know about Emaar',
]

export const amenityCTA = 'Exclusive with ownership'

export const PROJECT_CONFIG = {
  companyName: 'Emaar Serenity Hills',
  partnerName: 'Avyukta Realty',
  projectName: 'Emaar Serenity Hills',
  location: 'Sector 86, New Gurgaon',
  tagline: 'Dubai Style Luxury Living in Gurgaon',
  description:
    'Emaar Sector 86 Gurgaon - Emaar Serenity Hills Sec 86 is a 25 acres premium project in Sector 86. Emaar Sec 86 offers Dubai style luxury living with 7 towers rising G+37 floors, featuring 2, 3, 4 BHK and 4 BHK + S residences. Emaar Serenity Hills Sector 86 Gurgaon combines world-class amenities with prime location connectivity.',
  seoDescription:
    'Emaar Sector 86 Gurgaon - Emaar Serenity Hills Sec 86 offers 2, 3, 4 BHK luxury apartments starting 2.70 Cr. Emaar Sec 86 new launch with Dubai style living, 7 towers G+37 floors, 100000 Sq.Ft clubhouse on 25 acres. Book Emaar Serenity Hills Sector 86 Gurgaon now!',
  seoKeywords: 'emaar sector 86, emaar sec 86, emaar serenity hills sec 86 gurgaon, emaar serenity hills sector 86 gurgaon, emaar sector 86 gurgaon, emaar sec 86 new launch, emaar 86 gurgaon apartments, emaar serenity hills sector 86, emaar sector 86 new project, emaar sec 86 gurgaon',
  highlights: [
    'Emaar Sector 86 Gurgaon - Emaar Serenity Hills Sec 86 brings Dubai style luxury living to Sector 86 with iconic architecture and world-class amenities on 25 acres',
    'Emaar Sec 86 location advantage - Just 4 minutes from Dwarka Expressway with seamless connectivity to NH-48, Golf Course Road, DLF Cyber City and IGI Airport',
    'Emaar Serenity Hills Sector 86 Gurgaon offers premium 2, 3, 4 BHK and 4 BHK + S apartments ranging from 1700 to 2900 sq.ft with modern design and international specifications',
    'Emaar Sector 86 investment opportunity - Prime location in New Gurgaon near upcoming Cyber City 2 and metro corridor with high appreciation potential',
    'Emaar Sec 86 amenities - 100,000 sq.ft grand clubhouse with resort-style amenities including swimming pool, yoga center, boutique and conference rooms',
    'Emaar Serenity Hills Sec 86 features 7 magnificent towers rising G+37 floors with 5-tier security, premium finishes and breathtaking city views',
  ],
  amenities: [
    'Swimming Pool & 100,000 Sq.Ft Grand Clubhouse',
    'Yoga & Meditation Center',
    'Landscaped Park & Gardens',
    'Designer Boutique & Retail Space',
    'Conference Room & Business Center',
    'Children\'s Play Ground & Activity Area',
    'Luxury Club & Lounge',
    '5 Tier Security System with CCTV',
  ],
  landmarks: [
    {
      name: 'Dwarka Expressway',
      image: highlightImg2,
      description: '4 mins away - Direct connectivity to Delhi and major hubs',
    },
    {
      name: 'Golf Course Road & DLF Cyber City',
      image: highlightImg4,
      description: 'Easy access to corporate offices, Cyber Hub & Ambience Mall',
    },
    {
      name: 'IGI Airport & Metro',
      image: highlightImg5,
      description: '20 mins from Airport, upcoming metro station in proximity',
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

