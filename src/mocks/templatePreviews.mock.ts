import type { ResumeContent, TemplateId } from '@/types/resumeDocument'

/** Sample resumes for the template library previews. Each template gets a different, role-appropriate persona. */
export const templatePreviews: Record<TemplateId, { role: string; content: ResumeContent }> = {
  "classic": {
    role: "Product Designer",
    content: {
      "contact": {
        "name": "Alex Johnson",
        "email": "alex.johnson@email.com",
        "phone": "+91 98765 43210",
        "location": "Mumbai, India",
        "linkedin": "linkedin.com/in/alexj",
        "github": "",
        "portfolio": ""
      },
      "summary": "Product designer with two years of experience shipping fintech and marketplace features. Comfortable owning a problem from research to handoff.",
      "experience": [
        {
          "id": "p1",
          "title": "Product Designer",
          "company": "Kite & Co.",
          "location": "Mumbai",
          "start": "Jan 2023",
          "end": "Present",
          "description": "",
          "bullets": [
            "Redesigned merchant onboarding, cutting drop-off by 22%",
            "Ran 15 usability sessions and turned findings into roadmap items",
            "Built 30+ components in the shared design system"
          ]
        },
        {
          "id": "p2",
          "title": "UX Design Intern",
          "company": "Studio X",
          "location": "Remote",
          "start": "Jun 2022",
          "end": "Dec 2022",
          "description": "",
          "bullets": [
            "Prototyped 4 mobile flows for a wellness app",
            "Supported research synthesis for two client projects"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "M.Sc. Computer Science",
          "institution": "Mumbai University",
          "location": "Mumbai",
          "dates": "2021 – 2023",
          "details": "GPA 8.6 / 10"
        }
      ],
      "projects": [
        {
          "id": "p4",
          "name": "Split: Ride-sharing Redesign",
          "description": "Case study on fare splitting for shared rides.",
          "tech": [
            "Figma",
            "Prototyping"
          ],
          "link": "",
          "bullets": [
            "Interviewed 14 commuters to map pain points"
          ]
        }
      ],
      "skills": {
        "technical": [
          "User Research",
          "Prototyping",
          "Wireframing"
        ],
        "tools": [
          "Figma",
          "Maze",
          "Notion"
        ],
        "other": [
          "Design Systems",
          "Accessibility"
        ]
      },
      "certifications": [
        {
          "id": "p5",
          "name": "Google UX Design Certificate",
          "issuer": "Coursera",
          "date": "2022",
          "link": ""
        }
      ]
    }
  },
  "modern": {
    role: "Product Designer",
    content: {
      "contact": {
        "name": "Alex Johnson",
        "email": "alex.johnson@email.com",
        "phone": "+91 98765 43210",
        "location": "Mumbai, India",
        "linkedin": "linkedin.com/in/alexj",
        "github": "",
        "portfolio": ""
      },
      "summary": "Design-minded problem solver who pairs clear visual hierarchy with evidence from research.",
      "experience": [
        {
          "id": "p1",
          "title": "Product Designer",
          "company": "Kite & Co.",
          "location": "Mumbai",
          "start": "Jan 2023",
          "end": "Present",
          "description": "",
          "bullets": [
            "Led the merchant app redesign used by 40k+ businesses",
            "Introduced a component audit that removed 60 duplicate patterns"
          ]
        },
        {
          "id": "p2",
          "title": "UX Design Intern",
          "company": "Studio X",
          "location": "Remote",
          "start": "Jun 2022",
          "end": "Dec 2022",
          "description": "",
          "bullets": [
            "Shipped 4 mobile flows from sketch to prototype"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "M.Sc. Computer Science",
          "institution": "Mumbai University",
          "location": "Mumbai",
          "dates": "2021 – 2023",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p4",
          "name": "Planora",
          "description": "Trip-planning app concept.",
          "tech": [
            "Figma",
            "React"
          ],
          "link": "",
          "bullets": [
            "Won 2nd place at a campus product jam"
          ]
        }
      ],
      "skills": {
        "technical": [
          "Figma",
          "User Research",
          "Prototyping",
          "Design Systems"
        ],
        "tools": [
          "HTML/CSS",
          "JavaScript"
        ],
        "other": [
          "Workshops"
        ]
      },
      "certifications": []
    }
  },
  "compact": {
    role: "Product Designer",
    content: {
      "contact": {
        "name": "Taylor Kim",
        "email": "taylor.kim@email.com",
        "phone": "+91 98765 43211",
        "location": "Bengaluru, India",
        "linkedin": "linkedin.com/in/taylork",
        "github": "",
        "portfolio": ""
      },
      "summary": "Designer who ships quickly across web and mobile. Fluent in research, prototyping and developer handoff.",
      "experience": [
        {
          "id": "p1",
          "title": "Product Designer",
          "company": "Northwind Labs",
          "location": "Bengaluru",
          "start": "2023",
          "end": "Present",
          "description": "",
          "bullets": [
            "Own design for a logistics dashboard used daily by 2k operators",
            "Cut task time 35% through a redesigned filter flow",
            "Partner with 3 engineers in weekly reviews"
          ]
        },
        {
          "id": "p2",
          "title": "UX Design Intern",
          "company": "Orbit Health",
          "location": "Remote",
          "start": "2022",
          "end": "2022",
          "description": "",
          "bullets": [
            "Created wireframes for a patient reminder feature",
            "Tested prototypes with 8 participants"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "B.Des Interaction Design",
          "institution": "MIT Institute of Design",
          "location": "Pune",
          "dates": "2019 – 2023",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p4",
          "name": "Planora",
          "description": "Trip planning and budgeting app.",
          "tech": [
            "Figma",
            "React"
          ],
          "link": "",
          "bullets": [
            "Designed the full flow and design tokens"
          ]
        },
        {
          "id": "p5",
          "name": "MockMate AI",
          "description": "Interview practice concept.",
          "tech": [
            "Figma",
            "Prototyping"
          ],
          "link": "",
          "bullets": [
            "Explored voice-first UI patterns"
          ]
        }
      ],
      "skills": {
        "technical": [
          "UX Research",
          "Wireframing",
          "Prototyping"
        ],
        "tools": [
          "Figma",
          "Notion",
          "Jira"
        ],
        "other": [
          "Design Systems",
          "Agile"
        ]
      },
      "certifications": [
        {
          "id": "p6",
          "name": "Nielsen Norman UX Certificate",
          "issuer": "NN/g",
          "date": "2023",
          "link": ""
        }
      ]
    }
  },
  "minimal": {
    role: "Product Designer",
    content: {
      "contact": {
        "name": "Jordan Lee",
        "email": "jordan.lee@email.com",
        "phone": "+91 98765 43212",
        "location": "Mumbai, India",
        "linkedin": "linkedin.com/in/jordanlee",
        "github": "",
        "portfolio": ""
      },
      "summary": "I design calm, useful products and prefer fewer, better decisions.",
      "experience": [
        {
          "id": "p1",
          "title": "Product Designer",
          "company": "Kite & Co.",
          "location": "Mumbai",
          "start": "2023",
          "end": "Present",
          "description": "",
          "bullets": [
            "Simplified checkout to two steps, lifting completion by 18%",
            "Set up a lightweight design review ritual"
          ]
        },
        {
          "id": "p2",
          "title": "UX Design Intern",
          "company": "Studio X",
          "location": "Remote",
          "start": "2022",
          "end": "2022",
          "description": "",
          "bullets": [
            "Supported research for two client engagements"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "M.Sc. Computer Science",
          "institution": "Mumbai University",
          "location": "Mumbai",
          "dates": "2021 – 2023",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p4",
          "name": "Field Notes",
          "description": "A minimalist journaling app.",
          "tech": [
            "Figma",
            "Swift"
          ],
          "link": "",
          "bullets": [
            "Designed and prototyped end to end"
          ]
        }
      ],
      "skills": {
        "technical": [
          "Interaction Design",
          "Typography",
          "Research"
        ],
        "tools": [
          "Figma",
          "Framer"
        ],
        "other": []
      },
      "certifications": []
    }
  },
  "student": {
    role: "Computer Science Student",
    content: {
      "contact": {
        "name": "Riya Sharma",
        "email": "riya.sharma@email.com",
        "phone": "+91 98765 43213",
        "location": "Mumbai, India",
        "linkedin": "linkedin.com/in/riyasharma",
        "github": "",
        "portfolio": ""
      },
      "summary": "Final-year computer science student seeking a software internship. Strong in data structures and applied machine learning.",
      "experience": [
        {
          "id": "p1",
          "title": "Teaching Assistant",
          "company": "Mumbai University",
          "location": "Mumbai",
          "start": "Aug 2023",
          "end": "Present",
          "description": "",
          "bullets": [
            "Supported 120 students in an intro programming lab",
            "Wrote weekly practice problems and solutions"
          ]
        }
      ],
      "education": [
        {
          "id": "p2",
          "degree": "B.Sc. Computer Science",
          "institution": "Mumbai University",
          "location": "Mumbai",
          "dates": "2021 – 2024",
          "details": "CGPA 8.9 / 10 · Dean’s list"
        }
      ],
      "projects": [
        {
          "id": "p3",
          "name": "College Event Management System",
          "description": "Web app used by 6 student clubs.",
          "tech": [
            "React",
            "Node.js",
            "MongoDB"
          ],
          "link": "",
          "bullets": [
            "Handled 900+ registrations in one week",
            "Built role-based access for organisers"
          ]
        },
        {
          "id": "p4",
          "name": "Smart HVAC System",
          "description": "Predictive maintenance prototype.",
          "tech": [
            "Python",
            "scikit-learn"
          ],
          "link": "",
          "bullets": [
            "Reached 91% accuracy on sensor data"
          ]
        }
      ],
      "skills": {
        "technical": [
          "Python",
          "Java",
          "SQL",
          "React"
        ],
        "tools": [
          "Git",
          "VS Code"
        ],
        "other": [
          "Communication",
          "Teamwork"
        ]
      },
      "certifications": [
        {
          "id": "p5",
          "name": "Top 5 in University Hackathon",
          "issuer": "Mumbai University",
          "date": "2023",
          "link": ""
        }
      ]
    }
  },
  "designer": {
    role: "Product Designer",
    content: {
      "contact": {
        "name": "Aarav Mehta",
        "email": "aarav.mehta@email.com",
        "phone": "+91 98765 43214",
        "location": "Mumbai, India",
        "linkedin": "linkedin.com/in/aaravmehta",
        "github": "",
        "portfolio": ""
      },
      "summary": "Product designer who leads with craft and clarity. Two years across fintech and consumer apps.",
      "experience": [
        {
          "id": "p1",
          "title": "Product Designer",
          "company": "Kite & Co.",
          "location": "Mumbai",
          "start": "2023",
          "end": "Present",
          "description": "",
          "bullets": [
            "Redesigned onboarding, improving activation by 24%",
            "Established a design QA process with engineering"
          ]
        },
        {
          "id": "p2",
          "title": "UX Design Intern",
          "company": "Studio X",
          "location": "Remote",
          "start": "2022",
          "end": "2022",
          "description": "",
          "bullets": [
            "Designed three mobile flows for a wellness client"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "M.Des Product Design",
          "institution": "MIT Institute of Design",
          "location": "Pune",
          "dates": "2021 – 2023",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p4",
          "name": "Kite Merchant App",
          "description": "Payments dashboard for small businesses.",
          "tech": [
            "Figma",
            "Prototyping"
          ],
          "link": "",
          "bullets": [
            "Cut setup time from 12 to 4 minutes",
            "Delivered a documented component library"
          ]
        },
        {
          "id": "p5",
          "name": "Planora",
          "description": "Trip planning app concept.",
          "tech": [
            "Figma",
            "React"
          ],
          "link": "",
          "bullets": [
            "Ran 10 usability tests across two rounds"
          ]
        }
      ],
      "skills": {
        "technical": [
          "Product Design",
          "User Research",
          "Prototyping",
          "Design Systems"
        ],
        "tools": [
          "Figma",
          "Maze",
          "Framer"
        ],
        "other": [
          "Storytelling"
        ]
      },
      "certifications": []
    }
  },
  "engineer": {
    role: "Software Engineer",
    content: {
      "contact": {
        "name": "Vikram Rao",
        "email": "vikram.rao@email.com",
        "phone": "+91 98765 43215",
        "location": "Bengaluru, India",
        "linkedin": "linkedin.com/in/vikramrao",
        "github": "",
        "portfolio": ""
      },
      "summary": "Full-stack engineer focused on reliable web products. Two years building APIs and React front ends.",
      "experience": [
        {
          "id": "p1",
          "title": "Software Engineer",
          "company": "Atelier Dev",
          "location": "Bengaluru",
          "start": "2023",
          "end": "Present",
          "description": "",
          "bullets": [
            "Reduced API p95 latency from 480ms to 190ms",
            "Built a React design system adopted by four teams",
            "Automated CI, cutting release time by 40%"
          ]
        },
        {
          "id": "p2",
          "title": "Software Engineering Intern",
          "company": "Webhaus",
          "location": "Remote",
          "start": "2022",
          "end": "2022",
          "description": "",
          "bullets": [
            "Shipped a REST integration used by 3 clients"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "B.Tech Computer Engineering",
          "institution": "VJTI",
          "location": "Mumbai",
          "dates": "2019 – 2023",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p4",
          "name": "Webbase",
          "description": "Open-source component library.",
          "tech": [
            "TypeScript",
            "React"
          ],
          "link": "",
          "bullets": [
            "150+ GitHub stars",
            "Full test coverage with Vitest"
          ]
        }
      ],
      "skills": {
        "technical": [
          "JavaScript",
          "TypeScript",
          "Python",
          "SQL"
        ],
        "tools": [
          "React",
          "Node.js",
          "Docker",
          "Git"
        ],
        "other": [
          "System design",
          "Testing"
        ]
      },
      "certifications": [
        {
          "id": "p5",
          "name": "AWS Cloud Practitioner",
          "issuer": "AWS",
          "date": "2023",
          "link": ""
        }
      ]
    }
  },
  "business": {
    role: "Business Analyst",
    content: {
      "contact": {
        "name": "Priya Nair",
        "email": "priya.nair@email.com",
        "phone": "+91 98765 43216",
        "location": "Mumbai, India",
        "linkedin": "linkedin.com/in/priyanair",
        "github": "",
        "portfolio": ""
      },
      "summary": "Business analyst with three years in consulting. Turns complex data into recommendations leaders act on.",
      "experience": [
        {
          "id": "p1",
          "title": "Business Analyst",
          "company": "Deloitte",
          "location": "Mumbai",
          "start": "2021",
          "end": "Present",
          "description": "",
          "bullets": [
            "Identified ₹2.4 Cr in annual savings across procurement",
            "Led a 5-person workstream for a retail client",
            "Built dashboards used weekly by 30 managers"
          ]
        },
        {
          "id": "p2",
          "title": "Analyst Intern",
          "company": "KPMG",
          "location": "Mumbai",
          "start": "2020",
          "end": "2020",
          "description": "",
          "bullets": [
            "Modelled market entry scenarios for two sectors"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "MBA, Finance",
          "institution": "SPJIMR",
          "location": "Mumbai",
          "dates": "2019 – 2021",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p4",
          "name": "Process Mapping Programme",
          "description": "Standardised reporting for four teams.",
          "tech": [],
          "link": "",
          "bullets": [
            "Cut reporting time by 30%"
          ]
        }
      ],
      "skills": {
        "technical": [
          "Data Analysis",
          "Financial Modelling",
          "Process Mapping"
        ],
        "tools": [
          "Excel",
          "Power BI",
          "SQL"
        ],
        "other": [
          "Stakeholder management"
        ]
      },
      "certifications": [
        {
          "id": "p5",
          "name": "CFA Level I",
          "issuer": "CFA Institute",
          "date": "2022",
          "link": ""
        }
      ]
    }
  },
  "academic": {
    role: "Research Scholar",
    content: {
      "contact": {
        "name": "Dr. Ananya Iyer",
        "email": "ananya.iyer@email.com",
        "phone": "+91 98765 43217",
        "location": "Mumbai, India",
        "linkedin": "linkedin.com/in/ananyaiyer",
        "github": "",
        "portfolio": ""
      },
      "summary": "Doctoral researcher in machine learning for building energy systems, with six peer-reviewed publications.",
      "experience": [
        {
          "id": "p1",
          "title": "Research Assistant",
          "company": "IIT Bombay",
          "location": "Mumbai",
          "start": "2020",
          "end": "2024",
          "description": "",
          "bullets": [
            "Designed models forecasting HVAC load with 12% lower error",
            "Supervised four undergraduate research projects"
          ]
        },
        {
          "id": "p2",
          "title": "Teaching Assistant",
          "company": "IIT Bombay",
          "location": "Mumbai",
          "start": "2019",
          "end": "2020",
          "description": "",
          "bullets": [
            "Ran tutorials for a 90-student machine learning course"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "Ph.D. Computer Science",
          "institution": "IIT Bombay",
          "location": "Mumbai",
          "dates": "2019 – 2024",
          "details": "Thesis: Learning-based control of building systems"
        },
        {
          "id": "p4",
          "degree": "M.Sc. Computer Science",
          "institution": "Mumbai University",
          "location": "Mumbai",
          "dates": "2017 – 2019",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p5",
          "name": "A Study on Smart HVAC Systems",
          "description": "Journal of Building Informatics",
          "tech": [],
          "link": "",
          "bullets": [
            "Lead author. Cited 40+ times"
          ]
        },
        {
          "id": "p6",
          "name": "Sensor Fusion for Energy Forecasting",
          "description": "ACM BuildSys",
          "tech": [],
          "link": "",
          "bullets": [
            "Second author"
          ]
        }
      ],
      "skills": {
        "technical": [
          "Machine Learning",
          "Time-series analysis",
          "LaTeX"
        ],
        "tools": [
          "Python",
          "PyTorch"
        ],
        "other": [
          "Grant writing"
        ]
      },
      "certifications": [
        {
          "id": "p7",
          "name": "Best Paper Award",
          "issuer": "ACM BuildSys",
          "date": "2023",
          "link": ""
        }
      ]
    }
  },
  "executive": {
    role: "Senior Product Manager",
    content: {
      "contact": {
        "name": "Sameer Malhotra",
        "email": "sameer.malhotra@email.com",
        "phone": "+91 98765 43218",
        "location": "Bengaluru, India",
        "linkedin": "linkedin.com/in/sameermalhotra",
        "github": "",
        "portfolio": ""
      },
      "summary": "Product leader with 12 years scaling B2B platforms from launch to profitability. Builds teams that ship and measure what matters.",
      "experience": [
        {
          "id": "p1",
          "title": "Director of Product",
          "company": "Google",
          "location": "Bengaluru",
          "start": "2019",
          "end": "Present",
          "description": "",
          "bullets": [
            "Led a 40-person organisation across three product lines",
            "Grew platform revenue from ₹90 Cr to ₹310 Cr in four years",
            "Set the multi-year roadmap with the executive team"
          ]
        },
        {
          "id": "p2",
          "title": "Senior Product Manager",
          "company": "Flipkart",
          "location": "Bengaluru",
          "start": "2014",
          "end": "2019",
          "description": "",
          "bullets": [
            "Launched a seller platform used by 500k merchants",
            "Managed a ₹25 Cr product budget"
          ]
        }
      ],
      "education": [
        {
          "id": "p3",
          "degree": "MBA",
          "institution": "IIM Ahmedabad",
          "location": "Ahmedabad",
          "dates": "2010 – 2012",
          "details": ""
        },
        {
          "id": "p4",
          "degree": "B.Tech Electronics",
          "institution": "NIT Trichy",
          "location": "Tiruchirappalli",
          "dates": "2006 – 2010",
          "details": ""
        }
      ],
      "projects": [
        {
          "id": "p5",
          "name": "Advisory Board, Startup India Mentor Programme",
          "description": "Mentoring early-stage founders.",
          "tech": [],
          "link": "",
          "bullets": [
            "Advised 20+ founders"
          ]
        }
      ],
      "skills": {
        "technical": [
          "Product Strategy",
          "P&L Management",
          "Roadmapping"
        ],
        "tools": [],
        "other": [
          "Stakeholder Management",
          "Team Leadership"
        ]
      },
      "certifications": [
        {
          "id": "p6",
          "name": "Certified Scrum Product Owner",
          "issuer": "Scrum Alliance",
          "date": "2016",
          "link": ""
        }
      ]
    }
  }
}
