import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Pages from "./pages/Pages";
import Ckeditorapp from './pages/Ckeditorapp'
import { getChapters, getPages } from '../api';
import { useNavigate } from 'react-router-dom';



const Addchapter = ({ handleChange, ...props }) => {

  // const [modal, setmodal] = useState("");
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [chapter, setChapter] = useState({});
  const [page,setPage]=useState({});

  const navigate = useNavigate();



  //  const API_URL = "https://noteyard-backend.herokuapp.com"
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

  const handleCallback = (childData) => {
    console.log(childData);
    setData(childData);
  }
  console.log(data);

  const fetchChapters = async () => {
    await getChapters().then((res) => {
      if (res) {
        setData(res.data);
      }
      else {
        console.log("No data");
      }

    })
  }

  useEffect(() => {
    fetchChapters();
  }, [])


  // const handleCallbackPages = (childData) => {
  //   console.log(childData);
  //   setData(childData);
  // }
  console.log(data);



  const fetchPages = async () => {
    await getPages().then((res) => {
      if (res) {

        setPages(res.data);

      }
      else {
        console.log("No data");
      }

    })
  }
  console.log(pages);

  useEffect(() => {
    fetchPages();

  }, [])

  const handleEdit = (chapter) => {
    setChapter(chapter);
  }


  const handleEditPage=(page)=>
  {
     setPage(page);
  }
  return (

    <div className='container-md'>
      <div className='container'>
      </div>
      <h1 >User Manuals</h1>
      <Link to="/chapters">
      <button className='btn btn-primary mt-2' style={{ marginLeft: "90%" }} onClick={() => handleEdit(chapter)} >Add Chapter</button>
      </Link>

      <Ckeditorapp handleCallback={handleCallback} chapter={chapter}  />

      <div>
        <Accordion>
          {
            data && data.length > 0 ?
              data.map((chapter, index) => {
                return <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header>{chapter.name}
                  </Accordion.Header>

                  <Accordion.Body>
                    <Link to="/readChapter">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </Link>
                    {/* <Link to="/chapters">
                   <button onClick={() => handleEdit(chapter)}> <FontAwesomeIcon icon={faEdit} /></button>
                    </Link> */}
                 
                    <button className='btn btn-primary' onClick={() => handleEdit(chapter)}> <FontAwesomeIcon icon={faEdit} /></button>
               
                    <Link to="/pages">
                      <button className='btn btn-primary mt-2' style={{ marginLeft: "90%" }} onClick={()=> handleEditPage(page)} >Add Page</button>
                    </Link>

                    <nav>
                      <ul>
                        {
                          pages && pages.length > 0 ?
                            pages.map((page, index) => {
                              return <li key={index}><Link to={{
                                pathname: `/pages/${page._id}`,
                                state:page
                              }}>
                               {page.name}
                              </Link></li>
                            }
                            )
                            :
                            <h1>No data</h1>
                        }
                      </ul>
                    </nav>
                  </Accordion.Body>
                </Accordion.Item>
              }
              )
              : <p>No data</p>
          }
        </Accordion>
      </div>
    </div>
  );
}

export default Addchapter;