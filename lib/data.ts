export const personalInfo = {
  name: "Jhon Tajumbina",
  title: "Full-Stack Developer | React · Express · Laravel",
  email: "jhon.tajumbina@email.com",
  linkedin: "https://linkedin.com/in/jhontajumbina",
  github: "https://github.com/jhontajumbina",
};

export const projects = [
  {
    id: 1,
    name: "Sistema de Gestión de Egresados",
    nameEn: "Graduate Management System",
    description: "Plataforma completa para gestionar egresados de institución educativa con autenticación, perfiles y estadísticas.",
    descriptionEn: "Complete platform to manage graduates from an educational institution with authentication, profiles, and analytics.",
    technologies: ["React", "Express.js", "MySQL", "Tailwind CSS"],
    image: "/project-egresados.jpg",
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    name: "Sistema de Login con JWT",
    nameEn: "JWT Authentication System",
    description: "API REST segura con autenticación JWT, registro de usuarios, recuperación de contraseña y protección de rutas.",
    descriptionEn: "Secure REST API with JWT authentication, user registration, password recovery, and protected routes.",
    technologies: ["Node.js", "Express", "JWT", "Bcrypt"],
    image: "/project-jwt.jpg",
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    name: "CRUD React + Tailwind",
    nameEn: "React + Tailwind CRUD",
    description: "Aplicación de gestión de tareas con operaciones CRUD completas, diseño responsive y animaciones.",
    descriptionEn: "Task management app with complete CRUD operations, responsive design, and animations.",
    technologies: ["React", "Tailwind CSS", "LocalStorage"],
    image: "/project-crud.jpg",
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    name: "Proyecto de Redes",
    nameEn: "Networking Project",
    description: "Configuración y gestión de redes corporativas con servidores, VLANs y monitoreo de tráfico.",
    descriptionEn: "Setup and management of enterprise networks with servers, VLANs, and traffic monitoring.",
    technologies: ["Cisco Packet Tracer", "Linux Server", "VPN"],
    image: "/project-redes.jpg",
    demo: "#",
    github: "#",
  },
];

export const skills = {
  frontend: [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "JavaScript", icon: "📜" },
    { name: "TypeScript", icon: "🔷" },
  ],
  backend: [
    { name: "Express.js", icon: "🚀" },
    { name: "Laravel", icon: "🔶" },
    { name: "Node.js", icon: "🟢" },
    { name: "MySQL/MariaDB", icon: "🗄️" },
    { name: "JWT", icon: "🔐" },
  ],
  tools: [
    { name: "Git", icon: "📊" },
    { name: "Linux Arch", icon: "🐧" },
    { name: "BSPWM", icon: "🪟" },
    { name: "NvChad", icon: "💻" },
    { name: "AWS", icon: "☁️" },
    { name: "WSL", icon: "🟢" },
  ],
};

export const certificates = [
  {
    id: 1,
    name: "Certificación en Desarrollo Web Full Stack",
    nameEn: "Full Stack Web Development Certification",
    issuer: "Platzi",
    date: "2024",
    description: "Curso completo de desarrollo web con React, Node.js y bases de datos.",
    descriptionEn: "Comprehensive web development program with React, Node.js, and databases.",
    link: "#",
  },
  {
    id: 2,
    name: "AWS Cloud Practitioner",
    nameEn: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "Fundamentos de computación en la nube y servicios de AWS.",
    descriptionEn: "Cloud computing foundations and core AWS services.",
    link: "#",
  },
  {
    id: 3,
    name: "React - Guía Completa",
    nameEn: "React - Complete Guide",
    issuer: "Udemy",
    date: "2023",
    description: "Domina React con hooks, Redux, Next.js y más proyectos prácticos.",
    descriptionEn: "Master React with hooks, Redux, Next.js, and practical projects.",
    link: "#",
  },
  {
    id: 4,
    name: "Linux Administration",
    nameEn: "Linux Administration",
    issuer: "Platzi",
    date: "2023",
    description: "Administración de sistemas Linux, bash scripting y gestión de servidores.",
    descriptionEn: "Linux systems administration, bash scripting, and server management.",
    link: "#",
  },
];

export const journeyTimeline = [
  {
    id: 1,
    dateEs: "2021",
    dateEn: "2021",
    titleEs: "Inicio en la Universidad Mariana",
    titleEn: "Started at Universidad Mariana",
    descriptionEs:
      "Comencé Ingeniería de Sistemas en la Universidad Mariana, enfocado en construir bases sólidas en software y redes.",
    descriptionEn:
      "Started Systems Engineering at Universidad Mariana, focused on building strong foundations in software and networking.",
  },
  {
    id: 2,
    dateEs: "Febrero - Mayo 2025",
    dateEn: "February - May 2025",
    titleEs: "Prácticas en hospital como desarrollador Flutter",
    titleEn: "Hospital internship as Flutter developer",
    descriptionEs:
      "Desarrollé una aplicación de enfermería con Flutter para apoyar procesos clínicos y flujo operativo del equipo de salud.",
    descriptionEn:
      "Built a nursing app with Flutter to support clinical processes and operational workflows for healthcare teams.",
    linkType: "github",
  },
  {
    id: 3,
    dateEs: "Octubre 2025",
    dateEn: "October 2025",
    titleEs:
      "Representación en semilleros de investigación en Bogotá",
    titleEn:
      "Represented Universidad Mariana at research seedbeds in Bogota",
    descriptionEs:
      "Representé a la Universidad Mariana en semilleros de investigación en la ciudad de Bogotá.",
    descriptionEn:
      "Represented Universidad Mariana at research seedbeds in Bogota.",
  },
  {
    id: 4,
    dateEs: "2026",
    dateEn: "2026",
    titleEs: "Finalización de Ingeniería de Sistemas",
    titleEn: "Systems Engineering graduation",
    descriptionEs:
      "Cierre del ciclo universitario con enfoque en desarrollo full-stack y experiencia aplicada en proyectos reales.",
    descriptionEn:
      "Completed university studies with a full-stack development focus and practical experience in real projects.",
  },
];

export const navLinks = [
  { name: "Inicio", href: "#home" },
  { name: "Sobre mí", href: "#about" },
  { name: "Portafolio", href: "#portfolio" },
  { name: "Contacto", href: "#contact" },
];
