import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function ProductDetails() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: id } = useParams();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageListString, setImageListString] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.goturc.com/api/Product?id=${id}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        
        setProductName(data.name);
        setPrice(data.price);
        setImageListString(data.imageListV2[0]);
        debugger
      })
      .catch(err => setError("Hata: " + err.message))
      .finally(() => setLoading(false));
  }, [])

  return (
    <div>
      <div className="card p-10" style={{ width: "18rem", marginTop: "1rem" }}>
        <img src={imageListString} className="card-img-top" alt="..." />
        <div>{productName}</div>
        <div>{price + "₺"}</div>
      </div>
    </div>
  );
}