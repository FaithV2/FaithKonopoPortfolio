import React, { useState, useEffect, useRef } from "react";
import Projectss from "./components/Projectss";
import profilePic from "./assets/bg1.png";
import heroBg from "./assets/bg2.png";
import skillsBg from "./assets/bg2.png";
import emailjs from "@emailjs/browser";

// Typing effect hook
const useTyping = (text, speed = 80, trigger = true) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);
  return displayed;
};

// Hook to detect if element is in viewport
const useInView = (options) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
};

// Navbar
const Nav = () => (
  <nav className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center backdrop-blur-md bg-black/40 p-3 rounded-xl shadow-lg">
    <div className="text-white font-bold text-lg md:text-xl">Faith Konopo</div>
    <div className="space-x-4 text-sm text-gray-300 hidden md:flex">
      {["home", "about", "skills", "projects", "contact"].map((item) => (
        <a
          key={item}
          href={`#${item}`}
          className="relative hover:text-pink-500 transition-all duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </a>
      ))}
    </div>
  </nav>
);

// Hero section
const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const typedTitle = useTyping("Faith Konopo", 120, inView);
  const typedSubtitle = useTyping(
    "Creative Problem Solver | Full-Stack Systems Developer, Engineer & Student",
    40,
    inView
  );

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
        <div className="max-w-2xl md:mr-10 text-center md:text-left text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500">
            {typedTitle}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="mt-4 text-gray-200 text-lg">{typedSubtitle}</p>
          <p className="mt-4 text-gray-300">
            I design and build production-ready systems and web apps. Experienced in PHP, React, TypeScript, MySQL, and system analysis. Currently a student at Botswana Accountancy College, interning at Broad Horizon Group and Africa Code Academy.  
            I am a Google GDG member and skilled in GitHub for version control and collaboration.
          </p>
          <div className="mt-6 flex gap-4 flex-wrap justify-center md:justify-start">
            <a
              className="btn bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
              href="#projects"
            >
              View Projects
            </a>
            <a
              className="btn border border-pink-500 text-pink-400 hover:text-white hover:bg-pink-500 px-6 py-2 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
              href="#contact"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="mt-10 md:mt-0 relative flex justify-center md:justify-end">
          <div className="w-48 md:w-64 h-48 md:h-64 overflow-hidden border-4 border-pink-500 shadow-xl hover:shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <img src={profilePic} alt="Faith Konopo" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Generic section with scroll-triggered typing
const Section = ({ id, title, children, bgClass = "bg-gray-900" }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const typedTitle = useTyping(title, 100, inView);

  return (
    <section ref={ref} id={id} className={`py-20 relative ${bgClass} bg-cover bg-center`}>
      {bgClass !== "bg-gray-900" && <div className="absolute inset-0 bg-black/60"></div>} 
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-pink-500 mb-6">{typedTitle}</h2>
        {children}
      </div>
    </section>
  );
};

// About content
const AboutContent = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-500 border-l-4 border-pink-500">
      <h3 className="text-pink-400 font-semibold">Education</h3>
      <p className="text-gray-400 mt-2">
        Bachelor's in Computer Systems Engineering — Botswana Accountancy College (2022 - )
      </p>
    </div>
    <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-500 border-l-4 border-purple-500">
      <h3 className="text-purple-400 font-semibold">Experience & Memberships</h3>
      <ul className="text-gray-400 mt-2 list-disc ml-5">
        <li>Software Engineer Intern — Broad Horizon Group (Feb 2025 - Present)</li>
        <li>Software Developer Intern — Africa Code Academy (Jul 2025 - Present)</li>
        <li>IT Technician Intern — Ministry of Agriculture & Animal Health (Jan - Feb 2025)</li>
        <li>Google GDG Member</li>
      </ul>
    </div>
  </div>
);

// Skills content
const SkillsContent = () => {
  const skills = ["React", "PHP", "TypeScript", "MySQL", "HTML", "CSS", "JavaScript", "System Analysis", "GitHub"];
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skills.map((skill) => (
        <span
          key={skill}
          className="bg-gray-800/60 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

// Contact content with EmailJS & WhatsApp
const ContactContent = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_qr9guoy",     
      "template_sb3agxr",    
      form.current,
      "JYTooclfwtAvhjBxB"     
    )
    .then(
      (result) => {
        setStatus("Message sent successfully!");
        form.current.reset();
      },
      (error) => {
        setStatus("Failed to send message. Please try again.");
      }
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Info section */}
      <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-500">
        <h4 className="text-pink-400 font-semibold mb-2">Get in touch</h4>
        <p className="text-gray-300">Email: <a className="text-pink-400" href="mailto:faithkonopomojanaga@gmail.com">faithkonopomojanaga@gmail.com</a></p>
        <p className="text-gray-300 mt-2">GitHub: <a className="text-pink-400" href="https://github.com/FaithMojanaga" target="_blank" rel="noreferrer">FaithMojanaga</a></p>
        <p className="text-gray-300 mt-2">LinkedIn: <a className="text-pink-400" href="https://www.linkedin.com/in/faith-konopo16" target="_blank" rel="noreferrer">Faith Konopo</a></p>
        <p className="text-gray-300 mt-4">
        </p>
      </div>

      {/* Contact form */}
      <form ref={form} onSubmit={sendEmail} className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-500">
        <label className="block text-gray-300 text-sm">Your name</label>
        <input name="name" className="w-full mt-2 p-2 rounded bg-black/20 text-white" required />

        <label className="block text-gray-300 text-sm mt-4">Your email</label>
        <input name="replyto" type="email" className="w-full mt-2 p-2 rounded bg-black/20 text-white" required />

        <label className="block text-gray-300 text-sm mt-4">Message</label>
        <textarea name="message" rows="5" className="w-full mt-2 p-2 rounded bg-black/20 text-white" required></textarea>

        {status && <p className="mt-2 text-green-400">{status}</p>}

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="submit" className="bg-pink-500 hover:bg-purple-500 text-white px-4 py-2 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
            Send Message
          </button>
          <a href="https://wa.me/26776018609" target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
            Message on WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
};

// App
export default function App() {
  return (
    <div className="text-white font-sans">
      <Nav />
      <main>
        <Hero />
        <Section id="about" title="About Me"><AboutContent /></Section>
        <Section id="skills" title="Skills" bgClass={`bg-[url(${skillsBg})]`}><SkillsContent /></Section>
        <Section id="projects" title="Projects"><Projectss /></Section>
        <Section id="contact" title="Contact"><ContactContent /></Section>
      </main>
      <footer className="py-6 text-center text-gray-400 bg-gray-900/60 backdrop-blur-sm">
        © {new Date().getFullYear()} Faith Konopo — Built with React + Tailwind
      </footer>
    </div>
  );
}
