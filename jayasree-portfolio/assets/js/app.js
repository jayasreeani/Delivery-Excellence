const experience = [
  {
    company: "Nucore Software Solutions",
    metric: "5+ years · Travel & Airline ERP",
    title: "Product strategy for TRAACS and SkyTRAACS",
    description:
      "Led ERP platforms for travel agencies, OTAs, and budget airlines across Africa, GCC, and Australia. Integrated GDS systems (Amadeus, Galileo, Sabre) and delivered automation tools for PNR cleanup and ADM resolution.",
    tags: ["ERP", "GDS Integration", "FinTech", "Product Strategy"],
  },
  {
    company: "Slavic401k",
    metric: "40% faster client onboarding",
    title: "Enterprise 401k delivery & automation",
    description:
      "Directed Relius–Salesforce integration, automated risk evaluation for participants, and Salesforce-based onboarding — improving compliance, accuracy, and decision-making at scale.",
    tags: ["401k", "Salesforce", "FinTech", "Automation"],
  },
  {
    company: "Lever",
    metric: "Enterprise SaaS delivery",
    title: "Talent acquisition platform programs",
    description:
      "Led cross-functional delivery for talent acquisition platforms — aligning product roadmaps, sprint cadence, and stakeholder expectations to accelerate releases and reliability.",
    tags: ["SaaS", "Agile", "HR Tech", "Stakeholder Mgmt"],
  },
  {
    company: "Gymhub",
    metric: "Multi-platform rollout",
    title: "Fitness management platforms",
    description:
      "Oversaw mobile and web delivery — coordinating engineering, QA, and product to launch engagement features, payments, and operational dashboards for fitness operators.",
    tags: ["Mobile", "Web App", "Operations", "Digital Platform"],
  },
  {
    company: "Verizon · Infosys",
    metric: "Fortune-scale telecom",
    title: "Mission-critical enterprise systems",
    description:
      "Built delivery foundation on large-scale telecom projects — coordinating end-to-end testing, quality assurance, and release readiness for systems serving millions of subscribers.",
    tags: ["Telecom", "Enterprise QA", "Scale"],
  },
  {
    company: "Workers Compensation",
    metric: "Unified claims platform",
    title: "Healthcare claims transformation",
    description:
      "Delivered mobile and web claims management with .NET Core and Angular — streamlining workflows, improving visibility, and elevating experience for adjusters and providers.",
    tags: ["Healthcare", ".NET Core", "Angular", "Claims"],
  },
];

const aiPillars = [
  {
    title: "AI Strategy & Governance",
    description:
      "Align AI initiatives with business objectives through executive roadmaps, investment prioritization, and governance that balances innovation with accountability.",
  },
  {
    title: "AI Delivery Excellence",
    description:
      "Lead cross-functional teams to deploy AI solutions — from Azure AI chatbots and Copilot integrations to intelligent automation — with agile cadence and measurable outcomes.",
  },
  {
    title: "AI Ethics & Compliance",
    description:
      "Ensure responsible adoption with risk evaluation systems, compliance-driven decision models, and quality standards that protect participants, data, and regulations.",
  },
  {
    title: "AI Innovation",
    description:
      "Drive pilots in predictive analytics, process automation, and machine learning — turning proofs of concept into production solutions that expand business possibility.",
  },
];

const workItems = [
  {
    title: "AI Support Automation Dashboard",
    description:
      "Executive view of Azure AI chatbot deployment — tracking support efficiency, resolution rates, and Copilot integration across service operations.",
    tags: ["Azure AI", "Copilot", "Automation"],
  },
  {
    title: "401k Risk Evaluation Framework",
    description:
      "Automated compliance and decision-support for retirement plan participants — reducing manual review cycles and improving regulatory accuracy.",
    tags: ["FinTech", "Compliance", "ML"],
  },
  {
    title: "Healthcare Claims Transformation",
    description:
      "End-to-end delivery for workers compensation and healthcare claims — from requirements through .NET Core and Angular production rollout.",
    tags: ["Healthcare", ".NET", "Mobile"],
  },
  {
    title: "Travel ERP & GDS Integration",
    description:
      "Product delivery for airline and travel ERP — GDS connectivity, payment reconciliation, and multi-region deployment across three continents.",
    tags: ["ERP", "Travel", "Integration"],
  },
  {
    title: "Intelligent Platform Delivery",
    description:
      "Engineering leadership for MedTech, FinTech, and EdTech platforms — integrating machine learning for automated decision-making and analytics.",
    tags: ["MedTech", "FinTech", "ML"],
  },
  {
    title: "Enterprise Agile Transformation",
    description:
      "Operating model for scaling agile — sprint velocity, epic decomposition, and stakeholder satisfaction across 20+ enterprise programs.",
    tags: ["Agile", "CSM", "PMP"],
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderExperience() {
  const list = document.getElementById("experience-list");
  if (!list) return;

  list.innerHTML = experience
    .map(
      (item) => `
      <li class="experience-item reveal">
        <div class="experience-meta">
          <strong>${escapeHtml(item.company)}</strong>
          <span>${escapeHtml(item.metric)}</span>
        </div>
        <div class="experience-body">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </li>`
    )
    .join("");
}

function renderAI() {
  const list = document.getElementById("ai-list");
  if (!list) return;

  list.innerHTML = aiPillars
    .map(
      (item) => `
      <li class="ai-item reveal">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </li>`
    )
    .join("");
}

function renderWork() {
  const list = document.getElementById("work-list");
  if (!list) return;

  list.innerHTML = workItems
    .map(
      (item, index) => `
      <article class="work-item reveal">
        <span class="work-index">${String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </article>`
    )
    .join("");
}

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  const header = document.querySelector(".site-header");

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

renderExperience();
renderAI();
renderWork();
initNav();
initReveal();
initYear();
