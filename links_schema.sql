-- Create the links table
CREATE TABLE public.pixenze_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT, -- Lucide icon name
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    button_color TEXT,
    text_color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.pixenze_links ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.pixenze_links
    FOR SELECT
    USING (is_active = true);

-- Create policy to allow authenticated users (admin) to manage links
-- Assuming you will use the Supabase Dashboard initially, but good to have for future Admin UI
CREATE POLICY "Allow authenticated full access" ON public.pixenze_links
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert some sample data
INSERT INTO public.pixenze_links (title, url, icon, "order") VALUES
('Website', 'https://pixenzebooth.com', 'Globe', 1),
('Result Gallery', 'https://pixenzebooth.com/result', 'Image', 2),
('Follow us on Instagram', 'https://instagram.com/pixenzebooth', 'Instagram', 3),
('Contact Us', 'https://pixenzebooth.com/contact', 'Mail', 4);
