-- Create admins table for access control
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policy to allow only authenticated users to read admin list
-- (This will be used by the admin login function)
CREATE POLICY "Allow authenticated users to check admin status" ON admins
FOR SELECT TO authenticated
USING (true);

-- Insert the initial admin (you can change this email)
INSERT INTO admins (email, name) 
VALUES ('mengyishi9@gmail.com', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins WHERE email = user_email
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
