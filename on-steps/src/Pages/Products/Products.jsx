import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Product.css";

function Products({ category }) {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "lowToHigh" or "highToLow"
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 16;

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        let data = res.data;
        if (category) {
          data = data.filter((product) => product.category === category);
        }
        setProducts(data);
        setCurrentPage(1);
      })
      .catch((err) => console.log(err));
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Search
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.newPrice - b.newPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.newPrice - a.newPrice);
    }

    setDisplayedProducts(filtered);
  }, [products, searchQuery, sortOrder]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = displayedProducts.slice(firstProductIndex, lastProductIndex);
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="filter-container">
        <input
          type="text"
          
          placeholder="  Search products...   "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="sort-select"
        >
          <option value="">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="products-container">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-subname">{product.subname}</p>
              <div className="product-pricing">
                <span className="new-price">₹{product.newPrice}</span>
                <span className="old-price">₹{product.oldPrice}</span>
                <span className="offer">{product.offer}</span>
                <button className="view-button">view item</button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {(!category || category === "all") && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Products;
