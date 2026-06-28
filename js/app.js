// ==========================================================================
// MY COLLEGE BUDDY - FULL PLATFORM ENGINE CONTEXT
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    
    // Core data rendering with cross-file fallbacks
    if (typeof NOTICES_DATA !== 'undefined') renderNotices(NOTICES_DATA);
    if (typeof RESOURCES_DATA !== 'undefined') renderResources(RESOURCES_DATA);
    
    const initialGroups = typeof COMMUNITY_GROUPS_DATA !== 'undefined' ? COMMUNITY_GROUPS_DATA : [];
    renderCommunities(initialGroups); 
    
    // Run initial directory check on cold load to render initial instruction card
    handleVerificationChange();
    
    initHelplineWidget();
});

/* ==========================================================================
   1. CORE SPA ROUTING ENGINE & NAVIGATION EFFECT HANDLERS
   ========================================================================== */
function initNavigation() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerBtn && navMenu) {
        // Hamburger Mobile Action Toggle
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Handle deep-linked sub-pages on clean cold-load
    if (window.location.hash) {
        const activeTarget = window.location.hash.substring(1);
        navigateTo(activeTarget);
    }
}

function navigateTo(viewId) {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    
    // Close mobile overlay panel when transition triggers
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
    }

    // Toggle active classes across structural views
    document.querySelectorAll(".view-section").forEach(section => {
        section.classList.remove("active");
    });
    
    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
        targetSection.classList.add("active");
    } else {
        // Fallback safety route
        const homeSection = document.getElementById("view-home");
        if (homeSection) homeSection.classList.add("active");
    }

    // Sync state visual hooks across header nav anchors
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${viewId}`) {
            link.classList.add("active");
        }
    });

    // Reset view position back to top line for clean context
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================================================================
   2. NOTICE BOARD TIMELINE ENGINE
   ========================================================================== */
function renderNotices(notices) {
    const container = document.getElementById("notice-container");
    if (!container) return;
    container.innerHTML = "";

    if (!notices || notices.length === 0) {
        container.innerHTML = `<div class="glass text-center" style="padding:40px;"><p class="muted-text">No active updates match your search key.</p></div>`;
        return;
    }

    notices.forEach(notice => {
        const card = document.createElement("div");
        card.className = "glass timeline-card";
        card.innerHTML = `
            <div class="timeline-meta">
                <span class="notice-date">${notice.date}</span>
                <span class="notice-tag">${notice.category ? notice.category.toUpperCase() : "GENERAL"}</span>
            </div>
            <h3>${notice.title}</h3>
            <p>${notice.description || notice.desc || ""}</p>
            <a href="${notice.downloadLink || notice.driveLink || "#"}" target="_blank" class="btn btn-outline">Download Notice Attachment</a>
        `;
        container.appendChild(card);
    });
}

function filterNotices() {
    if (typeof NOTICES_DATA === 'undefined') return;
    const searchVal = document.getElementById("notice-search").value.toLowerCase();
    const filtered = NOTICES_DATA.filter(notice => {
        const titleMatch = notice.title ? notice.title.toLowerCase().includes(searchVal) : false;
        const descMatch = (notice.description || notice.desc) ? (notice.description || notice.desc).toLowerCase().includes(searchVal) : false;
        const catMatch = notice.category ? notice.category.toLowerCase().includes(searchVal) : false;
        return titleMatch || descMatch || catMatch;
    });
    renderNotices(filtered);
}

/* ==========================================================================
   3. RESOURCE VAULT EXTRACTION MANAGEMENT
   ========================================================================== */
function renderResources(resources) {
    const grid = document.getElementById("resources-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (!resources || resources.length === 0) {
        grid.innerHTML = `<div class="glass text-center" style="grid-column: 1/-1; padding: 50px;"><p class="muted-text">No study materials match your specific filter matrix combination.</p></div>`;
        return;
    }

    resources.forEach(res => {
        const readableStream = res.stream ? res.stream.replace("bsc_", "B.Sc. ").toUpperCase() : "GENERAL";
        const readableSem = res.semester ? res.semester.replace("sem_", "Semester ") : "";
        const typeLabel = res.type === "pyq" ? "PYQ" : res.type === "notes" ? "Notes" : "Textbook";

        const card = document.createElement("div");
        card.className = "glass resource-card";
        card.innerHTML = `
            <div class="resource-top">
                <div class="resource-info-chips">
                    <span class="chip type-badge">${typeLabel}</span>
                    <span class="chip">${readableStream}</span>
                    <span class="chip">${readableSem}</span>
                </div>
                <h4>${res.title}</h4>
            </div>
            <a href="${res.driveLink || "#"}" target="_blank" class="btn btn-accent" style="margin-top:20px;">Download File</a>
        `;
        grid.appendChild(card);
    });
}

function filterResources() {
    if (typeof RESOURCES_DATA === 'undefined') return;
    const streamVal = document.getElementById("filter-stream").value;
    const semVal = document.getElementById("filter-sem").value;
    const typeVal = document.getElementById("filter-type").value;

    const filtered = RESOURCES_DATA.filter(res => {
        const streamMatch = (streamVal === "all" || res.stream === streamVal || (streamVal === "msc_all" && res.stream.startsWith("msc")));
        const semMatch = (semVal === "all" || res.semester === semVal);
        const typeMatch = (typeVal === "all" || res.type === typeVal);
        
        return streamMatch && semMatch && typeMatch;
    });

    renderResources(filtered);
}

/* ==========================================================================
   4. HOMEPAGE FEED COMMUNITY COMPONENT
   ========================================================================== */
function renderCommunities(groups) {
    const grid = document.getElementById("community-groups-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (!groups || groups.length === 0) return;

    // Show only first 4 flagship groups on Home view
    groups.slice(0, 4).forEach(group => {
        const isWhatsApp = group.platform.toLowerCase() === "whatsapp";
        const platformColor = isWhatsApp ? "#25D366" : "#26A5E4"; 
        const platformLabel = isWhatsApp ? "WhatsApp Group" : "Telegram Vault";
        const platformIcon = isWhatsApp ? "💬" : "✈️";

        const card = document.createElement("div");
        card.className = "glass resource-card";
        card.style.borderLeft = `3px solid ${platformColor}`; 

        card.innerHTML = `
            <div class="resource-top">
                <div class="resource-info-chips">
                    <span class="chip" style="color: ${platformColor}; font-weight: 700; background: rgba(255,255,255,0.02)">
                        ${platformIcon} ${platformLabel}
                    </span>
                </div>
                <h4 style="margin-top: 5px;">${group.name}</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.4; margin-top: 8px;">
                    ${group.description}
                </p>
            </div>
            <a href="${group.inviteLink}" target="_blank" class="btn" style="background: ${platformColor}; color: #000; margin-top: 20px;">
                Enter Room Chat
            </a>
        `;
        grid.appendChild(card);
    });
}

/* ==========================================================================
   5. SECURE DEPARTMENT WHATSAPP DIRECTORY GATEWAY
   ========================================================================== */
function handleVerificationChange() {
    const streamSelect = document.getElementById("directory-stream-filter");
    const verifyCheckbox = document.getElementById("student-verify-checkbox");
    const statusMessage = document.getElementById("directory-status-message");
    const grid = document.getElementById("directory-groups-grid");

    if (!streamSelect || !verifyCheckbox || !statusMessage || !grid) return;

    const chosenStream = streamSelect.value;
    const isVerified = verifyCheckbox.checked;

    grid.innerHTML = "";
    statusMessage.innerHTML = "";

    // Case 1: Dropdown not picked yet
    if (!chosenStream) {
        statusMessage.innerHTML = `
            <div class="glass text-center" style="padding: 30px; border-left: 3px solid var(--text-muted);">
                <p class="muted-text">Please choose your department from the dropdown menu above to continue.</p>
            </div>`;
        return;
    }

    // Case 2: Dropdown selected but declaration unchecked
    if (!isVerified) {
        statusMessage.innerHTML = `
            <div class="glass" style="padding: 20px; border-left: 3px solid #eab308; background: rgba(234,179,8,0.03);">
                <p style="color: #fde047; font-weight: 600; margin-bottom: 4px;">⚠️ Access Verification Required</p>
                <p class="muted-text" style="font-size: 0.9rem;">Please review and check the confirmation box above to safely unlock your department's specific WhatsApp community links.</p>
            </div>`;
        return;
    }

    // Case 3: Fully verified -> Unlock links
    statusMessage.innerHTML = `
        <div class="glass" style="padding: 14px 20px; border-left: 3px solid #25D366; background: rgba(37,211,102,0.03); margin-bottom: 20px;">
            <p style="color: #4ade80; font-weight: 600; font-size: 0.95rem;">✓ Access Unlocked for Selected Department</p>
        </div>`;

    executeVerifiedDirectoryFilter(chosenStream);
}

function executeVerifiedDirectoryFilter(streamKey) {
    const grid = document.getElementById("directory-groups-grid");
    if (!grid) return;

    const masterData = typeof COMMUNITY_GROUPS_DATA !== 'undefined' ? COMMUNITY_GROUPS_DATA : [];

    if (masterData.length === 0) {
        grid.innerHTML = `
            <div class="glass text-center" style="grid-column: 1/-1; padding: 40px;">
                <p class="muted-text">No active official links found uploaded currently.</p>
            </div>`;
        return;
    }

    const filteredGroups = masterData.filter(group => {
        return group.stream === streamKey || (streamKey === "msc_all" && group.stream.startsWith("msc"));
    });

    if (filteredGroups.length === 0) {
        grid.innerHTML = `
            <div class="glass text-center" style="grid-column: 1/-1; padding: 40px;">
                <p class="muted-text">No active official WhatsApp links found currently uploaded for this stream portfolio.</p>
            </div>`;
        return;
    }

    filteredGroups.forEach(group => {
        const isWhatsApp = group.platform.toLowerCase() === "whatsapp";
        const accentColor = isWhatsApp ? "#25D366" : "#26A5E4";

        const card = document.createElement("div");
        card.className = "glass resource-card";
        card.style.borderTop = `4px solid ${accentColor}`;
        card.style.padding = "20px";

        card.innerHTML = `
            <div class="resource-top">
                <div class="resource-info-chips" style="display: flex; gap: 8px; margin-bottom: 12px;">
                    <span class="chip" style="background: rgba(37,211,102,0.1); color: #25D366; font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; font-weight: 700;">
                        Verified Room
                    </span>
                    <span class="chip" style="background: rgba(255,255,255,0.05); font-size: 0.75rem; padding: 4px 8px; border-radius: 4px;">
                        ${group.stream.replace("bsc_", "B.Sc. ").toUpperCase()}
                    </span>
                </div>
                <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;">${group.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5;">
                    ${group.description}
                </p>
            </div>
            <div style="background: rgba(0,0,0,0.15); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.03); margin-top: 20px;">
                <a href="${group.inviteLink}" target="_blank" class="btn" style="background: ${accentColor}; color: #000; font-weight: 700; width: 100%; display: block; text-align: center; padding: 10px; border-radius: 6px; text-decoration: none; font-size: 0.9rem;">
                    Join Official Room
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}
/**
 * Synchronize Card Tiers with Active Input field values
 */
function selectDonationAmount(amount, cardElement) {
    const amountInput = document.getElementById("donation-amount");
    if (amountInput) {
        amountInput.value = amount;
    }
    
    // Clear borders from other elements
    document.querySelectorAll('.tier-card').forEach(card => {
        card.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        card.style.background = 'transparent';
    });
    
    // Highlight active element
    cardElement.style.borderColor = '#26A5E4';
    cardElement.style.background = 'rgba(38, 165, 228, 0.03)';
}

/**
 * Handle execution gateway bridge hook
 */
function initiateDonationPipeline() {
    const amount = document.getElementById("donation-amount").value;
    if (!amount || amount < 10) {
        alert("Please enter a valid contribution amount greater than ₹10.");
        return;
    }
    
    // Redirect logic to Stripe Checkout API endpoint or native UPI deeplink window handler goes here
    console.log(`Initializing checkout intent pipeline payload for value: INR ${amount}`);
}
/* ==========================================================================
   6. PERSISTENT HELPLINE WIDGET CONFIGURATION
   ========================================================================== */
function initHelplineWidget() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
        .floating-helpline {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 56px;
            height: 56px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            cursor: pointer;
            z-index: 2000;
            transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .floating-helpline:hover { transform: scale(1.1); }
        
        .helpline-modal {
            position: fixed;
            bottom: 96px;
            right: 24px;
            width: 320px;
            max-width: calc(100vw - 48px);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.6);
            z-index: 2000;
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: widgetFlyIn 0.3s ease forwards;
        }
        @keyframes widgetFlyIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .helpline-modal.active { display: flex; }
        .helpline-header {
            background: #075E54;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .helpline-avatar-dot {
            width: 36px;
            height: 36px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        .helpline-header h4 { font-size: 0.95rem; font-weight: 600; color: #fff; margin: 0; }
        .helpline-header p { font-size: 0.75rem; color: #a5d6a7; margin: 2px 0 0 0; }
        .helpline-body { padding: 20px; }
        .helpline-body p { font-size: 0.9rem; color: #e2e8f0; line-height: 1.5; margin-bottom: 16px; }
    `;
    document.head.appendChild(styleTag);

    const widgetContainer = document.createElement("div");
    widgetContainer.innerHTML = `
        <div class="floating-helpline" id="help-fab" title="Open Helpline Buddy">💬</div>
        <div class="helpline-modal" id="help-modal">
            <div class="helpline-header">
                <div class="helpline-avatar-dot">🎓</div>
                <div>
                    <h4>Buddy Helpline Desk</h4>
                    <p>Typically replies within a few hours</p>
                </div>
            </div>
            <div class="helpline-body">
                <p>Hey! Stuck with missing download tokens, outdated schedules, broken links, or need general info about Adarsh Science College procedures?</p>
                <a href="https://wa.me/919999999999?text=Hey%20Buddy!%20I%20need%20help%20regarding%20college%20resources..." 
                   target="_blank" 
                   class="btn" 
                   style="background: #25D366; color: #000; display: flex; gap: 8px; width: 100%; justify-content: center; align-items: center; text-decoration: none; font-weight: 700; padding: 10px; border-radius: 6px;">
                   Ping Support on WhatsApp
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(widgetContainer);

    const helpFab = document.getElementById("help-fab");
    const helpModal = document.getElementById("help-modal");

    if (helpFab && helpModal) {
        helpFab.addEventListener("click", (e) => {
            e.stopPropagation();
            helpModal.classList.toggle("active");
            helpFab.innerHTML = helpModal.classList.contains("active") ? "✕" : "💬";
            helpFab.style.background = helpModal.classList.contains("active") ? "#1e293b" : "#25D366";
        });

        document.addEventListener("click", (e) => {
            if (!helpModal.contains(e.target) && e.target !== helpFab) {
                helpModal.classList.remove("active");
                helpFab.innerHTML = "💬";
                helpFab.style.background = "#25D366";
            }
        });
    }
}
/* ==========================================================================
   7. STANDALONE TOOL HUB SUITE: CORE CALCULATION ENGINES
   ========================================================================== */

/**
 * ENGINE A: Target Exam Paper Mark Projection Grid
 */
function calculateAcademicTargets() {
    const cceSlider = document.getElementById("input-cce");
    const practicalSlider = document.getElementById("input-practical");
    const targetSlider = document.getElementById("input-target");
    const reportCard = document.getElementById("calculator-report-card");

    if (!cceSlider || !practicalSlider || !targetSlider || !reportCard) return;

    const cceScore = parseInt(cceSlider.value, 10);
    const practicalScore = parseInt(practicalSlider.value, 10);
    const targetPercentage = parseInt(targetSlider.value, 10);

    document.getElementById("val-cce").innerText = cceScore;
    document.getElementById("val-practical").innerText = practicalScore;
    document.getElementById("val-target").innerText = targetPercentage;

    const maxTheory = 60;
    const grandTotalMax = 150; // 40 CCE + 50 Practical + 60 Theory Paper

    const currentSecuredBeforeTheory = cceScore + practicalScore;
    const absoluteRequiredTotalMarks = Math.ceil((targetPercentage / 100) * grandTotalMax);
    const theoryRequiredScore = absoluteRequiredTotalMarks - currentSecuredBeforeTheory;

    const minimumPassingTotal = Math.ceil(0.40 * grandTotalMax); // 60 Marks out of 150
    const absoluteMinimumTheoryToPass = Math.max(0, minimumPassingTotal - currentSecuredBeforeTheory);

    let statusTitle = "";
    let statusMessage = "";
    let statusColor = "#26A5E4"; 
    let alertBg = "rgba(38,165,228,0.04)";

    if (theoryRequiredScore > maxTheory) {
        statusTitle = "⚠️ Target Out of Reach";
        statusMessage = `To secure an aggregate score of <strong>${targetPercentage}%</strong>, you need <strong>${theoryRequiredScore}</strong> marks out of ${maxTheory} in your theory exam, which is mathematically out of range.`;
        statusColor = "#ef4444"; 
        alertBg = "rgba(239,68,68,0.04)";
    } else if (theoryRequiredScore <= 0) {
        statusTitle = "🎉 Target Already Secured!";
        statusMessage = `Your existing points (<strong>${currentSecuredBeforeTheory} Marks</strong>) have already cleared your target milestone! Score a minimum of <strong>${absoluteMinimumTheoryToPass} Marks</strong> in theory to safely fulfill regulatory pass limits.`;
        statusColor = "#25D366"; 
        alertBg = "rgba(37,211,102,0.04)";
    } else {
        const percentageNeededInTheory = Math.round((theoryRequiredScore / maxTheory) * 100);
        statusTitle = "🎯 Roadmap Target Computed";
        statusMessage = `To achieve your goal of <strong>${targetPercentage}%</strong>, you must score at least <strong>${theoryRequiredScore} out of ${maxTheory} Marks</strong> (${percentageNeededInTheory}%) on the written theory exam paper.`;
        
        if (percentageNeededInTheory > 75) {
            statusColor = "#eab308"; 
            alertBg = "rgba(234,179,8,0.04)";
        }
    }

    reportCard.style.borderLeft = `4px solid ${statusColor}`;
    reportCard.style.background = alertBg;
    reportCard.innerHTML = `
        <h4 style="color: ${statusColor}; font-weight: 700; margin-bottom: 6px; font-size: 1rem;">${statusTitle}</h4>
        <p style="font-size: 0.85rem; line-height: 1.5; color: #f1f5f9; margin: 0 0 12px 0;">${statusMessage}</p>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px;">
            <span>Current: <strong>${currentSecuredBeforeTheory}/90 M</strong></span>
            <span>Needed Aggregate: <strong>${absoluteRequiredTotalMarks} M</strong></span>
        </div>
    `;
}

/**
 * ENGINE B: SGPA/CGPA Linear Percentage Scaling Conversion Module
 */
function executeGradeConversionMatrix() {
    const cgpaSlider = document.getElementById("input-cgpa");
    const gradeCard = document.getElementById("grade-report-card");

    if (!cgpaSlider || !gradeCard) return;

    const cgpaVal = parseFloat(cgpaSlider.value);
    document.getElementById("val-cgpa").innerText = cgpaVal.toFixed(2);

    // Standard State Technical University Calculation Matrix Formula: Percentage = CGPA * 9.5
    const equivalentPercentage = (cgpaVal * 9.5).toFixed(1);

    let performanceLabel = "Pass Division";
    let subColor = "#f1f5f9";
    let scaleBg = "rgba(255,255,255,0.02)";

    if (cgpaVal >= 9.0) {
        performanceLabel = "First Class with Distinction (Outstanding)";
        subColor = "#4ade80";
        scaleBg = "rgba(74,222,128,0.04)";
    } else if (cgpaVal >= 7.5) {
        performanceLabel = "First Class (High Division Range)";
        subColor = "#60a5fa";
        scaleBg = "rgba(96,165,250,0.04)";
    } else if (cgpaVal >= 6.0) {
        performanceLabel = "First Division Achievement Class";
        subColor = "#e2e8f0";
        scaleBg = "rgba(226,232,240,0.02)";
    } else if (cgpaVal >= 5.0) {
        performanceLabel = "Second Division Placement Segment";
        subColor = "#eab308";
        scaleBg = "rgba(234,179,8,0.02)";
    } else {
        performanceLabel = "Pass Classification Boundary Limit";
        subColor = "#f87171";
        scaleBg = "rgba(248,113,113,0.03)";
    }

    gradeCard.style.borderLeft = `4px solid ${subColor}`;
    gradeCard.style.background = scaleBg;
    gradeCard.innerHTML = `
        <h4 style="color: ${subColor}; font-weight: 700; margin-bottom: 4px; font-size: 1rem;">${equivalentPercentage}% Scaled Value</h4>
        <p style="font-size: 0.85rem; line-height: 1.4; color: #f1f5f9; margin: 0 0 10px 0;">Classification: <strong>${performanceLabel}</strong></p>
        <p style="font-size: 0.7rem; color: var(--text-muted); margin: 0;">Derived safely using standard technical board mapping criteria formula ($Percentage = CGPA \\times 9.5$).</p>
    `;
}
/* ==========================================================================
   8. CAMPUS LIFE EVENTS ENGINE RUNTIME LOOP
   ========================================================================== */

function renderCampusEvents(eventsList) {
    const grid = document.getElementById("events-display-grid");
    if (!grid) return;

    grid.innerHTML = "";

    if (eventsList.length === 0) {
        grid.innerHTML = `
            <div class="glass text-center" style="grid-column: 1/-1; padding: 40px;">
                <p class="muted-text">No matching campus events or fests found for this filter choice.</p>
            </div>`;
        return;
    }

    eventsList.forEach(evt => {
        // Dynamic theme categorization tags
        let accent = "#a855f7"; // purple for fests
        if (evt.type === "party") accent = "#f43f5e"; // rose for parties
        if (evt.type === "academic") accent = "#26A5E4"; // cyan for technical arrays

        const card = document.createElement("div");
        card.className = "glass event-card";
        card.style.borderTop = `4px solid ${accent}`;
        card.style.padding = "24px";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justify = "space-between";

card.innerHTML = `
    <div>
        <div class="event-meta-row">
            <span class="event-date-badge">📅 ${evt.date}</span>
            <span class="event-status-indicator" style="color: ${accent};">● ${evt.status}</span>
        </div>
        
        <h3>${evt.title}</h3>
        
        <div class="event-details-list">
            <span>📍 <strong>Venue:</strong> ${evt.location}</span>
            <span>⏰ <strong>Time:</strong> ${evt.time}</span>
            <span>⚡ <strong>Host:</strong> ${evt.organizer}</span>
        </div>
        
        <p class="event-body-text">${evt.description}</p>
    </div>

    <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);">
        <a href="${evt.registrationLink}" target="_blank" class="event-action-btn" style="background: ${accent}; color: #0f172a;">
            Secure Entry Pass / Register
        </a>
    </div>
`;
        grid.appendChild(card);
    });
}

function filterCampusEvents(typeKey, eventTarget) {
    // 1. Find the filter container bar
    const filterBar = document.querySelector(".filter-container");
    
    // 2. Clear out the 'active' class from all chips inside it
    if (filterBar) {
        const chips = filterBar.querySelectorAll(".filter-chip");
        chips.forEach(chip => chip.classList.remove("active"));
    }

    // 3. Add the 'active' class to the button that was just clicked
    if (eventTarget) {
        eventTarget.classList.add("active");
    }

    // 4. Run the core array filtering logic
    if (!window.EVENTS_DATA) return;
    
    if (typeKey === "all") {
        renderCampusEvents(window.EVENTS_DATA);
    } else {
        const filtered = window.EVENTS_DATA.filter(e => e.type === typeKey);
        renderCampusEvents(filtered);
    }
}
