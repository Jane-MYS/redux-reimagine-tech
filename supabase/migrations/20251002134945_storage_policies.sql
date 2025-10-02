-- Storage policies for client-uploads bucket
-- Policy 1: Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'client-uploads');

-- Policy 2: Allow users to read their own files
CREATE POLICY "Allow users to read their own files" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'client-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy 3: Allow users to delete their own files
CREATE POLICY "Allow users to delete their own files" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'client-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
