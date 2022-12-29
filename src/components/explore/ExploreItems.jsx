import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState()
  const [itemsToShow, setItemsToShow] = useState(8)
  const [sortedItems, setSortedItems] = useState()

  useEffect(() => {
    async function fetchItems() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
      setItems(data)
      setSortedItems(data)
    }
    fetchItems()
  }, [])

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 4)
  }

  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    let sorted;
    if (sortBy === "price_low_to_high") {
      sorted = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_high_to_low") {
      sorted = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === "likes_high_to_low") {
      sorted = [...items].sort((a, b) => b.likes - a.likes);
    } else {
      sorted = items;
    }
    setSortedItems(sorted);
  };

  const visibleItems = sortedItems?.slice(0, itemsToShow)
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {visibleItems?.map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={item.authorId}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={item.nftId}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={item.nftId}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link onClick={handleLoadMore} id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
