-- Add phone_number column to clients table
ALTER TABLE clients ADD COLUMN phone_number TEXT;

-- Update the trigger function to include phone_number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.clients (user_id, company_name, contact_email, phone_number)
  VALUES (NEW.id, 'New Company', NEW.email, NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
