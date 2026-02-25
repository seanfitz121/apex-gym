/**
 * APEX GYM — Complete React Web App
 * 
 * Structure mirrors a Next.js App Router project:
 *   - pages: Home, Classes, Trainers, Membership, Contact
 *   - components: Navbar, Footer, Hero, FeatureCards, About,
 *                 ClassesGrid, TrainersGrid, TrainerModal,
 *                 MembershipPlans, Testimonials, FinalCTA, ContactForm
 *   - data: trainers, classes, plans, testimonials (static JSON)
 *   - hooks: useScrollReveal, useCounter, useScrolled
 * 
 * To use as Next.js:
 *   - Split components into /src/components/
 *   - Split pages into /src/app/ route folders
 *   - Move data to /src/data/
 *   - Install: framer-motion, @fontsource/bebas-neue, @fontsource/dm-sans
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const TRAINERS = [
  {
    id: 1,
    name: "Alex Reed",
    specialty: "Strength & Power",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80&fit=crop&crop=faces",
    bio: "Former competitive powerlifter with 10+ years coaching experience. Alex has trained national-level athletes and everyday warriors alike. His programming philosophy: master the basics, then build something extraordinary.",
    certs: ["NSCA-CSCS", "USAPL Certified", "FMS Level 2"],
    ig: "#", tw: "#", li: "#",
  },
  {
    id: 2,
    name: "Mia Torres",
    specialty: "HIIT & Conditioning",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80&fit=crop&crop=faces",
    bio: "Mia brings relentless energy to every session. A former D1 track athlete turned conditioning coach, she specialises in metabolic training systems that push your ceiling — and keep it there.",
    certs: ["NASM-CPT", "CrossFit L2", "Precision Nutrition L1"],
    ig: "#", tw: "#", li: "#",
  },
  {
    id: 3,
    name: "Dara Kim",
    specialty: "Boxing & Combat",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop&crop=faces",
    bio: "With an amateur boxing record of 18-2 and a decade of coaching, Dara transforms beginners into confident fighters. Her classes combine technique, power, and a mental edge you can't find anywhere else.",
    certs: ["USA Boxing Certified", "NASM-CPT", "TRX Certified"],
    ig: "#", tw: "#", li: "#",
  },
  {
    id: 4,
    name: "Sana Patel",
    specialty: "Yoga & Mobility",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop&crop=faces",
    bio: "Sana bridges the gap between performance and recovery. A 500-hour RYT with a background in sports rehab, her classes build functional mobility that makes every other training session better.",
    certs: ["RYT 500", "NSCA-CPT", "FRC Mobility Specialist"],
    ig: "#", tw: "#", li: "#",
  },
  {
    id: 5,
    name: "Jake Müller",
    specialty: "CrossFit & Functional",
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&fit=crop&crop=faces",
    bio: "A CrossFit Games competitor turned full-time coach, Jake's WODs are designed to test everything you've got — and give you the tools to come back stronger every time.",
    certs: ["CrossFit L3", "USAW Sports Performance", "NSCA-CSCS"],
    ig: "#", tw: "#", li: "#",
  },
  {
    id: 6,
    name: "Layla Osei",
    specialty: "Endurance & Cycling",
    img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80&fit=crop&crop=faces",
    bio: "Former pro cyclist and endurance coach, Layla's spin classes are a full sensory experience. She'll have you clipping in at 5am and leaving with a grin — every time.",
    certs: ["Schwinn Cycling Certified", "NASM-CPT", "ACE Group Fitness"],
    ig: "#", tw: "#", li: "#",
  },
];

const CLASSES = [
  {
    id: 1,
    name: "Strength Training",
    category: "Strength",
    badgeColor: "#FF6B00",
    img: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=700&q=80&fit=crop",
    desc: "Progressive overload, compound lifts, periodised programming. Build raw power that lasts.",
    schedule: "Mon / Thu — 6:00 AM",
    duration: "60 min",
    level: "All Levels",
    trainer: "Alex Reed",
  },
  {
    id: 2,
    name: "HIIT",
    category: "Cardio",
    badgeColor: "#2F80ED",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80&fit=crop",
    desc: "Maximum output, minimum time. Torch calories and elevate your cardio ceiling in 45 minutes flat.",
    schedule: "Tue / Fri — 7:00 AM",
    duration: "45 min",
    level: "Intermediate",
    trainer: "Mia Torres",
  },
  {
    id: 3,
    name: "Power Yoga",
    category: "Mind-Body",
    badgeColor: "#8CC14A",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&q=80&fit=crop",
    desc: "Strength through stillness. Build flexibility, mental clarity, and functional mobility.",
    schedule: "Mon / Wed / Fri — 9:00 AM",
    duration: "60 min",
    level: "All Levels",
    trainer: "Sana Patel",
  },
  {
    id: 4,
    name: "Boxing",
    category: "Combat",
    badgeColor: "#E10600",
    img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=700&q=80&fit=crop",
    desc: "Footwork, combinations, conditioning. Train like a fighter — zero experience required.",
    schedule: "Tue / Sat — 7:30 PM",
    duration: "60 min",
    level: "All Levels",
    trainer: "Dara Kim",
  },
  {
    id: 5,
    name: "Indoor Cycling",
    category: "Cardio",
    badgeColor: "#2F80ED",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80&fit=crop",
    desc: "High-tempo rides synced to music. An immersive experience that obliterates your limits.",
    schedule: "Wed / Sat — 6:30 AM",
    duration: "45 min",
    level: "All Levels",
    trainer: "Layla Osei",
  },
  {
    id: 6,
    name: "CrossFit WOD",
    category: "Functional",
    badgeColor: "#FF6B00",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80&fit=crop",
    desc: "Constantly varied, high-intensity functional movements. The WOD doesn't care about your excuses.",
    schedule: "Mon / Wed / Fri — 5:30 PM",
    duration: "60 min",
    level: "Intermediate",
    trainer: "Jake Müller",
  },
];

const PLANS = [
  {
    name: "Basic",
    price: 39,
    period: "/month",
    featured: false,
    features: [
      { text: "Gym Floor Access", included: true },
      { text: "24/7 Entry", included: true },
      { text: "2 Group Classes/Month", included: true },
      { text: "Locker Room Access", included: true },
      { text: "Personal Training Sessions", included: false },
      { text: "Nutrition Consultation", included: false },
      { text: "Guest Passes", included: false },
    ],
  },
  {
    name: "Pro",
    price: 79,
    period: "/month",
    featured: true,
    badge: "Most Popular",
    features: [
      { text: "Gym Floor Access", included: true },
      { text: "24/7 Entry", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "Locker Room + Towel Service", included: true },
      { text: "2 PT Sessions/Month", included: true },
      { text: "Nutrition Consultation", included: true },
      { text: "2 Guest Passes/Month", included: false },
    ],
  },
  {
    name: "Elite",
    price: 139,
    period: "/month",
    featured: false,
    features: [
      { text: "Gym Floor Access", included: true },
      { text: "24/7 Entry", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "Locker Room + Towel Service", included: true },
      { text: "8 PT Sessions/Month", included: true },
      { text: "Monthly Nutrition Consultation", included: true },
      { text: "4 Guest Passes/Month", included: true },
    ],
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: "I've trained at gyms across the country. APEX is on a different level. The programming, the coaching, the energy — nothing compares.",
    name: "Marcus T.",
    role: "Member since 2022",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    id: 2,
    quote: "Lost 18kg in 5 months and gained more strength than I had in my twenties. The trainers genuinely care about your results.",
    name: "Priya S.",
    role: "Member since 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
  },
  {
    id: 3,
    quote: "The boxing classes changed everything. Came in with zero experience, now I'm competing. APEX doesn't just train bodies — it builds character.",
    name: "James O.",
    role: "Member since 2021",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    stars: 5,
  },
  {
    id: 4,
    quote: "Worth every penny of the Elite membership. My PT sessions are the highlight of my week, and the nutrition coaching is next level.",
    name: "Camille R.",
    role: "Elite Member",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
  },
  {
    id: 5,
    quote: "Been training for 15 years across three continents. APEX's facility and team are genuinely world class. I'm not going anywhere.",
    name: "Kofi A.",
    role: "Member since 2020",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    stars: 5,
  },
  {
    id: 6,
    quote: "Joined for the spin classes, stayed for everything else. Layla's sessions are an experience unlike anything else I've tried.",
    name: "Sophie V.",
    role: "Member since 2023",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    stars: 5,
  },
];

const SCHEDULE = [
  { class: "Strength Training", category: "Strength", trainer: "Alex Reed", days: "Mon / Thu", time: "6:00 AM", duration: "60 min" },
  { class: "HIIT Blast", category: "Cardio", trainer: "Mia Torres", days: "Tue / Fri", time: "7:00 AM", duration: "45 min" },
  { class: "Power Yoga", category: "Mind-Body", trainer: "Sana Patel", days: "Mon / Wed / Fri", time: "9:00 AM", duration: "60 min" },
  { class: "Boxing Fundamentals", category: "Combat", trainer: "Dara Kim", days: "Tue / Sat", time: "7:30 PM", duration: "60 min" },
  { class: "CrossFit WOD", category: "Functional", trainer: "Jake Müller", days: "Mon / Wed / Fri", time: "5:30 PM", duration: "60 min" },
  { class: "Indoor Cycling", category: "Cardio", trainer: "Layla Osei", days: "Wed / Sat", time: "6:30 AM", duration: "45 min" },
  { class: "Functional Mobility", category: "Mind-Body", trainer: "Sana Patel", days: "Sun", time: "10:00 AM", duration: "50 min" },
  { class: "Advanced Boxing", category: "Combat", trainer: "Dara Kim", days: "Thu / Sun", time: "7:00 PM", duration: "75 min" },
  { class: "Olympic Lifting", category: "Strength", trainer: "Alex Reed", days: "Tue / Sat", time: "8:00 AM", duration: "75 min" },
  { class: "Circuit Training", category: "Cardio", trainer: "Jake Müller", days: "Mon / Thu", time: "12:00 PM", duration: "45 min" },
];

const BADGE_COLORS = {
  Strength: { bg: "rgba(255,107,0,0.15)", text: "#FF6B00" },
  Cardio: { bg: "rgba(47,128,237,0.15)", text: "#2F80ED" },
  "Mind-Body": { bg: "rgba(140,193,74,0.15)", text: "#8CC14A" },
  Combat: { bg: "rgba(225,6,0,0.15)", text: "#E10600" },
  Functional: { bg: "rgba(255,107,0,0.15)", text: "#FF6B00" },
};

const FAQS = [
  { q: "Is there a joining fee?", a: "No joining fee for any plan when you sign up online. Your first week is always free — no credit card required." },
  { q: "Can I freeze my membership?", a: "Yes. Pro and Elite members can freeze their membership for up to 3 months per year at no extra cost." },
  { q: "What's included in personal training sessions?", a: "Each PT session is 60 minutes, fully customised to your goals. Your trainer will build a periodised programme and track your progress every step of the way." },
  { q: "Are the classes suitable for beginners?", a: "Absolutely. Most of our classes are marked 'All Levels' and our trainers scale workouts to every ability. There's no such thing as 'not ready enough' at APEX." },
  { q: "How do I book classes?", a: "Classes can be booked through the APEX app or at reception. Pro and Elite members get priority booking 72 hours in advance." },
];

// ─── STYLES (CSS-in-JS) ───────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; max-width: 100%; overflow-x: hidden; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    background: #0e0e0e;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    line-height: 1.6;
  }
  #root { width: 100%; display: flex; flex-direction: column; }
  main { width: 100%; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0e0e0e; }
  ::-webkit-scrollbar-thumb { background: #2F80ED; border-radius: 10px; }

  /* Nav */
  .nav-root {
    position: fixed; top: 0; left: 0; right: 0; width: 100%;
    z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 64px;
    transition: background 0.4s, padding 0.4s, backdrop-filter 0.4s, border-color 0.4s;
    border-bottom: 1px solid transparent;
  }
  .nav-root.scrolled {
    background: rgba(14,14,14,0.9);
    backdrop-filter: blur(16px);
    padding: 14px 64px;
    border-color: rgba(255,255,255,0.06);
  }
  .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 4px; color: #fff; text-decoration: none; cursor: pointer; }
  .nav-logo span { color: #2F80ED; }
  .nav-links { display: flex; align-items: center; gap: 38px; list-style: none; }
  .nav-links button {
    background: none; border: none; color: #aaa; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    transition: color 0.2s; padding: 0;
  }
  .nav-links button:hover { color: #fff; }
  .nav-cta {
    background: #2F80ED; color: #fff !important;
    padding: 10px 24px; border-radius: 9px;
    font-size: 13px; font-weight: 600; letter-spacing: 1.5px;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s !important;
    text-transform: uppercase; cursor: pointer;
  }
  .nav-cta:hover {
    background: #1a60c8 !important;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(47,128,237,0.35);
  }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
  .hamburger span { width: 24px; height: 2px; background: #fff; border-radius: 2px; display: block; transition: 0.3s; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .mobile-drawer {
    position: fixed; top: 0; right: -300px; width: 280px; height: 100vh;
    background: #141414; border-left: 1px solid #222;
    z-index: 1100; display: flex; flex-direction: column;
    padding: 90px 36px 40px; gap: 24px;
    transition: right 0.38s cubic-bezier(0.4,0,0.2,1);
  }
  .mobile-drawer.open { right: 0; }
  .mobile-drawer button {
    background: none; border: none; color: #aaa; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 500;
    letter-spacing: 2px; text-transform: uppercase; text-align: left;
    transition: color 0.2s;
  }
  .mobile-drawer button:hover { color: #2F80ED; }
  .drawer-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1050;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .drawer-overlay.open { opacity: 1; pointer-events: all; }

  /* Buttons */
  .btn-primary {
    background: #2F80ED; color: #fff;
    padding: 16px 42px; border-radius: 10px;
    font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    border: none; cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    display: inline-block; text-decoration: none;
  }
  .btn-primary:hover { background: #1a60c8; transform: translateY(-2px); box-shadow: 0 12px 36px rgba(47,128,237,0.3); }
  .btn-secondary {
    background: transparent; color: #fff;
    padding: 16px 42px; border-radius: 10px;
    font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.3); cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    display: inline-block;
  }
  .btn-secondary:hover { border-color: #2F80ED; background: rgba(47,128,237,0.1); transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: #fff;
    padding: 13px 28px; border-radius: 9px;
    font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    width: 100%;
  }
  .btn-outline:hover { border-color: #2F80ED; color: #2F80ED; }
  .btn-solid {
    background: #2F80ED; color: #fff;
    padding: 13px 28px; border-radius: 9px;
    font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    border: none; cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  .btn-solid:hover { background: #1a60c8; box-shadow: 0 8px 28px rgba(47,128,237,0.3); }

  /* Sections */
  .section { padding: 110px 0; }
  .section-alt { background: #141414; }
  .container { max-width: 1240px; margin: 0 auto; padding: 0 48px; }

  /* Typography */
  .heading-label {
    display: inline-block; font-size: 11px; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase; color: #2F80ED;
    margin-bottom: 14px;
  }
  .heading-xl {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    line-height: 0.95; letter-spacing: 3px; text-transform: uppercase;
  }
  .heading-lg {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(38px, 4.5vw, 62px);
    line-height: 0.95; letter-spacing: 2px; text-transform: uppercase;
  }
  .body-text { color: #888; font-size: 16px; line-height: 1.75; }

  /* Reveal animations */
  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  /* Hero */
  .hero {
    position: relative; width: 100vw; height: 100vh; min-height: 700px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; left: 50%; right: 50%;
    margin-left: -50vw; margin-right: -50vw;
  }
  .hero-bg {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    width: 100%; height: 100%;
    background:
      linear-gradient(170deg, rgba(47,128,237,0.1) 0%, transparent 45%),
      linear-gradient(to bottom, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.78) 100%),
      url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&fit=crop') center center / cover no-repeat;
    background-attachment: scroll;
    animation: bgZoom 14s ease-in-out infinite alternate;
  }
  @keyframes bgZoom {
    from { transform: scale(1); }
    to { transform: scale(1.07); }
  }
  .hero-content {
    position: relative; text-align: center; max-width: 940px; padding: 0 24px;
    animation: heroIn 1s ease forwards; opacity: 0; transform: translateY(28px);
  }
  @keyframes heroIn { to { opacity: 1; transform: translateY(0); } }
  .hero-pill {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
    color: #2F80ED; border: 1px solid rgba(47,128,237,0.4); padding: 7px 18px;
    border-radius: 30px; margin-bottom: 24px;
    background: rgba(47,128,237,0.07);
  }
  .hero-pill::before { content: '●'; font-size: 8px; animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  .hero-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(80px, 13vw, 160px);
    line-height: 0.88; letter-spacing: 5px; text-transform: uppercase;
    color: #fff; margin-bottom: 22px;
  }
  .hero-h1 em { color: #2F80ED; font-style: normal; }
  .hero-sub {
    font-size: 15px; color: #aaa; letter-spacing: 5px; text-transform: uppercase;
    font-weight: 300; margin-bottom: 50px;
  }
  .hero-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .hero-scroll {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    color: #555; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    animation: scrollBounce 2.5s ease-in-out infinite;
  }
  .hero-scroll::before {
    content: ''; width: 1px; height: 44px;
    background: linear-gradient(to bottom, transparent, #2F80ED); display: block;
  }
  @keyframes scrollBounce {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  /* Feature Cards */
  .features-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
  .feature-card {
    background: #1a1a1a; border: 1px solid #252525; border-radius: 16px;
    padding: 34px 26px; display: flex; flex-direction: column; gap: 14px;
    cursor: default; transition: transform 0.28s, border-color 0.28s, box-shadow 0.28s;
  }
  .feature-card:hover { transform: translateY(-7px) scale(1.01); border-color: #2F80ED; box-shadow: 0 22px 60px rgba(47,128,237,0.1); }
  .feature-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(47,128,237,0.1); border: 1px solid rgba(47,128,237,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .feature-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; text-transform: uppercase; }
  .feature-desc { color: #666; font-size: 14px; line-height: 1.65; }

  /* About */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center; }
  .about-img-wrap {
    position: relative; border-radius: 20px; overflow: hidden;
    box-shadow: 30px 30px 0 -4px rgba(47,128,237,0.08), 30px 30px 0 -3px rgba(47,128,237,0.2);
  }
  .about-img-wrap img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; filter: contrast(1.05) brightness(0.95); }
  .about-accent { width: 52px; height: 3px; background: #2F80ED; border-radius: 2px; margin: 20px 0 26px; }
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 42px; }
  .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 52px; line-height: 1; color: #2F80ED; letter-spacing: 1px; }
  .stat-label { font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; color: #555; margin-top: 5px; }

  /* Classes */
  .classes-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
  .class-card {
    background: #1a1a1a; border: 1px solid #252525; border-radius: 16px;
    overflow: hidden; cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  }
  .class-card:hover { transform: translateY(-9px); box-shadow: 0 28px 70px rgba(0,0,0,0.5); border-color: #2F80ED; }
  .class-img-wrap { overflow: hidden; }
  .class-img { width: 100%; height: 215px; object-fit: cover; display: block; transition: transform 0.38s, filter 0.38s; filter: brightness(0.85); }
  .class-card:hover .class-img { transform: scale(1.05); filter: brightness(1); }
  .class-body { padding: 22px 24px 28px; }
  .class-category { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; display: block; }
  .class-name { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .class-desc { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
  .class-meta { display: flex; gap: 16px; flex-wrap: wrap; }
  .class-meta-item { font-size: 12px; color: #555; letter-spacing: 1px; text-transform: uppercase; }
  .class-meta-item span { color: #888; }

  /* Trainers */
  .trainers-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
  .trainer-card {
    background: #1a1a1a; border: 1px solid #252525; border-radius: 16px;
    overflow: hidden; cursor: pointer;
    transition: transform 0.28s, border-color 0.28s;
  }
  .trainer-card:hover { transform: translateY(-7px); border-color: #2F80ED; }
  .trainer-img-wrap { position: relative; overflow: hidden; }
  .trainer-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; filter: grayscale(30%); transition: filter 0.35s, transform 0.35s; }
  .trainer-card:hover .trainer-img { filter: grayscale(0); transform: scale(1.04); }
  .trainer-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(14,14,14,0.92) 0%, transparent 50%);
    display: flex; align-items: flex-end; padding: 20px;
    opacity: 0; transition: opacity 0.28s;
  }
  .trainer-card:hover .trainer-overlay { opacity: 1; }
  .trainer-info { padding: 18px 20px 22px; }
  .trainer-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1px; text-transform: uppercase; }
  .trainer-specialty { font-size: 12px; color: #2F80ED; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }

  /* Modal */
  .modal-bg {
    position: fixed; inset: 0; background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px); z-index: 2000;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
    padding: 24px;
  }
  .modal-bg.open { opacity: 1; pointer-events: all; }
  .modal-box {
    background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 22px;
    max-width: 620px; width: 100%; overflow: hidden;
    transform: scale(0.9) translateY(20px); transition: transform 0.35s ease;
    position: relative; max-height: 90vh; overflow-y: auto;
  }
  .modal-bg.open .modal-box { transform: scale(1) translateY(0); }
  .modal-img { width: 100%; height: 270px; object-fit: cover; object-position: top; }
  .modal-body { padding: 30px 36px 40px; }
  .modal-close {
    position: absolute; top: 16px; right: 16px;
    background: rgba(0,0,0,0.6); border: 1px solid #333; color: #fff;
    width: 38px; height: 38px; border-radius: 50%; cursor: pointer;
    font-size: 18px; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s; z-index: 10;
  }
  .modal-close:hover { background: #2F80ED; border-color: #2F80ED; }
  .modal-name { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 2px; text-transform: uppercase; }
  .modal-specialty { font-size: 12px; color: #2F80ED; letter-spacing: 3px; text-transform: uppercase; margin: 4px 0 20px; }
  .modal-bio { color: #999; font-size: 15px; line-height: 1.8; margin-bottom: 22px; }
  .cert-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .cert-tag {
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    background: rgba(47,128,237,0.1); border: 1px solid rgba(47,128,237,0.25);
    color: #2F80ED; padding: 5px 14px; border-radius: 20px;
  }
  .modal-social { display: flex; gap: 10px; }
  .modal-social-btn {
    width: 40px; height: 40px; border: 1px solid #2a2a2a; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px; cursor: pointer; background: none;
    color: #666; transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .modal-social-btn:hover { border-color: #2F80ED; color: #fff; background: #2F80ED; }

  /* Plans */
  .plans-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; align-items: center; }
  .plan-card {
    background: #1a1a1a; border: 1px solid #252525; border-radius: 20px;
    padding: 38px 34px; transition: transform 0.3s;
  }
  .plan-card:hover { transform: translateY(-5px); }
  .plan-card.featured {
    background: #1e1e1e; border-color: #2F80ED;
    box-shadow: 0 0 70px rgba(47,128,237,0.15);
    transform: scale(1.04);
    position: relative;
  }
  .plan-card.featured:hover { transform: scale(1.04) translateY(-5px); }
  .plan-badge-top {
    display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; background: #2F80ED; color: #fff;
    padding: 5px 16px; border-radius: 20px; margin-bottom: 20px;
  }
  .plan-name { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 14px; }
  .plan-price { font-family: 'Bebas Neue', sans-serif; font-size: 72px; line-height: 1; letter-spacing: 1px; }
  .plan-price sub { font-size: 26px; color: #666; vertical-align: top; margin-top: 16px; display: inline-block; font-family: 'DM Sans', sans-serif; font-weight: 300; }
  .plan-period { color: #555; font-size: 14px; margin-bottom: 28px; margin-top: 4px; }
  .plan-divider { height: 1px; background: #252525; margin: 22px 0; }
  .plan-features { list-style: none; display: flex; flex-direction: column; gap: 13px; margin-bottom: 32px; }
  .plan-feature { display: flex; gap: 12px; align-items: flex-start; font-size: 14px; line-height: 1.45; }
  .plan-feature.on { color: #ccc; }
  .plan-feature.off { color: #444; }
  .plan-feature-icon { flex-shrink: 0; margin-top: 1px; font-weight: 700; font-size: 14px; }
  .plan-feature.on .plan-feature-icon { color: #2F80ED; }
  .plan-feature.off .plan-feature-icon { color: #333; }

  /* Testimonials */
  .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
  .testi-card {
    background: #1a1a1a; border: 1px solid #252525; border-radius: 16px;
    padding: 30px 26px; transition: border-color 0.25s, transform 0.25s;
  }
  .testi-card:hover { border-color: #2F80ED; transform: translateY(-4px); }
  .testi-stars { color: #2F80ED; font-size: 15px; letter-spacing: 3px; margin-bottom: 16px; }
  .testi-quote { color: #999; font-size: 14px; line-height: 1.8; margin-bottom: 22px; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 14px; }
  .testi-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 2px solid #2F80ED; }
  .testi-name { font-weight: 600; font-size: 15px; }
  .testi-role { color: #555; font-size: 12px; margin-top: 2px; letter-spacing: 1px; }

  /* Final CTA */
  .final-cta {
    text-align: center; padding: 130px 0;
    background: linear-gradient(135deg, #0e1c2f 0%, #0e0e0e 60%);
    border-top: 1px solid #1a1a1a; position: relative; overflow: hidden;
  }
  .final-cta::before {
    content: ''; position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 800px; height: 500px;
    background: radial-gradient(ellipse, rgba(47,128,237,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 9vw, 110px); line-height: 0.92; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 22px; }
  .cta-sub { color: #666; font-size: 17px; max-width: 420px; margin: 0 auto 48px; }

  /* Footer */
  footer { background: #141414; border-top: 1px solid #1e1e1e; padding: 68px 0 36px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 52px; margin-bottom: 52px; }
  .footer-logo-txt { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 4px; cursor: pointer; }
  .footer-logo-txt span { color: #2F80ED; }
  .footer-tagline { color: #444; font-size: 14px; line-height: 1.75; max-width: 260px; margin-top: 14px; }
  .footer-col h4 { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #fff; margin-bottom: 20px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 11px; }
  .footer-links button { background: none; border: none; color: #555; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; text-align: left; padding: 0; transition: color 0.2s; }
  .footer-links button:hover { color: #2F80ED; }
  .footer-info-item { color: #555; font-size: 14px; line-height: 1.7; }
  .footer-info-item strong { color: #777; display: block; margin-bottom: 2px; }
  .footer-social { display: flex; gap: 10px; margin-top: 20px; }
  .footer-social-btn {
    width: 40px; height: 40px; border: 1px solid #252525; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; font-size: 16px;
    background: none; color: #555; cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .footer-social-btn:hover { border-color: #2F80ED; color: #fff; background: #2F80ED; }
  .footer-bottom { border-top: 1px solid #1e1e1e; padding-top: 28px; display: flex; justify-content: space-between; align-items: center; color: #444; font-size: 13px; }
  .footer-bottom span { display: flex; align-items: center; gap: 6px; }

  /* Page hero */
  .page-hero { padding: 150px 0 80px; background: #141414; border-bottom: 1px solid #1e1e1e; }
  .page-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px, 8vw, 100px); line-height: 0.92; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 14px; }
  .page-hero-sub { color: #666; font-size: 17px; max-width: 500px; }

  /* Schedule table */
  .schedule-table { width: 100%; border-collapse: collapse; margin-top: 36px; }
  .schedule-table th { text-align: left; padding: 13px 18px; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #555; border-bottom: 1px solid #1e1e1e; white-space: nowrap; }
  .schedule-table td { padding: 16px 18px; border-bottom: 1px solid rgba(30,30,30,0.7); color: #aaa; font-size: 14px; vertical-align: middle; }
  .schedule-table tr:hover td { background: rgba(255,255,255,0.02); }
  .schedule-badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; white-space: nowrap; }

  /* FAQ */
  .faq-item { background: #1a1a1a; border: 1px solid #252525; border-radius: 13px; overflow: hidden; margin-bottom: 10px; }
  .faq-q { width: 100%; padding: 20px 24px; background: none; border: none; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; transition: color 0.2s; }
  .faq-q:hover { color: #2F80ED; }
  .faq-icon { font-size: 22px; color: #2F80ED; flex-shrink: 0; transition: transform 0.3s; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-answer { color: #666; font-size: 15px; line-height: 1.75; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding 0.35s; padding: 0 24px; }
  .faq-answer.open { max-height: 200px; padding: 0 24px 20px; }

  /* Contact */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; align-items: start; }
  .contact-item { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 28px; }
  .contact-icon { width: 46px; height: 46px; border-radius: 12px; background: rgba(47,128,237,0.1); border: 1px solid rgba(47,128,237,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .contact-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #555; margin-bottom: 4px; }
  .contact-val { font-size: 15px; color: #999; line-height: 1.6; }
  .form-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
  .form-field label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #555; }
  .form-field input, .form-field textarea, .form-field select {
    background: #1a1a1a; border: 1px solid #252525; border-radius: 10px;
    color: #fff; font-family: 'DM Sans', sans-serif; font-size: 15px;
    padding: 13px 16px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%;
  }
  .form-field input:focus, .form-field textarea:focus, .form-field select:focus {
    border-color: #2F80ED; box-shadow: 0 0 0 3px rgba(47,128,237,0.12);
  }
  .form-field textarea { min-height: 120px; resize: vertical; }
  .form-field select option { background: #1a1a1a; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-success { background: rgba(47,128,237,0.1); border: 1px solid rgba(47,128,237,0.3); border-radius: 12px; padding: 20px 24px; color: #2F80ED; font-size: 15px; margin-top: 8px; display: flex; align-items: center; gap: 12px; }

  /* Responsive */
  @media (max-width: 1100px) {
    .features-grid { grid-template-columns: repeat(2,1fr); }
    .trainers-grid { grid-template-columns: repeat(2,1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
  }
  @media (max-width: 860px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .nav-root { padding: 18px 28px !important; }
    .container { padding: 0 24px; }
    .section { padding: 72px 0; }
    .about-grid { grid-template-columns: 1fr; gap: 44px; }
    .classes-grid { grid-template-columns: 1fr 1fr; }
    .plans-grid { grid-template-columns: 1fr; }
    .plan-card.featured { transform: none; }
    .testi-grid { grid-template-columns: 1fr 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 44px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
    .form-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .hero-h1 { font-size: 72px; }
    .classes-grid { grid-template-columns: 1fr; }
    .trainers-grid { grid-template-columns: 1fr 1fr; }
    .testi-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
    .schedule-table { font-size: 13px; }
    .schedule-table td, .schedule-table th { padding: 12px 10px; }
  }
  @media (max-width: 440px) {
    .trainers-grid { grid-template-columns: 1fr; }
  }
`;

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          setCount(Math.floor(start));
          if (start >= target) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ currentPage, setPage }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const nav = ["Home", "Classes", "Trainers", "Membership", "Contact"];

  return (
    <>
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => setPage("home")}>
          APEX<span>.</span>
        </div>
        <ul className="nav-links">
          {nav.map((n) => (
            <li key={n}>
              <button
                onClick={() => setPage(n.toLowerCase())}
                style={{ color: currentPage === n.toLowerCase() ? "#fff" : "" }}
              >
                {n}
              </button>
            </li>
          ))}
          <li>
            <button className="nav-cta" onClick={() => setPage("membership")}>
              Join Now
            </button>
          </li>
        </ul>
        <button className={`hamburger${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`drawer-overlay${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <div className={`mobile-drawer${open ? " open" : ""}`}>
        {nav.map((n) => (
          <button key={n} onClick={() => { setPage(n.toLowerCase()); setOpen(false); }}>
            {n}
          </button>
        ))}
        <button
          onClick={() => { setPage("membership"); setOpen(false); }}
          style={{ color: "#2F80ED", marginTop: "10px" }}
        >
          Join Now →
        </button>
      </div>
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-txt" onClick={() => setPage("home")}>
              APEX<span>.</span>
            </div>
            <p className="footer-tagline">
              Premium fitness for those who demand more. Train with elite coaches, world-class equipment, and a community that pushes you forward.
            </p>
            <div className="footer-social">
              {["𝕏", "📷", "📘", "▶"].map((icon, i) => (
                <button key={i} className="footer-social-btn">{icon}</button>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul className="footer-links">
              {["Home", "Classes", "Trainers", "Membership", "Contact"].map((n) => (
                <li key={n}>
                  <button onClick={() => setPage(n.toLowerCase())}>{n}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hours</h4>
            <div className="footer-info-item">
              <strong>Mon – Fri</strong>5:00 AM – 11:00 PM
            </div>
            <div className="footer-info-item" style={{ marginTop: 14 }}>
              <strong>Saturday</strong>6:00 AM – 9:00 PM
            </div>
            <div className="footer-info-item" style={{ marginTop: 14 }}>
              <strong>Sunday</strong>7:00 AM – 8:00 PM
            </div>
          </div>
          <div className="footer-col">
            <h4>Find Us</h4>
            <div className="footer-info-item">
              <strong>Address</strong>
              14 Performance Way<br />
              Dublin 2, D02 XY12
            </div>
            <div className="footer-info-item" style={{ marginTop: 16 }}>
              <strong>Contact</strong>
              hello@apexgym.ie<br />
              +353 1 234 5678
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 APEX Gym. All rights reserved.</span>
          <span style={{ color: "#333" }}>Built for performance.</span>
        </div>
      </div>
    </footer>
  );
}

function TrainerModal({ trainer, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={`modal-bg${trainer ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      {trainer && (
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>✕</button>
          <img src={trainer.img} alt={trainer.name} className="modal-img" />
          <div className="modal-body">
            <div className="modal-name">{trainer.name}</div>
            <div className="modal-specialty">{trainer.specialty}</div>
            <p className="modal-bio">{trainer.bio}</p>
            <div className="cert-tags">
              {trainer.certs.map((c) => <span key={c} className="cert-tag">{c}</span>)}
            </div>
            <div className="modal-social">
              {["𝕏", "📷", "in"].map((icon, i) => (
                <button key={i} className="modal-social-btn">{icon}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }) {
  const [count, ref] = useCounter(target);
  return <div className="stat-num" ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

function HomePage({ setPage }) {
  useReveal();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-pill">Premium Fitness Club</div>
          <h1 className="hero-h1">
            Push Your<br /><em>Limits</em>
          </h1>
          <p className="hero-sub">Strength &nbsp;·&nbsp; Endurance &nbsp;·&nbsp; Performance</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => setPage("membership")}>
              Start Your Trial
            </button>
            <button className="btn-secondary" onClick={() => setPage("classes")}>
              View Classes
            </button>
          </div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* FEATURES */}
      <section className="section section-alt">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: "⚡", title: "24/7 Access", desc: "Train on your schedule. Our doors never close — no restrictions, no excuses." },
              { icon: "🏋️", title: "Certified Trainers", desc: "12 elite coaches specialised across every discipline, dedicated to your goals." },
              { icon: "💪", title: "Modern Equipment", desc: "Train with elite-level equipment built for performance across every discipline." },
              { icon: "🔥", title: "Group Classes", desc: "40+ weekly sessions from HIIT to boxing. Community energy that drives results." },
            ].map((f, i) => (
              <div key={f.title} className="feature-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="reveal-left">
              <div className="about-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80&fit=crop&crop=faces"
                  alt="Training at Apex Gym"
                />
              </div>
            </div>
            <div className="reveal-right">
              <span className="heading-label">Our Story</span>
              <h2 className="heading-xl">Built For<br />Performance</h2>
              <div className="about-accent" />
              <p className="body-text">
                APEX was built for athletes who refuse to settle. From first-time lifters to competitive athletes, every inch of our 10,000 sq ft facility was designed with one purpose: results.
              </p>
              <p className="body-text" style={{ marginTop: 16 }}>
                Our coaching staff don't follow trends — they set them. Your goals become ours.
              </p>
              <div className="stats-grid">
                <div>
                  <Counter target={1500} suffix="+" />
                  <div className="stat-label">Members</div>
                </div>
                <div>
                  <Counter target={40} suffix="+" />
                  <div className="stat-label">Weekly Classes</div>
                </div>
                <div>
                  <Counter target={12} />
                  <div className="stat-label">Elite Trainers</div>
                </div>
                <div>
                  <div className="stat-num">10K<span style={{ fontSize: 22, color: "#555", fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}> sqft</span></div>
                  <div className="stat-label">Facility</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSES PREVIEW */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
            <div>
              <span className="heading-label">What We Offer</span>
              <h2 className="heading-xl">Choose Your<br />Discipline</h2>
            </div>
            <button className="btn-secondary" style={{ padding: "13px 28px", fontSize: 13 }} onClick={() => setPage("classes")}>
              All Classes →
            </button>
          </div>
          <div className="classes-grid">
            {CLASSES.slice(0, 3).map((c, i) => (
              <div key={c.id} className="class-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="class-img-wrap">
                  <img className="class-img" src={c.img} alt={c.name} />
                </div>
                <div className="class-body">
                  <span className="class-category" style={{ color: c.badgeColor }}>{c.category}</span>
                  <div className="class-name">{c.name}</div>
                  <div className="class-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS PREVIEW */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
            <div>
              <span className="heading-label">Meet the Team</span>
              <h2 className="heading-xl">Elite<br />Coaches</h2>
            </div>
            <button className="btn-secondary" style={{ padding: "13px 28px", fontSize: 13 }} onClick={() => setPage("trainers")}>
              All Trainers →
            </button>
          </div>
          <TrainersSection trainers={TRAINERS.slice(0, 3)} />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="heading-label">Real Results</span>
            <h2 className="heading-xl">What Members Say</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.slice(0, 6).map((t, i) => (
              <div key={t.id} className="testi-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="testi-stars">{"★".repeat(t.stars)}</div>
                <div className="testi-quote">"{t.quote}"</div>
                <div className="testi-author">
                  <img className="testi-avatar" src={t.avatar} alt={t.name} />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="final-cta">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="heading-label">Limited Spots Available</span>
          <h2 className="cta-headline">Ready to Get<br />Started?</h2>
          <p className="cta-sub">Your first week is on us. No contracts, no pressure — just results.</p>
          <button className="btn-primary" style={{ fontSize: 15, padding: "18px 56px" }} onClick={() => setPage("membership")}>
            Claim Free Trial
          </button>
        </div>
      </div>
    </>
  );
}

function TrainersSection({ trainers, showModal }) {
  useReveal();
  return (
    <div className="trainers-grid">
      {trainers.map((t, i) => (
        <div key={t.id} className="trainer-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
          <div className="trainer-img-wrap">
            <img className="trainer-img" src={t.img} alt={t.name} />
            <div className="trainer-overlay">
              <button
                className="btn-solid"
                style={{ fontSize: 12, letterSpacing: 2, padding: "10px 20px" }}
                onClick={() => showModal && showModal(t)}
              >
                View Bio
              </button>
            </div>
          </div>
          <div className="trainer-info">
            <div className="trainer-name">{t.name}</div>
            <div className="trainer-specialty">{t.specialty}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClassesPage({ setPage }) {
  useReveal();
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Strength", "Cardio", "Mind-Body", "Combat", "Functional"];
  const filtered = activeFilter === "All" ? CLASSES : CLASSES.filter((c) => c.category === activeFilter);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="heading-label">Train Hard, Train Smart</span>
          <div className="page-hero-title">Our Classes</div>
          <p className="page-hero-sub">40+ weekly sessions across every discipline. Find the class that challenges you.</p>
        </div>
      </section>

      {/* Schedule */}
      <section className="section">
        <div className="container">
          <span className="heading-label">Timetable</span>
          <h2 className="heading-lg" style={{ marginBottom: 0 }}>Weekly Schedule</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Category</th>
                  <th>Trainer</th>
                  <th>Days</th>
                  <th>Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row, i) => {
                  const bc = BADGE_COLORS[row.category] || BADGE_COLORS.Strength;
                  return (
                    <tr key={i}>
                      <td style={{ color: "#ccc", fontWeight: 500 }}>{row.class}</td>
                      <td>
                        <span className="schedule-badge" style={{ background: bc.bg, color: bc.text }}>
                          {row.category}
                        </span>
                      </td>
                      <td>{row.trainer}</td>
                      <td>{row.days}</td>
                      <td>{row.time}</td>
                      <td>{row.duration}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="section section-alt">
        <div className="container">
          <span className="heading-label">All Disciplines</span>
          <h2 className="heading-lg">Choose Your Path</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "28px 0 44px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "8px 20px", borderRadius: 30, fontSize: 12, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
                  transition: "0.2s", fontFamily: "'DM Sans',sans-serif",
                  background: activeFilter === cat ? "#2F80ED" : "transparent",
                  color: activeFilter === cat ? "#fff" : "#666",
                  border: activeFilter === cat ? "1px solid #2F80ED" : "1px solid #252525",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="classes-grid">
            {filtered.map((c, i) => (
              <div key={c.id} className="class-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="class-img-wrap">
                  <img className="class-img" src={c.img} alt={c.name} />
                </div>
                <div className="class-body">
                  <span className="class-category" style={{ color: c.badgeColor }}>{c.category}</span>
                  <div className="class-name">{c.name}</div>
                  <div className="class-desc">{c.desc}</div>
                  <div className="class-meta">
                    <div className="class-meta-item">⏱ <span>{c.duration}</span></div>
                    <div className="class-meta-item">📍 <span>{c.trainer}</span></div>
                    <div className="class-meta-item">🎯 <span>{c.level}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="final-cta">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="heading-label">Start Today</span>
          <h2 className="cta-headline">Ready to Train?</h2>
          <p className="cta-sub">Join APEX and access every class on your schedule.</p>
          <button className="btn-primary" style={{ fontSize: 15, padding: "18px 56px" }} onClick={() => setPage("membership")}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

function TrainersPage({ setPage }) {
  const [modal, setModal] = useState(null);
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="heading-label">The Coaching Staff</span>
          <div className="page-hero-title">Meet Our<br />Trainers</div>
          <p className="page-hero-sub">12 elite coaches, each dedicated to pushing your performance to the next level.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trainers-grid">
            {TRAINERS.map((t, i) => (
              <div key={t.id} className="trainer-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="trainer-img-wrap">
                  <img className="trainer-img" src={t.img} alt={t.name} />
                  <div className="trainer-overlay">
                    <button
                      className="btn-solid"
                      style={{ fontSize: 12, letterSpacing: 2, padding: "10px 20px" }}
                      onClick={() => setModal(t)}
                    >
                      View Bio
                    </button>
                  </div>
                </div>
                <div className="trainer-info">
                  <div className="trainer-name">{t.name}</div>
                  <div className="trainer-specialty">{t.specialty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials on trainer page */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="heading-label">Trainer Reviews</span>
            <h2 className="heading-xl">What Members Say<br />About Our Coaches</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={t.id} className="testi-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="testi-stars">{"★".repeat(t.stars)}</div>
                <div className="testi-quote">"{t.quote}"</div>
                <div className="testi-author">
                  <img className="testi-avatar" src={t.avatar} alt={t.name} />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="final-cta">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="heading-label">Book a Session</span>
          <h2 className="cta-headline">Train With<br />The Best</h2>
          <p className="cta-sub">PT sessions are available on Pro and Elite plans.</p>
          <button className="btn-primary" style={{ fontSize: 15, padding: "18px 56px" }} onClick={() => setPage("membership")}>
            View Plans
          </button>
        </div>
      </div>

      <TrainerModal trainer={modal} onClose={() => setModal(null)} />
    </>
  );
}

function MembershipPage() {
  const [openFaq, setOpenFaq] = useState(null);
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="heading-label">Invest in Yourself</span>
          <div className="page-hero-title">Membership<br />Plans</div>
          <p className="page-hero-sub">Simple, transparent pricing. No joining fees. Cancel anytime.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="heading-label">Pricing</span>
            <h2 className="heading-xl">Choose Your Plan</h2>
          </div>
          <div className="plans-grid">
            {PLANS.map((plan, i) => (
              <div key={plan.name} className={`plan-card reveal${plan.featured ? " featured" : ""}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                {plan.badge && <div className="plan-badge-top">{plan.badge}</div>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">
                  <sub>€</sub>{plan.price}
                </div>
                <div className="plan-period">per month · billed monthly</div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  {plan.features.map((f) => (
                    <li key={f.text} className={`plan-feature ${f.included ? "on" : "off"}`}>
                      <span className="plan-feature-icon">{f.included ? "✓" : "—"}</span>
                      {f.text}
                    </li>
                  ))}
                </ul>
                {plan.featured ? (
                  <button className="btn-solid">Get Started</button>
                ) : (
                  <button className="btn-outline">Choose {plan.name}</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free trial strip */}
      <div style={{ background: "rgba(47,128,237,0.06)", borderTop: "1px solid rgba(47,128,237,0.15)", borderBottom: "1px solid rgba(47,128,237,0.15)", padding: "40px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 2, textTransform: "uppercase" }}>
              Not Sure Yet? Try <span style={{ color: "#2F80ED" }}>One Week Free</span>
            </h3>
            <p style={{ color: "#666", fontSize: 15, marginTop: 6 }}>No credit card required. Full access to the facility and classes.</p>
          </div>
          <button className="btn-primary" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
            Claim Free Trial
          </button>
        </div>
      </div>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 780 }}>
          <div style={{ marginBottom: 48 }}>
            <span className="heading-label">Got Questions?</span>
            <h2 className="heading-xl">FAQ</h2>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className={`faq-icon${openFaq === i ? " open" : ""}`}>+</span>
              </button>
              <div className={`faq-answer${openFaq === i ? " open" : ""}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="heading-label">Get in Touch</span>
          <div className="page-hero-title">Contact Us</div>
          <p className="page-hero-sub">Questions, bookings, or just want to say hello — we're here.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal-left">
              <span className="heading-label">Find Us</span>
              <h2 className="heading-lg" style={{ marginBottom: 32 }}>We'd Love<br />to Hear<br />From You</h2>
              {[
                { icon: "📍", label: "Address", val: "14 Performance Way\nDublin 2, D02 XY12" },
                { icon: "📞", label: "Phone", val: "+353 1 234 5678" },
                { icon: "📧", label: "Email", val: "hello@apexgym.ie" },
                { icon: "🕐", label: "Hours", val: "Mon–Fri: 5am–11pm\nSat: 6am–9pm · Sun: 7am–8pm" },
              ].map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div className="contact-label">{item.label}</div>
                    <div className="contact-val" style={{ whiteSpace: "pre-line" }}>{item.val}</div>
                  </div>
                </div>
              ))}
              {/* Map placeholder */}
              <div style={{
                marginTop: 8, borderRadius: 14, overflow: "hidden",
                border: "1px solid #252525", height: 200,
                background: "linear-gradient(135deg, #1a1a1a 0%, #141414 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3,
              }}>
                📍 MAP PLACEHOLDER
              </div>
            </div>
            <div className="reveal-right">
              <span className="heading-label">Send a Message</span>
              <h2 className="heading-lg" style={{ marginBottom: 32 }}>Start the<br />Conversation</h2>
              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label>First Name</label>
                      <input required placeholder="Alex" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-field">
                      <label>Email</label>
                      <input required type="email" placeholder="alex@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Phone (optional)</label>
                      <input placeholder="+353 000 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div className="form-field">
                      <label>I'm interested in</label>
                      <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                        <option value="">Select…</option>
                        <option>Membership</option>
                        <option>Personal Training</option>
                        <option>Group Classes</option>
                        <option>Free Trial</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Message</label>
                    <textarea placeholder="Tell us what you're looking for…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: 8, width: "100%", justifyContent: "center" }}>
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="form-success">
                  ✅ &nbsp; Message sent! We'll be in touch within 24 hours.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  const handleSetPage = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Inject global CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home":       return <HomePage setPage={handleSetPage} />;
      case "classes":    return <ClassesPage setPage={handleSetPage} />;
      case "trainers":   return <TrainersPage setPage={handleSetPage} />;
      case "membership": return <MembershipPage />;
      case "contact":    return <ContactPage />;
      default:           return <HomePage setPage={handleSetPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={page} setPage={handleSetPage} />
      <main>{renderPage()}</main>
      <Footer setPage={handleSetPage} />
    </>
  );
}
