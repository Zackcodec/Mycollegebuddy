// ==========================================================================
// CENTRAL DATA MATRICES: COURSES, TIMETABLES, NOTICES, RESOURCES & COMMUNITIES
// ==========================================================================

/**
 * Course and Syllabus Master Registry
 */
const COURSES_DATA = [
    {
        id: "course_bsc_cs",
        stream: "bsc_cs",
        title: "B.Sc. (Computer Science)",
        duration: "3 Years (6 Semesters)",
        description: "Comprehensive curriculum covering Programming in C/C++, Data Structures, Database Management Systems (DBMS), Operating Systems, and Web Technologies.",
        syllabusLink: "#"
    },
    {
        id: "course_bsc_pcm",
        stream: "bsc_pcm",
        title: "B.Sc. (Physics, Chemistry, Mathematics)",
        duration: "3 Years (6 Semesters)",
        description: "Classic foundational science stream emphasizing theoretical and experimental mechanics, organic/inorganic chemistry matrices, and advanced calculus.",
        syllabusLink: "#"
    },
    {
        id: "course_bca",
        stream: "bca",
        title: "BCA (Bachelor of Computer Applications)",
        duration: "3 Years (6 Semesters)",
        description: "Professional application development track exploring Java, Software Engineering, Computer Networks, Python, and cloud architecture basics.",
        syllabusLink: "#"
    }
];

/**
 * Latest Notices and Announcements Board
 */
const NOTICES_DATA = [
    {
        id: "notice_001",
        title: "Main Exam Form Submission Deadline Extended",
        date: "2026-06-28",
        category: "examination",
        description: "The last date to submit university examination forms for even semesters without a late fee has been extended to July 10, 2026.",
        downloadLink: "#"
    },
    {
        id: "notice_002",
        title: "B.Sc. VI Sem Chemistry Practical Schedule",
        date: "2026-06-25",
        category: "academic",
        description: "Chemistry lab exams for final year students are scheduled between July 2 and July 5. Check individual batch lists on the notice board.",
        downloadLink: "#"
    }
];

/**
 * Resource Vault Academic Repository
 */
const RESOURCES_DATA = [
    {
        id: "res_001",
        title: "Computer Science - C++ Previous Year Question Paper (2024)",
        stream: "bsc_cs",
        semester: "sem_1",
        type: "pyq",
        driveLink: "https://drive.google.com/open?id=EXAMPLE_CS_PYQ1"
    },
    {
        id: "res_002",
        title: "Physics - Classical Mechanics Comprehensive Handwritten Notes",
        stream: "bsc_pcm",
        semester: "sem_1",
        type: "notes",
        driveLink: "https://drive.google.com/open?id=EXAMPLE_PHYS_NOTES1"
    },
    {
        id: "res_003",
        title: "Advanced Java Programming Semester Core Guide",
        stream: "bca",
        semester: "sem_4",
        type: "book",
        driveLink: "https://drive.google.com/open?id=EXAMPLE_BCA_JAVA"
    }
];

/**
 * MASTER WHATSAPP & TELEGRAM COMMUNITIES MATRIX
 * 
 * CRITICAL RULE: The 'stream' keys match the HTML select options exactly:
 * - bsc_cs       -> Computer Science
 * - bsc_pcm      -> Physics, Chemistry, Maths
 * - bsc_biotech  -> Biotechnology
 * - bsc_ind_chem -> Industrial Chemistry
 * - bca          -> Bachelor of Computer Applications
 * - msc_all      -> Postgraduate Branches
 */
const COMMUNITY_GROUPS_DATA = [
    // 1. B.Sc. Computer Science Groups
    {
        id: "grp_cs_1",
        name: "B.Sc. Computer Science - Year 1",
        platform: "whatsapp",
        stream: "bsc_cs",
        description: "Official community for First-Year B.Sc. CS students. Join here for time table schedules, foundation course notes, and foundational lab files.",
        inviteLink: "https://chat.whatsapp.com/EXAMPLE_HASH_CS1"
    },
    {
        id: "grp_cs_2",
        name: "B.Sc. Computer Science - Year 2 & 3",
        platform: "whatsapp",
        stream: "bsc_cs",
        description: "Combined room for senior CS underclassmen. Syncing core updates on Data Structures, Java modules, and institutional placement cell notifications.",
        inviteLink: "https://chat.whatsapp.com/EXAMPLE_HASH_CS23"
    },

    // 2. B.Sc. PCM Groups
    {
        id: "grp_pcm_1",
        name: "B.Sc. PCM - General Batch",
        platform: "whatsapp",
        stream: "bsc_pcm",
        description: "Unified community network for Physics, Chemistry, and Mathematics students. Used mostly for sharing practical assignment PDFs and lecture changes.",
        inviteLink: "https://chat.whatsapp.com/EXAMPLE_HASH_PCM"
    },

    // 3. B.Sc. Biotechnology Groups
    {
        id: "grp_biotech_1",
        name: "B.Sc. Biotech Communication Hub",
        platform: "whatsapp",
        stream: "bsc_biotech",
        description: "For Biotechnology stream members. Bulletins regarding microbiology lectures, genetics journals, and organic biochemistry assignments.",
        inviteLink: "https://chat.whatsapp.com/EXAMPLE_HASH_BIOTECH"
    },

    // 4. B.Sc. Industrial Chemistry Groups
    {
        id: "grp_ind_chem_1",
        name: "Industrial Chemistry Forum",
        platform: "whatsapp",
        stream: "bsc_ind_chem",
        description: "Dedicated link for Industrial Chemistry students. Discuss chemical engineering modules, industrial plant visits, and instrumentation practicals.",
        inviteLink: "https://chat.whatsapp.com/EXAMPLE_HASH_INDCHEM"
    },

    // 5. BCA Groups
    {
        id: "grp_bca_1",
        name: "BCA Coding Corridor",
        platform: "whatsapp",
        stream: "bca",
        description: "Official interactive hub for BCA batches. Share programming scripts, internal CCE exam timetables, and project compilation assistance.",
        inviteLink: "https://chat.whatsapp.com/EXAMPLE_HASH_BCA"
    },

    // 6. Postgraduate Groups (M.Sc.)
    {
        id: "grp_msc_1",
        name: "M.Sc. PG Central Repository",
        platform: "telegram",
        stream: "msc_all",
        description: "Postgraduate master network hosted on Telegram to support large file transfers. Contains research papers, seminar topics, and thesis guides.",
        inviteLink: "https://t.me/EXAMPLE_USERNAME_MSC"
    }
];

// Ensure data arrays are bound globally to the window workspace
if (typeof window !== 'undefined') {
    window.COURSES_DATA = COURSES_DATA;
    window.NOTICES_DATA = NOTICES_DATA;
    window.RESOURCES_DATA = RESOURCES_DATA;
    window.COMMUNITY_GROUPS_DATA = COMMUNITY_GROUPS_DATA;
}
/**
 * Campus Events, Parties, and Festivals Matrix
 */
const EVENTS_DATA = [
    {
        id: "evt_001",
        title: "Tarangini 2026: Annual Cultural Fest",
        type: "fest",
        date: "2026-10-14",
        time: "10:00 AM onwards",
        location: "Main Auditorium & Open Air Quadrangle",
        organizer: "Central Student Council",
        description: "The biggest milestone celebration of the year! Featuring multi-department dance showstoppers, battle of the bands, inter-college drama matrices, and a massive live EDM star concert night.",
        status: "Open for Entry",
        registrationLink: "https://forms.gle/ExampleFestRegister"
    },
    {
        id: "evt_002",
        title: "B.Sc. & BCA Freshers Welcome Party",
        type: "party",
        date: "2026-08-05",
        time: "02:00 PM - 06:30 PM",
        location: "Institutional Platinum Jubilee Hall",
        organizer: "Senior Student Working Committee",
        description: "Welcoming the incoming class of 2026! Join your seniors for an afternoon of icebreaker mixers, dynamic talent showdowns, crowning of Mr. & Ms. Freshers, and ending with an open DJ dance floor floor loop.",
        status: "Passes Required",
        registrationLink: "#"
    },
    {
        id: "evt_003",
        title: "ByteCraft 24-Hour Code Hackathon",
        type: "academic",
        date: "2026-07-22",
        time: "09:00 AM Kickoff",
        location: "Advanced CS Lab Core Floor 3",
        organizer: "Cloudix Developer Sandbox Collective",
        description: "Assemble your 3-person team and build open-source application solutions under pressure. Cash prize tracks, industry mentorship slots, and free snacks provided all night long.",
        status: "Registration Open",
        registrationLink: "https://github.com/ExampleHackathon"
    }
];

// Failsafe bind to window ecosystem
if (typeof window !== 'undefined') {
    window.EVENTS_DATA = EVENTS_DATA;
}
