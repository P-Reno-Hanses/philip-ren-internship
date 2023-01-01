import React, { useEffect, useState } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Author() {
  const { authorId } = useParams()
  const [info, setInfo] = useState([])
  const [followed, setFollowed] = useState(false)


  useEffect(() => {
    async function fetchAuthor() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      setInfo(data)
    }
    fetchAuthor()
  }, [])

  const handleFollow = () => {
    if (!followed) {
      setInfo({
        ...info,
        followers: info.followers + 1
      });
    } else {
      setInfo({
        ...info,
        followers: info.followers -1
      })
    }
    setFollowed(!followed)
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${info.authorBanner}) top` }}
        ></section> */}

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={info.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {info.authorName}
                          <span className="profile_username">@{info.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {info.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>


                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{info.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={handleFollow}>
                        { followed ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <h3>About Me</h3>
                  {/* <AuthorItems /> */}
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cum, minus provident ullam illum amet natus, repellat placeat ab dolores et id tempore nulla unde, reprehenderit quidem minima! Et in omnis aspernatur quidem nihil. Optio recusandae, deleniti, molestias quod labore minima eos assumenda dolores quae quasi commodi distinctio, fugiat nihil! Officiis voluptas ratione iure culpa illum porro provident soluta temporibus!</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptate reiciendis dolorem debitis cum error, delectus facere perspiciatis repudiandae quasi esse aliquam, aliquid et nemo doloribus dicta suscipit fugit? Omnis quibusdam neque iste ipsam odit? Consequuntur maxime possimus obcaecati natus.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum reiciendis nam eligendi, doloremque nihil nostrum labore, deleniti quaerat, autem vero iste dicta?</p>                
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
