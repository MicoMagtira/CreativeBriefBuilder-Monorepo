# Deploying Backend to Render

## 1. Push to GitHub
- Make sure your `/server` directory is committed and pushed to your GitHub repository.

## 2. Create a Render Web Service
- Go to https://dashboard.render.com/
- Click **New Web Service**
- Connect your GitHub repo
- Set **Root Directory** to `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Add any needed variables (see `.env.example`)
- Click **Create Web Service**

## 3. After Deploy
- Render will give you a public URL (e.g. `https://your-backend.onrender.com`)
- Use this as the API base URL in your frontend

## 4. CORS (Cross-Origin Resource Sharing)
- Make sure your Express app uses CORS to allow requests from your Netlify frontend:

```
const cors = require('cors');
app.use(cors({
  origin: 'https://creative-brief-builder.windsurf.build',
  credentials: true
}));
```

---

**If you need help with any step, let me know!**
