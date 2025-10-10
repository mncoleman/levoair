-- Create table for gallery settings
CREATE TABLE public.gallery_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fit numeric NOT NULL DEFAULT 0.9,
  min_radius integer NOT NULL DEFAULT 600,
  max_vertical_rotation_deg integer NOT NULL DEFAULT 0,
  segments integer NOT NULL DEFAULT 34,
  drag_dampening numeric NOT NULL DEFAULT 2,
  grayscale boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings
CREATE POLICY "Anyone can view gallery settings"
  ON public.gallery_settings
  FOR SELECT
  USING (true);

-- Only admins can update settings
CREATE POLICY "Only admins can update gallery settings"
  ON public.gallery_settings
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert settings
CREATE POLICY "Only admins can insert gallery settings"
  ON public.gallery_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_gallery_settings_updated_at
  BEFORE UPDATE ON public.gallery_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.gallery_settings (fit, min_radius, max_vertical_rotation_deg, segments, drag_dampening, grayscale)
VALUES (0.9, 600, 0, 34, 2, false);