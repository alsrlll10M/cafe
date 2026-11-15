const express = require('express');
const db = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// R: 목록
app.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM menu ORDER BY id');
  res.render('index', { menus: rows });
});

// C: 추가 폼
app.get('/new', (req, res) => {
  res.render('new');
});

// C: 추가 처리
app.post('/menu', async (req, res) => {
  const { name, price, category } = req.body;
  await db.query('INSERT INTO menu (name, price, category) VALUES (?, ?, ?)', [name, price, category]);
  res.redirect('/');
});

// U: 수정 폼
app.get('/menu/:id/edit', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM menu WHERE id = ?', [req.params.id]);
  res.render('edit', { menu: rows[0] });
});

// U: 수정 처리
app.post('/menu/:id/update', async (req, res) => {
  const { name, price, category } = req.body;
  await db.query('UPDATE menu SET name=?, price=?, category=? WHERE id=?', [name, price, category, req.params.id]);
  res.redirect('/');
});

// D: 삭제
app.post('/menu/:id/delete', async (req, res) => {
  await db.query('DELETE FROM menu WHERE id = ?', [req.params.id]);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('http://localhost:3000 에서 실행 중');
});
