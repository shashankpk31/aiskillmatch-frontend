# AISkillMatch Application Guide

## Prerequisites
- Java 17 (JDK)
- Node.js 18+ and npm 9+
- Maven 3.8+
- PostgreSQL (via Supabase free tier)
- DeepSeek API key (free tier)
- Git

## Backend Setup
1. Clone repo: `git clone <backend-repo-url> && cd AISkillMatch`
2. Update `application.properties` with Supabase DB credentials (`DB_URL`, `DB_USER`, `DB_PASS`), JWT secret (`JWT_SECRET`), DeepSeek API key (`DEEPSEEK_API_KEY`), and CORS origins (`ALLOWED_ORIGINS=http://localhost:5173`).
3. Build: `mvn clean install`
4. Run: `mvn spring-boot:run` (runs on http://localhost:8080)

## Frontend Setup
1. Clone repo: `git clone <frontend-repo-url> && cd aiskillmatch-frontend`
2. Install deps: `npm install`
3. Update API URLs in components (e.g., Login.jsx) to `http://localhost:8080` if needed.
4. Run: `npm run dev` (runs on http://localhost:5173)

## Usage Guide
### Register
- Go to /register
- Fill username, email, password, role (JOBSEEKER/RECRUITER/ADMIN), skills (comma-separated), company (optional)
- Submit → Redirect to login

### Login
- Go to /login
- Enter email, password
- Submit → Stores token/role in localStorage, redirects to dashboard

### Dashboard (All Roles)
- View available jobs
- JobSeeker: Browse jobs, recommendations based on resume skills
- Recruiter/Admin: Post jobs (title, description, skills, location, salary)
- Admin: Manage users (view/edit/delete via API, extend UI if needed)

### Resume Upload (JobSeeker)
- Go to /resume-upload
- Select PDF/DOCX file (<5MB)
- Submit → Parses skills, stores in DB
- View resumes via API (/api/resumes/user/{userId})

### AI Chat (JobSeeker)
- Go to /ai-chat
- Enter prompt (e.g., "Improve Java resume")
- Submit → Gets DeepSeek AI advice, displays response

### Logout
- Click Logout in navbar → Clears localStorage, redirects to login

## Testing Guide
### Manual Testing
1. Register as JobSeeker, login → Verify dashboard shows jobs, upload resume → Check skills parsed, get AI advice
2. Register as Recruiter, login → Post job → Verify appears in dashboard
3. Register as Admin, login → Post/manage jobs, use API to manage users (e.g., Postman: GET /api/users with token)
4. Test invalid login: Wrong creds → Error message
5. Test file edges: >5MB/invalid format → Error
6. Test CORS: Access frontend from different origin → No errors if configured

### API Testing (Postman)
- Collection: Import backend APIs
- Auth: Bearer token from login
- Test endpoints:
  - POST /api/auth/register: Valid/invalid data
  - POST /api/auth/login: Get token/role
  - GET /api/jobs: List jobs
  - POST /api/jobs: Create job (Recruiter token)
  - POST /api/resumes/upload: Multipart file (JobSeeker token)
  - POST /api/ai/advice: Prompt body (JobSeeker token)
  - DELETE /api/users/{id}: Soft delete (Admin token)

### Automated Testing
- Backend: Run `mvn test` (add JUnit tests for services/controllers)
- Frontend: Add React Testing Library tests for components (e.g., Login form submission)

## Deployment
- Backend: Render (use render.yaml, set env vars)
- Frontend: Vercel (npm run build, deploy)
- Update frontend API URLs to Render URL
- Test end-to-end: Register, login, use features