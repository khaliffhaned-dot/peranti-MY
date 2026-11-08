import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';

type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for frontend domain
app.use('/*', cors({
  origin: ['http://localhost:3000', 'https://peranti.my', 'https://www.peranti.my'],
  credentials: true,
}));

// Public Auth Route (Mock Login for MVP)
app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  
  // In a real app, hash password and check against DB.
  // For MVP, we mock the check against the hardcoded admin.
  if (email === 'admin@peranti.my' && password === 'password123') {
    // Generate JWT (use a real library like jose or hono/jwt sign in prod)
    // Here we return a simple mock token structure for frontend testing
    const token = 'mock-jwt-token-admin-123';
    return c.json({ token, role: 'admin' });
  }
  
  return c.json({ error: 'Invalid credentials' }, 401);
});

// --- PROTECTED ROUTES BELOW ---
// In production, use Hono's JWT middleware: 
// app.use('/api/*', (c, next) => jwt({ secret: c.env.JWT_SECRET })(c, next));

app.get('/api/items', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT items.*, users.email as author_email FROM items LEFT JOIN users ON items.author_id = users.id ORDER BY items.created_at DESC'
  ).all();
  return c.json(results);
});

app.post('/api/items', async (c) => {
  const { name, description } = await c.req.json();
  const id = crypto.randomUUID();
  const authorId = 'admin-123'; // Mock extracted from JWT payload
  
  await c.env.DB.prepare(
    'INSERT INTO items (id, name, description, author_id) VALUES (?, ?, ?, ?)'
  ).bind(id, name, description, authorId).run();
  
  return c.json({ success: true, id }, 201);
});

export default app;
