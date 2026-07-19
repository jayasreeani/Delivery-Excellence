const highlights = [
  {
    company: 'Nucore Software Solutions',
    logoClass: 'nucore',
    logoText: 'NC',
    metric: '5+ years · Travel & Airline ERP',
    description:
      'Led product strategy for TRAACS and SkyTRAACS ERP platforms serving travel agencies, OTAs, and budget airlines across Africa, GCC, and Australia. Integrated GDS systems (Amadeus, Galileo, Sabre) and delivered automation tools (GDS Mate, Travtics) for PNR cleanup and ADM resolution.',
    tags: ['ERP', 'GDS Integration', 'FinTech', 'Product Strategy'],
  },
  {
    company: 'Slavic401k',
    logoClass: 'slavic',
    logoText: '401k',
    metric: '40% faster client onboarding',
    description:
      'Directed enterprise 401k solution delivery including Relius–Salesforce integration, automated risk evaluation for participants, and Salesforce-based client onboarding automation — improving compliance, accuracy, and decision-making at scale.',
    tags: ['401k', 'Salesforce', 'FinTech', 'Automation'],
  },
  {
    company: 'Lever',
    logoClass: 'lever',
    logoText: 'LV',
    metric: 'Enterprise SaaS delivery',
    description:
      'Led cross-functional delivery programs for talent acquisition platforms — aligning product roadmaps, sprint cadence, and stakeholder expectations to accelerate feature releases and improve platform reliability for enterprise HR teams.',
    tags: ['SaaS', 'Agile', 'HR Tech', 'Stakeholder Mgmt'],
  },
  {
    company: 'Gymhub',
    logoClass: 'gymhub',
    logoText: 'GH',
    metric: 'Multi-platform rollout',
    description:
      'Oversaw delivery of mobile and web fitness management platforms — coordinating engineering, QA, and product teams to launch member engagement features, payment integrations, and operational dashboards for fitness operators.',
    tags: ['Mobile', 'Web App', 'Operations', 'Digital Platform'],
  },
  {
    company: 'Verizon',
    logoClass: 'verizon',
    logoText: 'VZ',
    metric: 'Fortune-scale telecom programs',
    description:
      'Built delivery foundation at Infosys–Verizon on large-scale telecom projects — coordinating end-to-end testing, quality assurance, and release readiness for mission-critical enterprise systems serving millions of subscribers.',
    tags: ['Telecom', 'Enterprise QA', 'Scale', 'Infosys'],
  },
  {
    company: 'Workers Compensation',
    logoClass: 'workers',
    logoText: 'WC',
    metric: 'Unified claims platform',
    description:
      'Delivered mobile and web application for healthcare and workers compensation claims management using .NET Core and Angular — streamlining data workflows, improving claim processing visibility, and enhancing user experience for adjusters and providers.',
    tags: ['Healthcare', '.NET Core', 'Angular', 'Claims'],
  },
  {
    company: 'Visitors Management',
    logoClass: 'visitors',
    logoText: 'VM',
    metric: 'Secure enterprise access',
    description:
      'Led delivery of visitor management and access control solutions for enterprise facilities — integrating check-in workflows, badge systems, and compliance reporting to improve security operations and front-desk efficiency.',
    tags: ['Enterprise', 'Security', 'Workflow', 'Compliance'],
  },
];

const aiPillars = [
  {
    icon: '◎',
    title: 'AI Strategy & Governance',
    description:
      'Align AI initiatives with business objectives through executive roadmaps, investment prioritization, and governance frameworks that balance innovation with operational accountability.',
  },
  {
    icon: '◈',
    title: 'AI Delivery Excellence',
    description:
      'Lead cross-functional teams to deploy AI solutions — from Azure AI chatbots and Copilot integrations to intelligent automation platforms — with agile cadence and measurable outcomes.',
  },
  {
    icon: '◇',
    title: 'AI Ethics & Compliance',
    description:
      'Ensure responsible AI adoption with risk evaluation systems, compliance-driven decision models, and quality standards that protect participants, data, and regulatory requirements.',
  },
  {
    icon: '✦',
    title: 'AI Innovation',
    description:
      'Drive pilots in predictive analytics, intelligent process automation, and machine learning platforms — turning proof-of-concepts into production-ready solutions that expand business possibilities.',
  },
];

const insights = [
  {
    category: 'AI Strategy',
    title: 'From AI Pilots to Production: An Executive Delivery Playbook',
    excerpt:
      'How senior delivery leaders can bridge the gap between AI experimentation and enterprise-scale deployment — with governance, metrics, and stakeholder alignment built in.',
    link: 'https://linkedin.com/in/jayasree',
  },
  {
    category: 'Governance',
    title: 'Responsible AI in Regulated Industries: Lessons from FinTech & Healthcare',
    excerpt:
      'Frameworks for ensuring AI systems meet compliance requirements while accelerating time-to-value in 401k administration, claims processing, and risk evaluation.',
    link: 'https://linkedin.com/in/jayasree',
  },
  {
    category: 'Delivery Excellence',
    title: 'Scaling Agile for AI Programs: Beyond Traditional Sprint Planning',
    excerpt:
      'Adapting agile practices for AI delivery — managing model iterations, data dependencies, and cross-functional teams in complex enterprise environments.',
    link: 'https://linkedin.com/in/jayasree',
  },
  {
    category: 'Leadership',
    title: 'Building AI-Ready Delivery Teams: Mentorship & Culture',
    excerpt:
      'Creating collaborative cultures where engineers, data scientists, and business stakeholders co-own outcomes — and junior talent grows into AI delivery leaders.',
    link: 'https://linkedin.com/in/jayasree',
  },
];

const portfolioItems = [
  {
    title: 'AI Support Automation Dashboard',
    description:
      'Executive view of Azure AI chatbot deployment — tracking support efficiency gains, resolution rates, and Copilot integration metrics across enterprise service operations.',
    tags: ['Azure AI', 'Copilot', 'Automation'],
  },
  {
    title: '401k Risk Evaluation Framework',
    description:
      'Automated compliance and decision-support system for retirement plan participants — reducing manual review cycles and improving regulatory accuracy.',
    tags: ['FinTech', 'Compliance', 'ML'],
  },
  {
    title: 'Healthcare Claims Transformation',
    description:
      'End-to-end delivery story for workers compensation and healthcare claims platform — from requirements through .NET Core and Angular production rollout.',
    tags: ['Healthcare', '.NET', 'Mobile'],
  },
  {
    title: 'Intelligent Platform Delivery (Gritstone)',
    description:
      'Engineering leadership for MedTech, FinTech, and EdTech platforms — integrating machine learning models for automated decision-making and analytics.',
    tags: ['MedTech', 'FinTech', 'ML'],
  },
  {
    title: 'Travel ERP & GDS Integration',
    description:
      'Product delivery framework for airline and travel ERP systems — GDS connectivity, payment reconciliation, and multi-region deployment across three continents.',
    tags: ['ERP', 'Travel', 'Integration'],
  },
  {
    title: 'Enterprise Agile Transformation',
    description:
      'Delivery operating model for scaling agile practices — sprint velocity improvements, epic decomposition, and stakeholder satisfaction across 20+ programs.',
    tags: ['Agile', 'CSM', 'PMP'],
  },
];

function renderHighlights() {
  const grid = document.getElementById('highlights-grid');
  if (!grid) return;
  grid.innerHTML = highlights
    .map(
      (h) => `
    <article class="highlight-card reveal">
      <div class="card-logo ${h.logoClass}">${h.logoText}</div>
      <p class="metric">${h.metric}</p>
      <h3>${h.company}</h3>
      <p>${h.description}</p>
      <div class="tags">${h.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
    </article>`
    )
    .join('');
}

function renderAI() {
  const grid = document.getElementById('ai-grid');
  if (!grid) return;
  grid.innerHTML = aiPillars
    .map(
      (a) => `
    <article class="ai-card reveal">
      <div class="ai-icon">${a.icon}</div>
      <h3>${a.title}</h3>
      <p>${a.description}</p>
    </article>`
    )
    .join('');
}

function renderInsights() {
  const grid = document.getElementById('insights-grid');
  if (!grid) return;
  grid.innerHTML = insights
    .map(
      (i) => `
    <article class="insight-card reveal">
      <div class="insight-visual">
        <span class="insight-category">${i.category}</span>
      </div>
      <div class="insight-body">
        <h3>${i.title}</h3>
        <p>${i.excerpt}</p>
        <a href="${i.link}" target="_blank" rel="noopener">Read on LinkedIn →</a>
      </div>
    </article>`
    )
    .join('');
}

function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  grid.innerHTML = portfolioItems
    .map(
      (p) => `
    <article class="portfolio-card reveal">
      <div class="portfolio-preview">
        <div class="mock-bar"></div>
        <div class="mock-chart">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
      <div class="portfolio-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="portfolio-meta">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </article>`
    )
    .join('');
}

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = nav?.querySelectorAll('a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks?.forEach((link) => {
          const href = link.getAttribute('href');
          link.style.color = href === `#${id}` ? 'var(--navy)' : '';
          link.style.fontWeight = href === `#${id}` ? '700' : '500';
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const subject = encodeURIComponent(fd.get('subject') || 'Executive Portfolio Inquiry');
    const body = encodeURIComponent(
      `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`
    );
    window.location.href = `mailto:jayasreeani@gmail.com?subject=${subject}&body=${body}`;
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    },
    { passive: true }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  renderHighlights();
  renderAI();
  renderInsights();
  renderPortfolio();
  initNav();
  initReveal();
  initContactForm();
  initHeaderScroll();
});
