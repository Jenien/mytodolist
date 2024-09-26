<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>API Documentation</h1>

<h2>Create a New User</h2>
<pre><code>POST http://localhost:8080/api/users/register
Content-Type: application/json

{
  "username": "asepe",
  "email": "asep@example.com",
  "password": "password123"
}</code></pre>

<h2>Login a User Using Email</h2>
<pre><code>POST http://localhost:8080/api/users/login
Content-Type: application/json

{
  "email": "asep@example.com",
  "password": "password123"
}</code></pre>

<h2>Get All Users</h2>
<pre><code>GET http://localhost:8080/api/users/all</code></pre>

<h2>Create Todo</h2>
<pre><code>POST http://localhost:8080/api/checklist
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "title": "Rencanaede hariini"
}</code></pre>

<h2>Delete Todo</h2>
<pre><code>DELETE http://localhost:8080/api/checklist/1
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN</code></pre>

<h2>Get All Todos</h2>
<pre><code>GET http://localhost:8080/api/checklist/All
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN</code></pre>

<h2>Create List</h2>
<pre><code>POST http://localhost:8080/api/checklist/2/item
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "itemName": "makanan hariini"
}</code></pre>

<h2>Get All Items</h2>
<pre><code>GET http://localhost:8080/api/checklist/2/item
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN</code></pre>

<h2>Get Item by ID</h2>
<pre><code>GET http://localhost:8080/api/checklist/2/item/4
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN</code></pre>

<h2>Check Item</h2>
<pre><code>PUT http://localhost:8080/api/checklist/2/item/5
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN</code></pre>

<h2>Update List</h2>
<pre><code>PUT http://localhost:8080/api/checklist/2/item/rename/4
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "itemName": "makan"
}</code></pre>

<h2>Delete Item</h2>
<pre><code>DELETE http://localhost:8080/api/checklist/2/item/5
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN</code></pre>

</body>
</html>
