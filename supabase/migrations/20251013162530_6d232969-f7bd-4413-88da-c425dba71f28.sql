-- Fix security issues: Add missing DELETE policies and improve RLS

-- 1. Add DELETE policy for gallery_settings (only admins)
CREATE POLICY "Only admins can delete gallery settings"
ON public.gallery_settings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Add DELETE policy for contact_submissions (only admins)
CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Restrict site_settings to only allow admins to read sensitive settings
-- (Keep public read for now, but we can restrict specific keys if needed)

-- 4. Add validation constraints to gallery_settings
ALTER TABLE public.gallery_settings
ADD CONSTRAINT gallery_settings_fit_check CHECK (fit > 0 AND fit <= 2),
ADD CONSTRAINT gallery_settings_min_radius_check CHECK (min_radius >= 100 AND min_radius <= 2000),
ADD CONSTRAINT gallery_settings_max_vertical_rotation_check CHECK (max_vertical_rotation_deg >= -90 AND max_vertical_rotation_deg <= 90),
ADD CONSTRAINT gallery_settings_segments_check CHECK (segments >= 10 AND segments <= 100),
ADD CONSTRAINT gallery_settings_drag_dampening_check CHECK (drag_dampening >= 0.1 AND drag_dampening <= 10);