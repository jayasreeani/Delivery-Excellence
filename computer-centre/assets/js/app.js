// Institute details sourced from public listings (JustDial, Quickerala, Kozhikode Directory)
export const institute = {
  name: 'E+++ Solutions',
  tagline: 'Government Certified Computer Institute',
  established: 2007,
  rating: '4.9',
  reviews: '150+',
  address: {
    line1: '2nd Floor, Kajal Building',
    line2: 'Annie Hall Road, Palayam',
    city: 'Kozhikode (Calicut), Kerala 673002',
    landmark: 'Near Kozhikode Railway Station',
  },
  phones: ['+91 84605 12135', '+91 77368 68688'],
  whatsapp: '918460512135',
  mapsUrl: 'https://maps.google.com/?q=Kajal+Building+Annie+Hall+Road+Palayam+Kozhikode+673002',
  hours: {
    weekdays: 'Mon – Sat: 9:00 AM – 6:30 PM',
    sunday: 'Sunday: Closed',
  },
};

const services = [
  {
    icon: '🎓',
    title: 'Government Certified Training',
    desc: 'Recognised computer courses designed to help you build job-ready IT skills and earn certifications.',
    points: ['Established in 2007', 'Offline & online batches', 'Career-focused curriculum'],
  },
  {
    icon: '📊',
    title: 'Tally & Accounting',
    desc: 'Practical accounting and Tally training including GST, billing, inventory, and payroll for commerce students and professionals.',
    points: ['Tally with GST', 'Accounting fundamentals', 'Small business bookkeeping'],
  },
  {
    icon: '💻',
    title: 'Programming Courses',
    desc: 'Learn programming from basics to job-oriented development with hands-on lab practice.',
    points: ['C & C++', 'Python & Java', 'Full-stack development'],
  },
  {
    icon: '📝',
    title: 'MS Office & IT Fundamentals',
    desc: 'Word, Excel, PowerPoint, internet basics, and computer fundamentals for students and office staff.',
    points: ['MS Office suite', 'Typing & DTP support', 'Digital literacy'],
  },
  {
    icon: '🎬',
    title: 'Video Editing & Animation',
    desc: 'Creative courses in video editing and 3D animation for media, marketing, and design careers.',
    points: ['Video editing classes', '3D animation basics', 'Project-based learning'],
  },
  {
    icon: '🌐',
    title: 'Online & Offline Classes',
    desc: 'Flexible learning modes for school students, college learners, and working professionals in Kozhikode.',
    points: ['Palayam centre near railway station', 'Small batch sizes', 'Enquiry & counselling'],
  },
];

const courses = [
  {
    title: 'Tally with GST',
    level: 'Beginner – Advanced',
    duration: 'Flexible batches',
    mode: 'Offline / Online',
    desc: 'Complete Tally ERP training with GST, accounting entries, invoicing, and practical business scenarios.',
  },
  {
    title: 'MS Office',
    level: 'Beginner',
    duration: 'Short-term',
    mode: 'Weekday batches',
    desc: 'Word, Excel, PowerPoint and office productivity skills for students and job seekers.',
  },
  {
    title: 'C & C++ Programming',
    level: 'Beginner – Intermediate',
    duration: 'Certificate course',
    mode: 'Lab training',
    desc: 'Programming logic, syntax, and problem solving with structured lab sessions.',
  },
  {
    title: 'Python Programming',
    level: 'Intermediate',
    duration: 'Certificate course',
    mode: 'Offline / Online',
    desc: 'Python fundamentals for automation, applications, and entry into data and development roles.',
  },
  {
    title: 'Java Programming',
    level: 'Intermediate',
    duration: 'Certificate course',
    mode: 'Lab training',
    desc: 'Object-oriented programming with Java for academic and software career preparation.',
  },
  {
    title: 'Video Editing & 3D Animation',
    level: 'Creative',
    duration: 'Project-based',
    mode: 'Practical classes',
    desc: 'Video editing and animation skills for digital media, content creation, and design work.',
  },
  {
    title: 'Accounting Training',
    level: 'Beginner',
    duration: 'Short-term',
    mode: 'Offline',
    desc: 'Accounting principles and computerised accounting workflows for commerce and finance roles.',
  },
  {
    title: 'Full Stack & IT Programs',
    level: 'Advanced',
    duration: 'Career programs',
    mode: 'Offline / Online',
    desc: 'Job-oriented IT training including modern development and emerging technology topics.',
  },
];

const plans = [
  {
    name: 'Certificate Courses',
    price: 'Contact',
    unit: 'for fees',
    features: ['Government recognised programs', 'Course counselling', 'Flexible batch timings', 'Palayam centre near railway station'],
  },
  {
    name: 'Student Programs',
    price: 'Affordable',
    unit: 'packages',
    featured: true,
    features: ['MS Office & fundamentals', 'Programming & Tally options', 'Online & offline modes', 'Ideal for college students'],
  },
  {
    name: 'Career & IT Training',
    price: 'Custom',
    unit: 'quote',
    features: ['Python, Java & full-stack paths', 'Video editing & animation', 'Practical project support', 'Speak to our counsellor'],
  },
];

function addressHtml() {
  const a = institute.address;
  return `${a.line1}<br />${a.line2}<br />${a.city}<br /><em>${a.landmark}</em>`;
}

function phonesHtml() {
  return institute.phones.map((p) => `<a href="tel:${p.replace(/\s/g, '')}" style="color:inherit">${p}</a>`).join('<br />');
}

function renderHome() {
  const years = new Date().getFullYear() - institute.established;
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow">Kozhikode · Palayam · Near Railway Station</div>
          <h1>Government certified computer training since ${institute.established}.</h1>
          <p>E+++ Solutions is a trusted computer institute in Calicut offering Tally, MS Office, programming, accounting, video editing, and IT courses — with both online and offline classes.</p>
          <div class="hero-actions">
            <a href="#/courses" class="btn btn-primary">View Courses</a>
            <a href="https://wa.me/${institute.whatsapp}" class="btn btn-secondary" target="_blank" rel="noopener">WhatsApp Us</a>
          </div>
          <div class="hero-stats">
            <div><strong>${years}+ yrs</strong><span>Teaching experience</span></div>
            <div><strong>${institute.rating}★</strong><span>${institute.reviews} reviews</span></div>
            <div><strong>Palayam</strong><span>Near Kozhikode Railway Station</span></div>
          </div>
        </div>
        <div class="hero-card">
          <h3>Why students choose E+++ Solutions</h3>
          <div class="hero-list">
            <div class="hero-list-item">
              <div class="icon">✓</div>
              <div><strong>Government certified courses</strong><p class="muted">Programs that help you prepare for IT and office careers.</p></div>
            </div>
            <div class="hero-list-item">
              <div class="icon">✓</div>
              <div><strong>Convenient location</strong><p class="muted">2nd Floor, Kajal Building, Annie Hall Road — walkable from Kozhikode railway station.</p></div>
            </div>
            <div class="hero-list-item">
              <div class="icon">✓</div>
              <div><strong>Online & offline classes</strong><p class="muted">Flexible learning for school, college, and working students.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Computer institute services in Kozhikode</h2>
          <p>From accounting and programming to creative and IT career programs — all under one roof in Palayam.</p>
        </div>
        <div class="grid-3">
          ${services.slice(0, 3).map((s) => `
            <article class="card">
              <div class="card-icon">${s.icon}</div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </article>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:28px">
          <a href="#/services" class="btn btn-secondary">View all services →</a>
        </div>
      </div>
    </section>

    <section class="section" style="background:#fff">
      <div class="container">
        <div class="section-header">
          <h2>Popular courses at E+++ Solutions</h2>
          <p>Tally, MS Office, C/C++, Python, Java, accounting, video editing, and more. New batches open regularly.</p>
        </div>
        <div class="grid-3">
          ${courses.slice(0, 3).map((c) => `
            <article class="card">
              <h3>${c.title}</h3>
              <p>${c.desc}</p>
              <div class="course-meta">
                <span class="tag">${c.level}</span>
                <span class="tag">${c.mode}</span>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>`;
}

function renderServices() {
  return `
    <section class="section" style="padding-top:48px">
      <div class="container">
        <div class="section-header">
          <h2>Our Services</h2>
          <p>Government recognised computer training and software courses in Palayam, Kozhikode.</p>
        </div>
        <div class="grid-3">
          ${services.map((s) => `
            <article class="card">
              <div class="card-icon">${s.icon}</div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
              <ul>${s.points.map((p) => `<li>${p}</li>`).join('')}</ul>
            </article>
          `).join('')}
        </div>
      </div>
    </section>`;
}

function renderCourses() {
  return `
    <section class="section" style="padding-top:48px">
      <div class="container">
        <div class="section-header">
          <h2>Training Courses</h2>
          <p>Job-oriented computer courses with practical training at our Kozhikode centre near the railway station.</p>
        </div>
        <div class="grid-3">
          ${courses.map((c) => `
            <article class="card">
              <h3>${c.title}</h3>
              <p>${c.desc}</p>
              <div class="course-meta">
                <span class="tag">${c.level}</span>
                <span class="tag">${c.duration}</span>
                <span class="tag">${c.mode}</span>
              </div>
              <div style="margin-top:20px">
                <a href="#/contact" class="btn btn-primary btn-sm" style="padding:10px 16px">Enquire Now</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>`;
}

function renderPricing() {
  return `
    <section class="section" style="padding-top:48px">
      <div class="container">
        <div class="section-header">
          <h2>Course fees & packages</h2>
          <p>Fees vary by course and batch. Call or WhatsApp us for the latest schedule and admission details.</p>
        </div>
        <div class="grid-3">
          ${plans.map((p) => `
            <article class="card ${p.featured ? 'featured' : ''}">
              ${p.featured ? '<span class="badge">Popular</span>' : ''}
              <h3>${p.name}</h3>
              <div class="price">${p.price} <small>${p.unit}</small></div>
              <ul>${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
              <div style="margin-top:22px">
                <a href="#/contact" class="btn ${p.featured ? 'btn-primary' : 'btn-secondary'}">Enquire Now</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>`;
}

function renderContact() {
  return `
    <section class="section" style="padding-top:48px">
      <div class="container contact-grid">
        <div class="card">
          <h2 style="margin-bottom:8px">Get in touch</h2>
          <p class="muted" style="margin-bottom:24px">Ask about admissions, batch timings, or visit our Palayam centre near Kozhikode railway station.</p>
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
              <label for="interest">I'm interested in</label>
              <select id="interest" name="interest">
                <option>Tally with GST</option>
                <option>MS Office</option>
                <option>C / C++ Programming</option>
                <option>Python / Java</option>
                <option>Accounting course</option>
                <option>Video editing / Animation</option>
                <option>Other course</option>
              </select>
            </div>
            <div class="form-field">
              <label for="message">Message</label>
              <textarea id="message" name="message" placeholder="Course, preferred timing, or any questions..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Enquiry</button>
          </form>
        </div>
        <div>
          <div class="card" style="margin-bottom:24px">
            <h3 style="margin-bottom:18px">Visit us in Kozhikode</h3>
            <div class="info-list">
              <div class="info-item">
                <div class="icon">📍</div>
                <div><strong>Address</strong><p class="muted">${addressHtml()}</p>
                  <a href="${institute.mapsUrl}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm" style="margin-top:10px;padding-left:0">Get directions →</a>
                </div>
              </div>
              <div class="info-item">
                <div class="icon">📞</div>
                <div><strong>Phone</strong><p class="muted">${phonesHtml()}</p></div>
              </div>
              <div class="info-item">
                <div class="icon">💬</div>
                <div><strong>WhatsApp</strong><p class="muted"><a href="https://wa.me/${institute.whatsapp}" target="_blank" rel="noopener" style="color:inherit">Chat on WhatsApp</a></p></div>
              </div>
              <div class="info-item">
                <div class="icon">🕐</div>
                <div><strong>Opening hours</strong><p class="muted">${institute.hours.weekdays}<br />${institute.hours.sunday}</p></div>
              </div>
            </div>
          </div>
          <div class="card" style="background:linear-gradient(135deg,#1d4ed8,#0891b2);color:#fff;border:none">
            <h3>Free course counselling</h3>
            <p style="margin:12px 0 18px;opacity:0.9">Not sure which program fits you? Visit E+++ Solutions near Kozhikode railway station or message us on WhatsApp.</p>
            <a href="https://wa.me/${institute.whatsapp}" class="btn btn-secondary" style="background:#fff" target="_blank" rel="noopener">WhatsApp ${institute.phones[0]}</a>
          </div>
        </div>
      </div>
    </section>`;
}

const routes = {
  '/': renderHome,
  '/services': renderServices,
  '/courses': renderCourses,
  '/pricing': renderPricing,
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

function bindContactForm() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name');
    const phone = fd.get('phone');
    const interest = fd.get('interest');
    const message = fd.get('message');
    const text = encodeURIComponent(`Hello E+++ Solutions, I am ${name} (${phone}). I am interested in ${interest}. ${message || ''}`);
    window.open(`https://wa.me/${institute.whatsapp}?text=${text}`, '_blank');
    form.reset();
    showToast('Opening WhatsApp to send your enquiry...');
  });
}

function navigate() {
  const path = parseRoute();
  const render = routes[path] || renderHome;
  document.getElementById('app').innerHTML = render();
  document.title = `${path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)} | E+++ Solutions Kozhikode`;

  document.querySelectorAll('.site-nav a[data-path]').forEach((link) => {
    link.classList.toggle('active', link.dataset.path === path);
  });

  bindContactForm();
  document.getElementById('site-nav')?.classList.remove('open');
}

document.getElementById('nav-toggle')?.addEventListener('click', () => {
  document.getElementById('site-nav')?.classList.toggle('open');
});

window.addEventListener('hashchange', navigate);

if (!location.hash) location.hash = '#/';
else navigate();
