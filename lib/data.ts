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
    description: "Plataforma completa para gestionar egresados de institución educativa con autenticación, perfiles y estadísticas.",
    technologies: ["React", "Express.js", "MySQL", "Tailwind CSS"],
    image: "/project-egresados.jpg",
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    name: "Sistema de Login con JWT",
    description: "API REST segura con autenticación JWT, registro de usuarios, recuperación de contraseña y protección de rutas.",
    technologies: ["Node.js", "Express", "JWT", "Bcrypt"],
    image: "/project-jwt.jpg",
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    name: "CRUD React + Tailwind",
    description: "Aplicación de gestión de tareas con operaciones CRUD completas, diseño responsive y animaciones.",
    technologies: ["React", "Tailwind CSS", "LocalStorage"],
    image: "/project-crud.jpg",
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    name: "Proyecto de Redes",
    description: "Configuración y gestión de redes corporativas con servidores, VLANs y monitoreo de tráfico.",
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
    issuer: "Platzi",
    date: "2024",
    description: "Curso completo de desarrollo web con React, Node.js y bases de datos.",
    link: "#",
  },
  {
    id: 2,
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "Fundamentos de computación en la nube y servicios de AWS.",
    link: "#",
  },
  {
    id: 3,
    name: "React - Guía Completa",
    issuer: "Udemy",
    date: "2023",
    description: "Domina React con hooks, Redux, Next.js y más proyectos prácticos.",
    link: "#",
  },
  {
    id: 4,
    name: "Linux Administration",
    issuer: "Platzi",
    date: "2023",
    description: "Administración de sistemas Linux, bash scripting y gestión de servidores.",
    link: "#",
  },
];

export const navLinks = [
  { name: "Inicio", href: "#home" },
  { name: "Sobre mí", href: "#about" },
  { name: "Portafolio", href: "#portfolio" },
  { name: "Contacto", href: "#contact" },
];
