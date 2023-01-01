import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

function TopSellers() {
  const [topSellers, setTopSellers] = useState(
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopSellers() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
      setTopSellers(data)
      setLoading(false)
    }
    fetchTopSellers()
  }, [])
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          {
            loading ?(
                  <div className="skeleton-box"></div>
            ) : (
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers?.map((topSeller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                  <Link to={`/author/${topSeller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={topSeller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={topSeller.authorId}>{topSeller.authorName}</Link>
                    <span>{topSeller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
              )
          }
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
