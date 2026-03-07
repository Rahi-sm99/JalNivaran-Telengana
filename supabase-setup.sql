-- Run this SQL in your Supabase project → SQL Editor → New Query

-- 1. Disaster Reports (from the Report Water-logging form)
CREATE TABLE IF NOT EXISTS disaster_reports (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  location TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'moderate', 'severe')),
  reporter_name TEXT NOT NULL,
  reporter_contact TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Resource Requests (from Emergency Resources form)
CREATE TABLE IF NOT EXISTS resource_requests (
  id BIGSERIAL PRIMARY KEY,
  requester_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Volunteers (from Volunteer form)
CREATE TABLE IF NOT EXISTS volunteers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  assigned_area TEXT,
  task TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Donations
CREATE TABLE IF NOT EXISTS donations (
  id BIGSERIAL PRIMARY KEY,
  donor_name TEXT,
  donor_email TEXT,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (keep data safe)
ALTER TABLE disaster_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon) to INSERT (submit forms)
CREATE POLICY "Allow public inserts" ON disaster_reports FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts" ON resource_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts" ON volunteers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts" ON donations FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to SELECT (for admin panel)
CREATE POLICY "Allow authenticated reads" ON disaster_reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated reads" ON resource_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated reads" ON volunteers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated reads" ON donations FOR SELECT TO authenticated USING (true);

-- Also allow anon to read (for the public dashboard)
CREATE POLICY "Allow public reads" ON disaster_reports FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public reads" ON resource_requests FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public reads" ON volunteers FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public reads" ON donations FOR SELECT TO anon USING (true);

-- Storage bucket for report images (run this in SQL Editor too)
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', true)
ON CONFLICT DO NOTHING;

-- Allow anyone to upload to reports bucket
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'reports');
CREATE POLICY "Allow public reads" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'reports');
