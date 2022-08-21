import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import LogoArea from "../reusables/LogoArea";
import DashboardBtn from "../reusables/DashboardBtn";
import Navbar from "../reusables/Navbar";

function Home() {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log('effect ran')
        axios.get(`${baseUrl}api/product/read`)
            .then((result) => {
                let products = result['data']['products'];
                setProducts(products);
            })
    }, [])

    return (
        <div>
            <LogoArea />
            <Navbar /><br />
            <DashboardBtn />

            <main style={{ "marginTop": "50px" }}>
                {
                    products.map(product => {
                        return (
                            <div key={product['id']} style={{
                                "padding": "2rem",
                                "margin": "2rem"
                            }}>
                                <div>{product['name']}</div>
                                <div><img src={product['image']} alt="A shoe image" width="400" height="400" /></div>
                                <div>{product['brand']}</div>
                                <div>₦ {product['price']}</div>
                            </div>
                        )
                    })
                }
            </main>


        </div>
    );
}

export default Home;