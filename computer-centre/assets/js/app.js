const services = [
  {
    icon: '🖥️',
    title: 'Internet Café',
    desc: 'High-speed workstations with printing, scanning, and comfortable seating for students and professionals.',
    points: ['1 Gbps fiber connection', 'Private booths available', 'Hourly & daily passes'],
  },
  {
    icon: '🎓',
    title: 'Computer Training',
    desc: 'Hands-on courses from basic digital literacy to programming, design, and office productivity.',
    points: ['Certified instructors', 'Small batch sizes', 'Job-ready curriculum'],
  },
  {
    icon: '🖨️',
    title: 'Print & Scan',
    desc: 'Colour and black-and-white printing, binding, lamination, and document scanning services.',
    points: ['Same-day turnaround', 'Bulk student discounts', 'USB & cloud upload'],
  },
  {
    icon: '🔧',
    title: 'Repairs & Upgrades',
    desc: 'Diagnostics, virus removal, OS installation, RAM/SSD upgrades, and basic hardware support.',
    points: ['Free quick check-up', 'Genuine parts', 'Pickup & delivery'],
  },
  {
    icon: '💼',
    title: 'Exam & Registration',
    desc: 'Online exam registration, form filling, email setup, and government portal assistance.',
    points: ['PAN, Aadhaar, passport help', 'University applications', 'One-on-one support'],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Kids & School Support',
    desc: 'After-school computer lab access, typing practice, and project help for school students.',
    points: ['Safe supervised environment', 'Holiday camps', 'Parent progress reports'],
  },
];

const courses = [
  {
    title: 'MS Office Essentials',
    level: 'Beginner',
    duration: '4 weeks',
    mode: 'Weekday evenings',
    desc: 'Word, Excel, PowerPoint, and professional email for office and college work.',
  },
  {
    title: 'Web Development Basics',
    level: 'Intermediate',
    duration: '8 weeks',
    mode: 'Sat & Sun',
    desc: 'HTML, CSS, JavaScript fundamentals with a portfolio project at the end.',
  },
  {
    title: 'Graphic Design with Canva & Photoshop',
    level: 'Beginner',
    duration: '6 weeks',
    mode: 'Flexible batches',
    desc: 'Logos, posters, social media creatives, and print-ready designs.',
  },
  {
    title: 'Python Programming',
    level: 'Intermediate',
    duration: '10 weeks',
    mode: 'Weekday mornings',
    desc: 'Logic building, automation scripts, and intro to data analysis.',
  },
  {
    title: 'Digital Marketing',
    level: 'All levels',
    duration: '5 weeks',
    mode: 'Online + lab',
    desc: 'SEO, social media, Google Ads basics, and campaign planning.',
  },
  {
    title: 'Typing & Computer Fundamentals',
    level: 'Beginner',
    duration: '3 weeks',
    mode: 'Daily batches',
    desc: 'Keyboard mastery, file management, internet safety, and basic troubleshooting.',
  },
];

const plans = [
  {
    name: 'Hourly Pass',
    price: '$2',
    unit: '/ hour',
    features: ['Internet café access', 'Standard workstation', 'Basic printing rates'],
  },
  {
    name: 'Student Monthly',
    price: '$29',
    unit: '/ month',
    featured: true,
    features: ['40 hours lab access', '10% off printing', '1 free course consultation', 'Weekend priority seating'],
  },
  {
    name: 'Professional',
    price: '$49',
    unit: '/ month',
    features: ['Unlimited weekday access', 'Private booth 2 hrs/day', '20% off repairs', 'Course bundle discount'],
  },
];

function renderHome() {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow">Welcome to TechHub Computer Centre</div>
          <h1>Learn, connect, and get things done — all in one place.</h1>
          <p>From certified computer courses and high-speed internet access to printing, repairs, and exam support — we help students, job seekers, and small businesses every day.</p>
          <div class="hero-actions">
            <a href="#/courses" class="btn btn-primary">Browse Courses</a>
            <a href="#/contact" class="btn btn-secondary">Book a Visit</a>
          </div>
          <div class="hero-stats">
            <div><strong>5,000+</strong><span>Students trained</span></div>
            <div><strong>60+</strong><span>Workstations</span></div>
            <div><strong>4.9★</strong><span>Community rating</span></div>
          </div>
        </div>
        <div class="hero-card">
          <h3>Why families choose TechHub</h3>
          <div class="hero-list">
            <div class="hero-list-item">
              <div class="icon">✓</div>
              <div><strong>Affordable plans</strong><p class="muted">Flexible hourly, daily, and monthly memberships for every budget.</p></div>
            </div>
            <div class="hero-list-item">
              <div class="icon">✓</div>
              <div><strong>Expert trainers</strong><p class="muted">Industry-experienced instructors with practical, job-focused lessons.</p></div>
            </div>
            <div class="hero-list-item">
              <div class="icon">✓</div>
              <div><strong>Full-service centre</strong><p class="muted">Training, café, printing, repairs, and registration help under one roof.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Everything you need in a modern computer centre</h2>
          <p>Whether you are learning your first skills or running a business, TechHub has the tools and support to help you succeed.</p>
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
          <h2>Popular courses this season</h2>
          <p>New batches start every month. Limited seats — register early to secure your spot.</p>
        </div>
        <div class="grid-3">
          ${courses.slice(0, 3).map((c) => `
            <article class="card">
              <h3>${c.title}</h3>
              <p>${c.desc}</p>
              <div class="course-meta">
                <span class="tag">${c.level}</span>
                <span class="tag">${c.duration}</span>
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
          <p>Professional computer services for students, professionals, and local businesses.</p>
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
          <p>Practical, instructor-led programs designed for real-world skills and certifications.</p>
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
                <a href="#/contact" class="btn btn-primary btn-sm" style="padding:10px 16px">Enroll Now</a>
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
          <h2>Simple, transparent pricing</h2>
          <p>Choose a plan that fits your needs. Walk-ins welcome — no long-term contract required.</p>
        </div>
        <div class="grid-3">
          ${plans.map((p) => `
            <article class="card ${p.featured ? 'featured' : ''}">
              ${p.featured ? '<span class="badge">Most Popular</span>' : ''}
              <h3>${p.name}</h3>
              <div class="price">${p.price} <small>${p.unit}</small></div>
              <ul>${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
              <div style="margin-top:22px">
                <a href="#/contact" class="btn ${p.featured ? 'btn-primary' : 'btn-secondary'}">Get Started</a>
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
          <p class="muted" style="margin-bottom:24px">Book a course, reserve a workstation, or ask about our services.</p>
          <form id="contact-form">
            <div class="form-field">
              <label for="name">Full name</label>
              <input id="name" name="name" required placeholder="Your name" />
            </div>
            <div class="form-field">
              <label for="phone">Phone</label>
              <input id="phone" name="phone" required placeholder="+1 555 000 0000" />
            </div>
            <div class="form-field">
              <label for="interest">I'm interested in</label>
              <select id="interest" name="interest">
                <option>Computer course</option>
                <option>Internet café membership</option>
                <option>Printing / scanning</option>
                <option>Computer repair</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-field">
              <label for="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell us what you need..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
        <div>
          <div class="card" style="margin-bottom:24px">
            <h3 style="margin-bottom:18px">Visit us</h3>
            <div class="info-list">
              <div class="info-item">
                <div class="icon">📍</div>
                <div><strong>Address</strong><p class="muted">123 Main Street, Downtown<br />Near City Library, 2nd Floor</p></div>
              </div>
              <div class="info-item">
                <div class="icon">📞</div>
                <div><strong>Phone</strong><p class="muted">+1 (555) 012-3456<br />+1 (555) 012-3457</p></div>
              </div>
              <div class="info-item">
                <div class="icon">✉️</div>
                <div><strong>Email</strong><p class="muted">hello@techhubcc.com</p></div>
              </div>
              <div class="info-item">
                <div class="icon">🕐</div>
                <div><strong>Opening hours</strong><p class="muted">Mon – Sat: 8:00 AM – 9:00 PM<br />Sunday: 10:00 AM – 6:00 PM</p></div>
              </div>
            </div>
          </div>
          <div class="card" style="background:linear-gradient(135deg,#1d4ed8,#0891b2);color:#fff;border:none">
            <h3>Free orientation session</h3>
            <p style="margin:12px 0 18px;opacity:0.9">New students get a free 30-minute tour and skills assessment every Saturday at 11 AM.</p>
            <a href="#/contact" class="btn btn-secondary" style="background:#fff">Reserve your seat</a>
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
    form.reset();
    showToast('Thanks! We will contact you within 24 hours.');
  });
}

function navigate() {
  const path = parseRoute();
  const render = routes[path] || renderHome;
  document.getElementById('app').innerHTML = render();
  document.title = `${path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)} | TechHub Computer Centre`;

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
