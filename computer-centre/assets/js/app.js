const institute = {
  name: 'E+++ Solutions',
  tagline: 'Government-Recognized Computer Institute',
  experience: '20+',
  rating: '4.9',
  reviews: '150+',
  email: 'eplusplussolution@gmail.com',
  social: 'eplusplussolution',
  address: {
    line1: '2nd Floor, Kajal Building',
    line2: 'Annie Hall Road, Palayam',
    city: 'Kozhikode (Calicut), Kerala 673002',
    landmark: 'Near Kozhikode Railway Station',
  },
  phones: ['+91 94467 24270', '+91 94950 52932', '+91 77368 68688'],
  whatsapp: '919446724270',
  mapsUrl: 'https://maps.google.com/?q=Kajal+Building+Annie+Hall+Road+Palayam+Kozhikode+673002',
  hours: {
    all: 'Monday – Sunday: 9:00 AM – 6:30 PM',
  },
};

const aboutText = `With over 20+ years of excellence in computer training, E+++ Solutions is a government-recognized institute under the State of Kerala. We offer a wide range of in-demand courses with NORKA-attested certificates valid for PSC exams, overseas opportunities, and career advancement. Our curriculum combines theory with hands-on, project-based learning, guided by experienced industry professionals — ensuring students gain real-world, job-ready skills.`;

const whyChooseUs = [
  'Expert instructors with industry experience',
  'Student-specific training based on their abilities',
  'Government-recognized courses',
  'Support for online & offline learning',
  'Placement assistance',
  'Excellent student feedback & reputation',
];

const diplomaCourses = [
  {
    code: 'PDCFA',
    title: 'Post Graduate Diploma in Computer Applications',
    eligibility: 'Any Degree',
    duration: '720 Hours (1 Year)',
    desc: 'Core concepts of computer applications via logic building, database management, communication networks, website designing, and business applications through program coding.',
    topics: ['Python, C++/Java', 'SQL & RDBMS', 'Web Design & PHP/ASP.Net', 'VB.Net / Android', 'OS, Office Suite & Advanced Excel'],
  },
  {
    code: 'CTTC',
    title: 'Diploma in Computer Teachers Training Course',
    eligibility: '10th std passed & above',
    duration: '720 Hours (1 Year)',
    desc: 'Fundamental concepts of computers and programming with effective methodologies in teaching IT-based curricula and English practice sessions.',
    topics: ['C++ & HTML', 'Tally & Accounting', 'DTP (English & Malayalam)', 'Teaching Methods (Pedagogy)', 'Teaching Practice'],
  },
  {
    code: 'DCA',
    title: 'Diploma in Computer Application',
    eligibility: '10th std passed & above',
    duration: '720 / 360 Hours (1 Year / 6 Months)',
    desc: 'Explore essentials and practicalities of computers, operating systems, and system engineering with intense lab practices.',
    topics: ['Python / C++ / Java', 'Visual Basic.Net', 'RDBMS & SQL', 'Office Suite & Advanced Excel', 'Project work'],
  },
  {
    code: 'CWPDE',
    title: 'Certificate in Word Processing & Data Entry',
    eligibility: '10th std passed & above',
    duration: '360 Hours (6 Months)',
    desc: 'Sharpens data entry skills through keyboard typing practice, then equips students with Word, Excel, PowerPoint and DTP skills.',
    topics: ['English & Malayalam Typing', 'MS Office Suite', 'DTP (PageMaker, InDesign, ISM)', 'Computer fundamentals'],
  },
  {
    code: 'PDCFA-FA',
    title: 'Professional Diploma in Computerized Financial Accounting',
    eligibility: '10th std passed & above',
    duration: '360 Hours (6 Months)',
    desc: 'Computerized accounting, GST-enabled taxation, Indian & foreign business accounting, and financial report generation.',
    topics: ['Tally Prime with GST', 'ZOHO Books & QuickBooks', 'GCC VAT', 'Indian Business Accounting'],
  },
];

const otherPrograms = [
  'DOA – Diploma in Office Automation',
  'PDDTP – Professional Diploma in Desktop Publishing',
  'PDCAD – Professional Diploma in Computer Aided Design',
  'PDWD – Professional Diploma in Web Designing',
  'DGSTP – Diploma in Goods and Services Tax Practice',
  'DCBAT – Diploma in Corporate Business Accounting & Taxation',
  'Interior Designing',
  'Fashion Designing',
];

function addressHtml() {
  const a = institute.address;
  return `${a.line1}<br />${a.line2}<br />${a.city}<br /><em>${a.landmark}</em>`;
}

function phonesHtml() {
  return institute.phones.map((p) => {
    const tel = p.replace(/\s/g, '').replace('+', '');
    return `<a href="tel:+${tel}" style="color:inherit">${p}</a>`;
  }).join('<br />');
}

function courseCard(c, i) {
  return `
    <article class="card reveal" style="--delay:${i * 80}ms">
      <span class="course-code">${c.code}</span>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="course-meta">
        <span class="tag">${c.eligibility}</span>
        <span class="tag">${c.duration}</span>
      </div>
      <ul class="course-topics">${c.topics.map((t) => `<li>${t}</li>`).join('')}</ul>
      <a href="#/contact" class="btn btn-primary btn-sm course-btn">Enquire Now</a>
    </article>`;
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy reveal">
          <div class="eyebrow animate-shimmer">Kozhikode · Palayam · Near Railway Station</div>
          <h1 class="animate-title">Government-recognized computer training with <span class="text-gradient">20+ years</span> of excellence.</h1>
          <p>NORKA-attested certificates for PSC exams, overseas opportunities, and career growth. Online & offline batches at our Palayam centre near Kozhikode railway station.</p>
          <div class="hero-actions">
            <a href="#/courses" class="btn btn-primary btn-glow">View Courses</a>
            <a href="https://wa.me/${institute.whatsapp}" class="btn btn-secondary" target="_blank" rel="noopener">WhatsApp ${institute.phones[0]}</a>
          </div>
          <div class="hero-stats">
            <div class="stat-pill reveal" style="--delay:100ms"><strong>${institute.experience}</strong><span>Years experience</span></div>
            <div class="stat-pill reveal" style="--delay:200ms"><strong>${institute.rating}★</strong><span>${institute.reviews} reviews</span></div>
            <div class="stat-pill reveal" style="--delay:300ms"><strong>Palayam</strong><span>Near Railway Station</span></div>
          </div>
        </div>
        <div class="hero-card reveal float-card emblem-card" style="--delay:150ms">
          <img src="assets/images/rutronix-emblem.jpeg" alt="Kerala State Rutronix — ITKerala Software Education Project" class="rutronix-emblem" />
          <p class="muted emblem-caption">Kerala State Rutronix · ITKerala Software Education Project</p>
        </div>
      </div>
    </section>

    <section class="section section-alt reveal">
      <div class="container">
        <div class="section-header">
          <h2>Why choose E+++ Solutions?</h2>
        </div>
        <div class="grid-3">
          ${whyChooseUs.map((item, i) => `
            <div class="card reveal hover-lift" style="--delay:${i * 70}ms">
              <div class="card-icon">✓</div>
              <p><strong>${item}</strong></p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section reveal">
      <div class="container">
        <div class="section-header">
          <h2>About E+++ Solutions</h2>
          <p>${aboutText}</p>
        </div>
        <div style="text-align:center">
          <a href="#/about" class="btn btn-secondary">Read more about us →</a>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-header reveal">
          <h2>Flagship diploma programs</h2>
          <p>Government-recognized courses with practical lab training and project-based learning.</p>
        </div>
        <div class="grid-3">
          ${diplomaCourses.slice(0, 3).map((c, i) => courseCard(c, i)).join('')}
        </div>
        <div style="text-align:center;margin-top:28px" class="reveal">
          <a href="#/courses" class="btn btn-secondary">View all courses →</a>
        </div>
      </div>
    </section>`;
}

function renderAbout() {
  return `
    <section class="section page-top">
      <div class="container">
        <div class="section-header reveal">
          <h2>About Us</h2>
          <p>${aboutText}</p>
        </div>
        <div class="grid-2">
          <div class="card reveal">
            <h3>Our mission</h3>
            <p class="muted">To deliver government-recognized, job-oriented computer education that empowers students for PSC exams, overseas careers, and the IT industry through hands-on training.</p>
          </div>
          <div class="card reveal" style="--delay:100ms">
            <h3>Certifications</h3>
            <p class="muted">NORKA-attested certificates from a Kerala government-recognized institute — trusted for PSC applications and international opportunities.</p>
          </div>
        </div>
        <div class="card reveal" style="--delay:100ms;margin-top:24px">
          <img src="assets/images/rutronix-emblem.jpeg" alt="Kerala State Rutronix" class="rutronix-emblem about-emblem" />
        </div>
        <div class="card reveal" style="--delay:200ms;margin-top:24px">
          <h3>Why choose us?</h3>
          <ul class="check-list">${whyChooseUs.map((w) => `<li>${w}</li>`).join('')}</ul>
        </div>
      </div>
    </section>`;
}

function renderServices() {
  return `
    <section class="section page-top">
      <div class="container">
        <div class="section-header reveal">
          <h2>What we offer</h2>
          <p>Professional, job-oriented programs for students, teachers, and career seekers in Kozhikode.</p>
        </div>
        <div class="grid-3">
          ${[
            { icon: '🎓', title: 'Diploma Programs', desc: 'PDCFA, DCA, CTTC, CWPDE and financial accounting diplomas with structured semesters.' },
            { icon: '📜', title: 'NORKA Certificates', desc: 'Attested certificates valid for PSC exams, overseas jobs, and government applications.' },
            { icon: '💼', title: 'Placement Support', desc: 'Career guidance and placement assistance for job-ready graduates.' },
            { icon: '🖥️', title: 'Lab Training', desc: 'Hands-on practical sessions with project work and seminar components.' },
            { icon: '🌐', title: 'Online & Offline', desc: 'Flexible learning modes for school, college, and working professionals.' },
            { icon: '📊', title: 'Accounting & GST', desc: 'Tally Prime, ZOHO Books, GCC VAT, and computerized financial accounting.' },
          ].map((s, i) => `
            <article class="card reveal hover-lift" style="--delay:${i * 70}ms">
              <div class="card-icon">${s.icon}</div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>`;
}

function renderCourses() {
  return `
    <section class="section page-top">
      <div class="container">
        <div class="section-header reveal">
          <h2>Diploma & Certificate Courses</h2>
          <p>Structured programs with theory, lab, and project components — as per E+++ Solutions curriculum.</p>
        </div>
        <div class="grid-2 course-grid">
          ${diplomaCourses.map((c, i) => courseCard(c, i)).join('')}
        </div>
        <div class="section-header reveal" style="margin-top:56px">
          <h2>More professional programs</h2>
          <p>We also provide a wide selection of job-oriented courses including:</p>
        </div>
        <div class="program-tags reveal">
          ${otherPrograms.map((p) => `<span class="tag tag-lg">${p}</span>`).join('')}
        </div>
      </div>
    </section>`;
}

function renderContact() {
  return `
    <section class="section page-top">
      <div class="container contact-grid">
        <div class="card reveal">
          <h2>Contact us</h2>
          <p class="muted" style="margin-bottom:24px">Call, WhatsApp, or visit our Palayam centre near Kozhikode railway station.</p>
          <form id="contact-form">
            <div class="form-field">
              <label for="name">Full name</label>
              <input id="name" name="name" required placeholder="Your name" />
            </div>
            <div class="form-field">
              <label for="phone">Phone</label>
              <input id="phone" name="phone" required placeholder="10-digit mobile number" />
            </div>
            <div class="form-field">
              <label for="interest">Course interested in</label>
              <select id="interest" name="interest">
                ${diplomaCourses.map((c) => `<option>${c.code} – ${c.title}</option>`).join('')}
                ${otherPrograms.map((p) => `<option>${p}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label for="message">Message</label>
              <textarea id="message" name="message" placeholder="Batch timing, eligibility, or questions..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-glow">Send via WhatsApp</button>
          </form>
        </div>
        <div>
          <div class="card reveal" style="--delay:100ms;margin-bottom:24px">
            <h3>Visit us</h3>
            <div class="info-list">
              <div class="info-item"><div class="icon">📍</div><div><strong>Address</strong><p class="muted">${addressHtml()}</p>
                <a href="${institute.mapsUrl}" target="_blank" rel="noopener" class="link-arrow">Get directions →</a></div></div>
              <div class="info-item"><div class="icon">📞</div><div><strong>Phone</strong><p class="muted">${phonesHtml()}</p></div></div>
              <div class="info-item"><div class="icon">💬</div><div><strong>WhatsApp</strong><p class="muted"><a href="https://wa.me/${institute.whatsapp}" target="_blank" rel="noopener" style="color:inherit">+91 94467 24270</a></p></div></div>
              <div class="info-item"><div class="icon">✉️</div><div><strong>Email</strong><p class="muted"><a href="mailto:${institute.email}" style="color:inherit">${institute.email}</a></p></div></div>
              <div class="info-item"><div class="icon">🕐</div><div><strong>Hours</strong><p class="muted">${institute.hours.all}</p></div></div>
              <div class="info-item social-row">
                <a href="https://www.instagram.com/eplusplussolution" target="_blank" rel="noopener" class="social-link">
                  <img src="assets/images/icon-instagram.jpeg" alt="Instagram" /> @eplusplussolution
                </a>
              </div>
            </div>
          </div>
          <div class="card cta-card reveal float-card" style="--delay:200ms">
            <h3>Talk to us on WhatsApp</h3>
            <p>Quick response for admissions, course details, and batch timings.</p>
            <a href="https://wa.me/${institute.whatsapp}" class="btn btn-secondary" style="background:#fff;margin-top:16px" target="_blank" rel="noopener">Chat: 94467 24270</a>
          </div>
        </div>
      </div>
    </section>`;
}

const routes = {
  '/': renderHome,
  '/about': renderAbout,
  '/services': renderServices,
  '/courses': renderCourses,
  '/contact': renderContact,
};

function parseRoute() {
  const raw = location.hash.slice(1) || '/';
  const path = raw.split('?')[0] || '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => { toast.hidden = true; }, 3500);
}

function initScrollAnimations() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => observer.observe(el));
}

function bindContactForm() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const text = encodeURIComponent(
      `Hello E+++ Solutions,\nI am ${fd.get('name')} (${fd.get('phone')}).\nInterested in: ${fd.get('interest')}\n${fd.get('message') || ''}`
    );
    window.open(`https://wa.me/${institute.whatsapp}?text=${text}`, '_blank');
    form.reset();
    showToast('Opening WhatsApp...');
  });
}

function navigate() {
  const path = parseRoute();
  const render = routes[path] || renderHome;
  document.getElementById('app').innerHTML = render();
  const pageName = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
  document.title = `${pageName} | E+++ Solutions Kozhikode`;

  document.querySelectorAll('.site-nav a[data-path]').forEach((link) => {
    link.classList.toggle('active', link.dataset.path === path);
  });

  bindContactForm();
  requestAnimationFrame(initScrollAnimations);
  document.getElementById('site-nav')?.classList.remove('open');
}

document.getElementById('nav-toggle')?.addEventListener('click', () => {
  document.getElementById('site-nav')?.classList.toggle('open');
});

window.addEventListener('hashchange', navigate);
if (!location.hash) location.hash = '#/';
else navigate();
