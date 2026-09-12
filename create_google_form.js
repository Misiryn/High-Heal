/**
 * High Heal / Web Project Discovery Form Generator
 * 
 * Instructions:
 * 1. Open your browser and go to: https://script.new
 * 2. Delete any code in the editor and paste this entire script.
 * 3. Click the "Save" (disk icon) and then click "Run" (▶).
 * 4. Grant Google permissions when prompted (it needs permission to create a Form in your Google Drive).
 * 5. Check the "Execution log" at the bottom: it will output your Form's Edit URL and Public Share URL!
 */

function createWebsiteDiscoveryForm() {
  const form = FormApp.create('Client Website & Web App Discovery Questionnaire');
  form.setDescription('Please complete this questionnaire to help us clarify the scope, design preferences, technical features, and timeline for your website or web application.');
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  
  // ── SECTION 1: CLIENT & BRAND BASICS ──
  const s1 = form.addPageBreakItem().setTitle('Section 1: Client & Project Overview');
  
  form.addTextItem()
    .setTitle('Your Name & Organization / Company Name')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Email Address & WhatsApp / Phone Number')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Brief Description of Your Business or Project')
    .setHelpText('What do you do, who are your primary customers, and what problem do you solve?')
    .setRequired(true);

  // ── SECTION 2: PROJECT TYPE & GOALS ──
  const s2 = form.addPageBreakItem().setTitle('Section 2: Project Type & Primary Goal');

  const qType = form.addMultipleChoiceItem();
  qType.setTitle('What type of digital product do you need?')
    .setChoiceValues([
      'Static Informational Website (Fast, company brochure/showcase, zero server cost)',
      'Content-Driven Website with CMS (Blog, news, or case studies you can update yourself without coding)',
      'Interactive Web Application (User accounts, client portal, database storage, custom workflows)',
      'E-Commerce Store (Product catalog, shopping cart, online payment gateway, order tracking)',
      'Single-Page Landing Page (One high-converting page focused on a specific service/campaign)'
    ])
    .showOtherOption(true)
    .setRequired(true);

  const qGoal = form.addCheckboxItem();
  qGoal.setTitle('What are the primary conversion goals of this website? (Select all that apply)')
    .setChoiceValues([
      'Direct WhatsApp inquiries / Phone calls',
      'Contact form email leads',
      'Direct online payments / Sales',
      'Brand credibility & digital authority',
      'Educating customers and answering FAQs'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // ── SECTION 3: SCOPE & SITEMAP ──
  const s3 = form.addPageBreakItem().setTitle('Section 3: Scope & Page Structure');

  const qPages = form.addMultipleChoiceItem();
  qPages.setTitle('Approximately how many pages do you envision?')
    .setChoiceValues([
      '1 Page (Single-page scroll with distinct sections)',
      '3 to 5 Pages (e.g., Home, About, Services, Contact)',
      '6 to 10 Pages (Detailed individual service pages, case studies, pricing, FAQ)',
      '10+ Pages / Multi-section portal'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('List the specific pages or sections you know you need')
    .setHelpText('Example: Home, Services, Team / About Doctor, Pricing, Return-to-Play, FAQ, Contact')
    .setRequired(false);

  const qCms = form.addMultipleChoiceItem();
  qCms.setTitle('Will you need to update content frequently yourself without writing code?')
    .setChoiceValues([
      'No — Content stays largely the same; updates can be handled occasionally by the developer.',
      'Yes — I need a simple admin dashboard (CMS) to publish blogs, photos, or announcements.'
    ])
    .setRequired(true);

  // ── SECTION 4: DESIGN & AESTHETIC ──
  const s4 = form.addPageBreakItem().setTitle('Section 4: Design Aesthetic & "Wow Factor"');

  const qStyle = form.addMultipleChoiceItem();
  qStyle.setTitle('What visual vibe or personality best matches your brand?')
    .setChoiceValues([
      'Ultra-Modern / Apple-Grade Tech (Dark mode, glassmorphism, glowing accents, sleek minimalism)',
      'Clean & Clinical / Corporate (Light mode, crisp white/slate, calm blues, high readability)',
      'High Energy & Bold (Vibrant colors, athletic aesthetic, large bold typography)',
      'Boutique Luxury (Understated elegance, warm tones, high-end editorial feel)'
    ])
    .showOtherOption(true)
    .setRequired(true);

  const qTheme = form.addMultipleChoiceItem();
  qTheme.setTitle('Color Theme Preference')
    .setChoiceValues([
      'Dark Mode only',
      'Light Mode only',
      'Both (with a dark/light toggle switch)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Inspirational Website Benchmarks')
    .setHelpText('Paste links to 2 or 3 websites whose design, look, or feel you love, and 1 website you dislike.')
    .setRequired(false);

  // ── SECTION 5: INTERACTIONS & CUSTOM TOOLS ──
  const s5 = form.addPageBreakItem().setTitle('Section 5: Interactivity & Custom Features');

  const qInteractions = form.addMultipleChoiceItem();
  qInteractions.setTitle('What level of animation and interaction are you looking for?')
    .setChoiceValues([
      'Clean & Subtle (Smooth hover effects, button animations, clean transitions)',
      'Interactive Widgets (Calculators, step-by-step selectors, body/pain navigators, interactive comparison tables)',
      'High-End Motion (Scroll-driven animations, 3D models, parallax effects)'
    ])
    .setRequired(true);

  const qCustomTools = form.addCheckboxItem();
  qCustomTools.setTitle('Any specific custom interactive tools needed? (Select all that apply)')
    .setChoiceValues([
      'Interactive Body Map / Pain Area Selector',
      'Health Economics / ROI Cost Savings Calculator',
      'Interactive Timeline / Clearance Milestone Tracker',
      'Filterable Service / Case Study Catalog',
      'Step-by-step Triage / Questionnaire Wizard'
    ])
    .showOtherOption(true)
    .setRequired(false);

  // ── SECTION 6: FUNCTIONALITY & INTEGRATIONS ──
  const s6 = form.addPageBreakItem().setTitle('Section 6: Functionality & Integrations');

  const qContact = form.addCheckboxItem();
  qContact.setTitle('How should visitors contact or book with you?')
    .setChoiceValues([
      'Standard contact form (emails delivered to your inbox)',
      '1-Click WhatsApp direct chat (pre-formatted messages)',
      'Automated calendar booking (Calendly, Cal.com)',
      'Direct click-to-call phone button'
    ])
    .setRequired(true);

  const qAuth = form.addMultipleChoiceItem();
  qAuth.setTitle('Do you need user accounts / logins?')
    .setChoiceValues([
      'No — All visitors see the same public website.',
      'Yes — Users/Clients need accounts to log in and view private data/reports.'
    ])
    .setRequired(true);

  const qPayments = form.addMultipleChoiceItem();
  qPayments.setTitle('Do you need to accept online payments on the website?')
    .setChoiceValues([
      'No online payments needed (all payments handled offline / in-person).',
      'Yes — UPI, Credit Cards, Netbanking (e.g., Razorpay, Stripe).'
    ])
    .setRequired(true);

  const qIntegrations = form.addCheckboxItem();
  qIntegrations.setTitle('Select any third-party integrations needed:')
    .setChoiceValues([
      'Google Maps Location Pin',
      'Google Analytics / Meta Pixel (for tracking visitors and ads)',
      'Instagram grid feed embed',
      'Newsletter / Email Marketing (Mailchimp, Substack)'
    ])
    .showOtherOption(true)
    .setRequired(false);

  // ── SECTION 7: CONTENT & ASSET READINESS ──
  const s7 = form.addPageBreakItem().setTitle('Section 7: Content & Media Readiness');

  const qLogo = form.addMultipleChoiceItem();
  qLogo.setTitle('Logo & Brand Assets status:')
    .setChoiceValues([
      'I already have an official vector logo (SVG / PNG) and brand colors.',
      'I only have a basic image/photo of the logo; it may need cleanup.',
      'I do not have a logo yet; please create a clean monogram or wordmark.'
    ])
    .setRequired(true);

  const qCopy = form.addMultipleChoiceItem();
  qCopy.setTitle('Written Content & Copywriting status:')
    .setChoiceValues([
      'I will provide all written text for every page.',
      'I have rough bullet points; I need you / AI to write polished professional text.'
    ])
    .setRequired(true);

  const qMedia = form.addMultipleChoiceItem();
  qMedia.setTitle('Photography & Visual Media status:')
    .setChoiceValues([
      'I have professional, high-resolution original photos/videos ready.',
      'I need you to source royalty-free stock imagery and create icons/illustrations.'
    ])
    .setRequired(true);

  // ── SECTION 8: DOMAIN, HOSTING, TIMELINE & BUDGET ──
  const s8 = form.addPageBreakItem().setTitle('Section 8: Hosting, Timeline & Budget');

  const qDomain = form.addMultipleChoiceItem();
  qDomain.setTitle('Domain Name status:')
    .setChoiceValues([
      'I already own the domain name (e.g., myclinic.com).',
      'I have not purchased it yet; I need advice on choosing a domain.'
    ])
    .setRequired(true);

  const qTimeline = form.addMultipleChoiceItem();
  qTimeline.setTitle('Target Launch Timeline:')
    .setChoiceValues([
      'Urgent (1 – 2 weeks)',
      'Standard (3 – 4 weeks)',
      'Flexible (1 – 2 months)'
    ])
    .setRequired(true);

  const qBudget = form.addMultipleChoiceItem();
  qBudget.setTitle('Allocated Budget Range:')
    .setChoiceValues([
      '₹25,000 – ₹50,000 (Standard static business website)',
      '₹50,000 – ₹1,50,000 (Custom interactive design, animations, CMS integration)',
      '₹1,50,000+ (Full-stack web application with database and custom portal)'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Any additional notes, requirements, or questions for our development team?')
    .setRequired(false);

  // Log outputs
  Logger.log('==============================================');
  Logger.log('🎉 GOOGLE FORM CREATED SUCCESSFULLY!');
  Logger.log('👉 EDIT URL (to edit your form):');
  Logger.log(form.getEditUrl());
  Logger.log('👉 PUBLIC SHARE URL (to send to clients):');
  Logger.log(form.getPublishedUrl());
  Logger.log('==============================================');
}
