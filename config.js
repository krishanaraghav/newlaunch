// Project Configuration Examples
// This file demonstrates how to configure the page for different projects

const PROJECT_CONFIGURATIONS = {
    // Current Ganga Realty configuration
    gangaSector90: {
        companyName: "Avyukta Realty",
        partnerName: "Ganga Realty",
        projectName: "Ganga Realty Sector 90",
        location: "Sector 90, Gurugram",
        tagline: "Your Gateway to Luxury Living in New Gurugram",
        description: "Avyukta Realty (Channel Partner of Ganga Realty) presents an exclusive residential project in Sector 90, Gurugram. Experience a blend of modern design, strategic location, and world-class amenities.",
        highlights: [
            "After the grand success of Kashi Ganga Realty, we are proud to launch a new landmark project in Sector 90, Gurugram.",
            "Prime location with excellent connectivity via Dwarka Expressway and NH-48",
            "Luxury 2, 3, and 4 BHK apartments with modern amenities",
            "Investment opportunity in rapidly developing New Gurugram"
        ],
        amenities: [
            "Swimming Pool & Clubhouse",
            "Gymnasium & Spa",
            "Children's Play Area",
            "24/7 Security",
            "Landscaped Gardens",
            "Power Backup",
            "Parking Facilities",
            "Jogging Track"
        ],
        landmarks: [
            {
                name: "Dwarka Expressway",
                image: "./de.jpg",
                description: "Seamless connectivity to Delhi and beyond"
            },
            {
                name: "IMT Manesar",
                image: "./imt.webp",
                description: "Major industrial and business hub nearby"
            },
            {
                name: "RPS International School",
                image: "./rps.jpg",
                description: "Quality education options for families"
            }
        ],
        contact: {
            email: "realtyavyukta@gmail.com",
            phone: "9289329903",
            whatsapp: "9289329903"
        },
        heroImage: "8e2f504a-b64d-45fd-8cff-3df1d1e6c3d4.png"
    },

    // Example configuration for another project
    prestigeGolfshire: {
        companyName: "Avyukta Realty",
        partnerName: "Prestige Group",
        projectName: "Prestige Golfshire",
        location: "Sector 150, Noida",
        tagline: "Luxury Golf Living Redefined",
        description: "Experience unparalleled luxury living at Prestige Golfshire, Noida's premier golf-themed residential community. Premium apartments overlooking the championship golf course.",
        highlights: [
            "Direct access to 18-hole championship golf course",
            "Premium 2, 3, and 4 BHK apartments with golf course views",
            "World-class amenities and facilities",
            "Strategic location with excellent connectivity"
        ],
        amenities: [
            "Golf Course Access",
            "Infinity Swimming Pool",
            "Spa & Wellness Center",
            "Tennis Courts",
            "Business Center",
            "Concierge Services",
            "Multi-level Parking",
            "Children's Activity Zone"
        ],
        landmarks: [
            {
                name: "Noida Expressway",
                image: "./noida-expressway.jpg",
                description: "Seamless connectivity to Delhi NCR"
            },
            {
                name: "Sector 150 Metro Station",
                image: "./metro-station.jpg",
                description: "Direct metro connectivity"
            },
            {
                name: "Amity University",
                image: "./amity-university.jpg",
                description: "Premier educational institution nearby"
            }
        ],
        contact: {
            email: "realtyavyukta@gmail.com",
            phone: "9289329903",
            whatsapp: "9289329903"
        },
        heroImage: "prestige-golfshire.jpg"
    },

    // Example configuration for commercial project
    commercialPlaza: {
        companyName: "Avyukta Realty",
        partnerName: "DLF Limited",
        projectName: "DLF Commercial Plaza",
        location: "Golf Course Road, Gurugram",
        tagline: "Prime Commercial Spaces for Modern Businesses",
        description: "Premium commercial spaces at DLF Commercial Plaza, strategically located on Golf Course Road. Perfect for offices, retail, and restaurants.",
        highlights: [
            "Grade A commercial building with modern architecture",
            "Prime location on Golf Course Road",
            "Flexible office spaces from 500 sq ft onwards",
            "High footfall retail spaces available"
        ],
        amenities: [
            "24/7 Security",
            "High-Speed Elevators",
            "Power Backup",
            "Ample Parking",
            "Food Court",
            "Conference Rooms",
            "Modern HVAC System",
            "Green Building Certified"
        ],
        landmarks: [
            {
                name: "Golf Course Road",
                image: "./golf-course-road.jpg",
                description: "Gurugram's premier business district"
            },
            {
                name: "Rapid Metro Station",
                image: "./rapid-metro.jpg",
                description: "Direct metro connectivity"
            },
            {
                name: "DLF Cyber City",
                image: "./cyber-city.jpg",
                description: "Major IT and business hub"
            }
        ],
        contact: {
            email: "commercial@avyuktarealty.com",
            phone: "9289329903",
            whatsapp: "9289329903"
        },
        heroImage: "dlf-commercial.jpg"
    }
};

// To switch between projects, simply change the PROJECT_CONFIG assignment in index.html
// For example: const PROJECT_CONFIG = PROJECT_CONFIGURATIONS.prestigeGolfshire;
