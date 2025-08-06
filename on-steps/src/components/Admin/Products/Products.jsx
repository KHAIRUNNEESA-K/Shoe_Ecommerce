import React, { useEffect, useState } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    subname: '',
    category: '',
    image: '',
    oldPrice: '',
    newPrice: '',
    offer: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `http://localhost:3000/products/${editingId}` : 'http://localhost:3000/products';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({
      name: '',
      subname: '',
      category: '',
      image: '',
      oldPrice: '',
      newPrice: '',
      offer: ''
    });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="products-page">
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="subname" value={form.subname} onChange={handleChange} placeholder="subname" required />
        <select name="category" value={form.category} onChange={handleChange} required>
  <option value="">Select Category</option>
  <option value="men">Men</option>
  <option value="women">Women</option>
  <option value="kid">Kid</option>
</select>

        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
        <input name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange} placeholder="Old Price" required />
        <input name="newPrice" type="number" value={form.newPrice} onChange={handleChange} placeholder="New Price" required />
        <input name="offer" value={form.offer} onChange={handleChange} placeholder="Offer (eg. 30% OFF)" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Subname</th>
            <th>Category</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Offer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td><img src={p.image} alt={p.name} width="60" /></td>
              <td>{p.name}</td>
              <td>{p.subname}</td>
              <td>{p.category}</td>
              <td>₹{p.oldPrice}</td>
              <td>₹{p.newPrice}</td>
              <td>{p.offer}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
