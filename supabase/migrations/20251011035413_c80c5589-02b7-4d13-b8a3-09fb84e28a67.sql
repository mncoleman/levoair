-- CMS Content Management Tables

-- Pages table for managing all site pages
CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hero sections for pages
CREATE TABLE public.hero_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES public.pages(id) ON DELETE CASCADE,
  badge_text text,
  headline text NOT NULL,
  subheadline text,
  cta_text text,
  cta_link text,
  background_image text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services/offerings
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  full_description text,
  icon_name text,
  image_url text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Features/benefits sections
CREATE TABLE public.features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon_name text,
  image_url text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  bio text,
  image_url text,
  linkedin_url text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Site settings
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access for published content
CREATE POLICY "Anyone can view published pages" ON public.pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Anyone can view hero sections for published pages" ON public.hero_sections
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pages WHERE pages.id = hero_sections.page_id AND pages.is_published = true)
  );

CREATE POLICY "Anyone can view published services" ON public.services
  FOR SELECT USING (is_published = true);

CREATE POLICY "Anyone can view published features" ON public.features
  FOR SELECT USING (is_published = true);

CREATE POLICY "Anyone can view published team members" ON public.team_members
  FOR SELECT USING (is_published = true);

CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view site settings" ON public.site_settings
  FOR SELECT USING (true);

-- Admin policies for all tables
CREATE POLICY "Admins can manage pages" ON public.pages
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage hero sections" ON public.hero_sections
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage features" ON public.features
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage team members" ON public.team_members
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact submissions" ON public.contact_submissions
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hero_sections_updated_at
  BEFORE UPDATE ON public.hero_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_features_updated_at
  BEFORE UPDATE ON public.features
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.pages (slug, title, meta_description) VALUES
  ('home', 'LevoAir - Data Collection Simplified', 'Professional drone pilots capturing high-quality aerial data for your projects'),
  ('services', 'Our Services', 'Custom aerial solutions, construction mapping, and land assessment services'),
  ('about', 'About Us', 'Pioneering reality data-capturing technology with experienced aviation professionals'),
  ('contact', 'Contact Us', 'Get in touch with our drone experts to discuss your project needs');

-- Insert hero section for home page
INSERT INTO public.hero_sections (page_id, badge_text, headline, subheadline, cta_text, cta_link) 
SELECT id, 'DATA COLLECTION SIMPLIFIED', 'We Fly the Drones. You Use the Data.', 'Rely on professional pilots to capture everything for your project needs', 'Book a Flight', '/contact'
FROM public.pages WHERE slug = 'home';

-- Insert services
INSERT INTO public.services (title, slug, short_description, icon_name, display_order) VALUES
  ('Custom Aerial Solutions', 'custom-aerial-solutions', 'Tailored drone services for your specific project requirements', 'Plane', 1),
  ('Construction Mapping & Progress', 'construction-mapping', 'Track construction progress with high-resolution aerial mapping', 'Building2', 2),
  ('Land Assessment & Appraisal', 'land-assessment', 'Comprehensive land analysis and evaluation services', 'Map', 3);

-- Insert features
INSERT INTO public.features (title, description, icon_name, display_order) VALUES
  ('Aviation-grade flight planning and safety checks', 'Professional flight planning following strict aviation protocols', 'Shield', 1),
  ('Pilots who speak the industry''s language', 'Experienced professionals who understand your technical requirements', 'Users', 2),
  ('Data that meets strict engineering standards', 'High-quality data collection meeting industry specifications', 'FileCheck', 3),
  ('Full project communication at every step', 'Transparent communication throughout your entire project', 'MessageSquare', 4);

-- Insert initial site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('company_name', '"LevoAir"'),
  ('contact_phone', '"(970) 776-0470"'),
  ('contact_email', '"info@levoair.com"'),
  ('social_linkedin', '"https://www.linkedin.com/company/levoair/"');