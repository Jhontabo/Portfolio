-- ============================================
-- Portfolio Admin - Supabase Schema
-- Ejecuta esto en el SQL Editor de Supabase
-- ============================================

-- Tabla: Información personal (1 fila)
CREATE TABLE personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  linkedin TEXT DEFAULT '',
  github TEXT DEFAULT '',
  bio_es TEXT DEFAULT '',
  bio_en TEXT DEFAULT '',
  cv_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: Proyectos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  name_en TEXT DEFAULT '',
  description TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  technologies TEXT[] DEFAULT '{}',
  demo TEXT DEFAULT '#',
  github TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: Certificados
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  name_en TEXT DEFAULT '',
  issuer TEXT DEFAULT '',
  date TEXT DEFAULT '',
  description TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  link TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('languages', 'frontend', 'backend', 'mobile', 'tools')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: Ruta profesional (timeline)
CREATE TABLE journey_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_es TEXT DEFAULT '',
  date_en TEXT DEFAULT '',
  title_es TEXT DEFAULT '',
  title_en TEXT DEFAULT '',
  description_es TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  link_type TEXT DEFAULT '',
  link TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: Admin users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX idx_projects_sort ON projects(sort_order);
CREATE INDEX idx_certificates_sort ON certificates(sort_order);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_sort ON skills(sort_order);
CREATE INDEX idx_journey_sort ON journey_entries(sort_order);

-- RLS (Row Level Security)
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas: lectura pública
CREATE POLICY "Public read personal_info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read journey_entries" ON journey_entries FOR SELECT USING (true);

-- Políticas: escritura admin (service role)
CREATE POLICY "Admin all personal_info" ON personal_info FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin all certificates" ON certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin all skills" ON skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin all journey_entries" ON journey_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin all admin_users" ON admin_users FOR ALL USING (true) WITH CHECK (true);

-- Bucket para archivos
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Storage policies
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Admin upload storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Admin update storage" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio');
CREATE POLICY "Admin delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio');
