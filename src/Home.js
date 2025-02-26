import { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import ProductDetails from '../src/ProductDetails';

export default function App() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://api.goturc.com/api/Product/GetList?categoryId=403&page=1&size=10";
    
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setProductList(data.products);
      })
      .catch(err => setError("Hata: " + err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="row">
          {productList.map((prd, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card p-10"
                style={{
                  width: "18rem",
                  marginTop: "1rem",
                  position: "relative",
                }}
              >
                <img
                  src={prd.imageList[0]}
                  className="card-img-top"
                  alt="..."
                />
                {prd.isFreeShipping && (
                  <div
                    className="free-shipping-label"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "green",
                      padding: "0.5rem",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    <i className="bi bi-box-fill me-2"></i>
                    <span>Kargo Bedava</span>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{prd.name}</h5>
                  <br />
                  <h5 className="card-title">{prd.price + "₺"}</h5>
                  <br />
                  <a href="#" className="btn btn-primary">
                    Sepete Ekle
                  </a>
                  <Link
                    to={`/ProductDetails/${prd.id}`}
                    className="btn btn-outline-primary mx-1"
                  >
                    Detay
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Routes>
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}
