-- Add columns for link customization
ALTER TABLE public.pixenze_links ADD COLUMN IF NOT EXISTS button_color TEXT;
ALTER TABLE public.pixenze_links ADD COLUMN IF NOT EXISTS text_color TEXT;

-- Optional: Update existing rows with defaults if needed, but existing code handles nulls.
