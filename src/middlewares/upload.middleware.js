import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory before uploading to Supabase
const upload = multer({ storage });

export default upload;
