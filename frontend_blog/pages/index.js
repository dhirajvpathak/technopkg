import Head from "next/head";
import Link from "next/link";
import { FaHtml5 } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";

function extractFirstImageUrl(markdownContent) {
  // Check if markdownContent is provided and non-empty
  if (!markdownContent || typeof markdownContent !== 'string') {
    return null;
  }

  // Regular expression to match the first image URL in markdown format ![alt text](imageURL)
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = markdownContent.match(regex);
  return match ? match[1] : null;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const { alldata, loading } = useFetchData(`/api/getblog`);

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = alldata.length; // Total number of blogs

  // Filtering publish blogs
  const publishedblogs = currentBlogs.filter(ab => ab.status === "publish")

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

 


  return (
    <>
      <Head>
        <title>TechnoPKG</title>
        <meta name="description" content="TechnoPKG Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info" data-aos="fade-right">
            <h1>Welcome to <span>TechnoPKG</span>.<br /> Soution provider &</h1>
            <h3>Specialized in ERP , AI, ML, Web & App Development </h3>
            <div className="flex gap-2 ">
              <Link href='/contact'><button>Contact Us</button></Link>
              <Link href='/about'><button>About Us</button></Link>
            </div>
          </div>
          <div className="rightheader_img" data-aos="zoom-in">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/img/adminDP.png" alt="adminDP" />
          </div>
        </div>
      </section>
      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? <><div className="wh-100 flex flex-center mt-2 pb-5">
                <div aria-live="assertive" role="alert" class="loader"></div></div></> : <>
                {publishedblogs.map((blog) => {
                  // in the markdown content first image show here
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return <div className="blog" key={blog._id} data-aos="fade-up">
                    <div className="blogimg">
                      <Link href={`/blog/${blog.slug}`}>
                        <img src={firstImageUrl || "/img/noimage.jpg"} alt="blog" />
                      </Link>
                    </div>
                    <div className="bloginfo">
                      <Link href={`/tag/${blog.tags[0]}`}><div className="blogtag">{blog.tags[0]}</div></Link>
                      <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                      <p>Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to…</p>
                      <div className="blogauthor flex gap-1">
                        <div className="blogaimg">
                          <img src="/img/adminDP.png" alt="author" />
                        </div>
                        <div className="flex flex-col flex-left gap-05">
                          <h4>TechnoPKG</h4>
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                })}

              </>}


            </div>
            <div className='blogpagination'>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href='/topics/database' data-aos="fade-up">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                    <FiDatabase />
                    </div>
                    <h3>Oracle ERP</h3>
                  </div>
                </Link>
                <Link href='/topics/nextjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3>Next Js, React js</h3>
                  </div>
                </Link>
                <Link href='/topics/database' data-aos="fade-up">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3>DataBase</h3>
                  </div>
                </Link>
                <Link href='/topics/deployment' data-aos="fade-up">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list" data-aos="fade-up">
                <Link href='/tag/OracleEBSFunctional'>#OracleEBSFunctional</Link>
                <Link href='/tag/OracleEBSTechnical'>#OracleEBSTechnical</Link>
                <Link href='/tag/OracleFusionFunctional'>#OracleFusionFunctional</Link>
                <Link href='/tag/OracleFusionTechnical'>#OracleFusionTechnical</Link>
                <Link href='/tag/MachineLearning'>#MachineLearning</Link>
                <Link href='/tag/ArtificialIntelligence'>#ArtificialIntelligence</Link>
                <Link href='/tag/ToolsForTesting'>#ToolsForTesting</Link>
                <Link href='/tag/nextjs'>#nextjs</Link>
                <Link href='/tag/reactjs'>#reactjs</Link>
                <Link href='/tag/database'>#database</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>Want to find out how I can solve problems specific to your business? Let's talk.</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon" data-aos="fade-up">
                    <FaGithub />
                  </div>
                  <div className="st_icon" data-aos="fade-up">
                    <FaTwitter />
                  </div>
                  <div className="st_icon" data-aos="fade-up">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
