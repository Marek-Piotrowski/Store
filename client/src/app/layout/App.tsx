import React from 'react';
import { useState, useEffect } from 'react';
import { Product } from '../models/product';

function App() {

    const [products, setProducts] = useState < Product[]>([]);

    useEffect(() => {
        fetch('https://localhost:7271/api/Products')
            .then(res => res.json())
            .then(data => setProducts(data))

    },[]);

  return (
     <div>
          <h1>Store </h1>
          <ul>
              {products.map((item) => (
                  <li key={item.name}>
                      {item.name}
                  </li>
                  ))}
          </ul>
          
          
    </div>
  );
}

export default App;
