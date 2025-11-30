-- Confirm admin email to enable login
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'admin@melodylabs.com';