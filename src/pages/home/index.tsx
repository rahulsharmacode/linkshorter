import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";

const index = () => {


    const [getUrl , setgetUrl] = useState<string>('');
    const [shortData , setshortData] = useState<any>([]);
    const [spin , setspin] = useState<boolean>(false);

   

    const generateLink = async (e: any) => {
        e.preventDefault();
        setspin(true);
        const requestHeaders = {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_APIKEY
        };
  
        try {
          const response = await axios.post(import.meta.env.VITE_APIDOM, {destination: getUrl}, {
            headers: requestHeaders,
          });
          const link = response.data;
          setshortData(response.data);
          setCustomName(response.data.slashtag)
          console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`);
        } catch (error) {
          console.error("Error creating short link:", error);
          alert('Request failed')
        }

        setspin(false);

    };

    const [updateLink, setupdateLink] = useState<boolean>(false);
    const [updateSpin, setupdateSpin] = useState<boolean>(false);


    const [customName, setCustomName] = useState<string>('');
    const [shortLinkUpdated, setShortLinkUpdated] = useState<boolean>(false);
  
    const handleUpdateLink = async () => {
        setupdateSpin(true);
      try {
       
        const shortLinkId = shortData.id ;
        const apiUrl = `${import.meta.env.VITE_APIDOM}/${shortLinkId}`;
        const requestHeaders:any = {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_APIKEY
          };

          const axiosConfig = {
            withCredentials: true,
            headers: requestHeaders
          };

        const response = await axios.patch( apiUrl,
          { slashtag: customName }, axiosConfig );
  
        if (response.status === 200) {
          setShortLinkUpdated(true);
          alert('Short link updated.')
          console.log('Short link updated.');
        } else {
          console.error('Failed to update short link:', response.data);
        }
      } catch (error) {
        console.error('Error', error);
      }
      setupdateSpin(false);

    };


    
  return (<>
    
    <Container fluid  style={{height : '100vh' , background : 'linear-gradient(to right, #005aa7, #fffde4)'}}>
        <Container className="h-100">
            <Row className="h-100" >
                <Col lg={8} className="mx-auto my-auto" style={{height : 200}}>

                    <Form onSubmit={generateLink} className="mb-3" >
                        <Form.Group className="my-2" >
                            <Form.Label> <strong className="text-white">Enter the url</strong> </Form.Label>
                            <Form.Control required className="rounded-1" type="url" placeholder="https://..." value={getUrl} onChange={(e)=>{setgetUrl(e.target.value)}} />
                        </Form.Group>

                        <Form.Group className="my-2" >
                            <Button type="submit" className="rounded-5 border-0 py-2" style={{background : 'black'}}>Generate Short Link {spin ? <Spinner size="sm" color="white" /> : null} </Button>
                        </Form.Group>
                    </Form>


                    {shortData.shortUrl && 
                     <Card className="p-3">
                        <div className="d-flex">
                        <strong className="me-2">Short link: </strong> <a href={shortData.shortUrl} style={{color : 'black'}}>{shortData.shortUrl}</a> 
                        
                        {/* <span className="ms-2" onClick={() =>{setupdateLink(true)}} title="edit link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg></span> */}
                        <span onClick={() => {navigator.clipboard.writeText(shortData.shortUrl)}} className="ms-2" title="copy"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></span>
                        </div>

                        <div className="box">
                            <p>{`${shortData.domainName}/`} <input type="text" onChange={(e)=>{setCustomName(e.target.value)}} value={customName} /> </p>
                            <Button type="button" onClick={()=>{handleUpdateLink()}} className="rounded-5 border-0 py-2" style={{background : 'black'}}>Update Slash {updateSpin ? <Spinner size="sm" color="white" /> : null} </Button>
                        </div>
                    </Card>}
                </Col>
            </Row>
        </Container>
    </Container>
  
  </>)
}

export default index;



// import React, { useState } from 'react';
// import axios from 'axios';

// const UpdateShortLink = () => {
//   const [customName, setCustomName] = useState('');
//   const [shortLinkUpdated, setShortLinkUpdated] = useState(false);

//   const handleUpdateLink = async () => {
//     try {
//       const api_key = 'YOUR_API_KEY'; // Replace with your Rebrandly API key
//       const shortLinkId = 'YOUR_SHORT_ID'; // Replace with your short link ID
//       const apiUrl = `https://api.rebrandly.com/v1/links/${shortLinkId}`;

//       const response = await axios.patch(
//         apiUrl,
//         {
//           slashtag: customName,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'apikey': api_key,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setShortLinkUpdated(true);
//         console.log('Short link updated successfully.');
//       } else {
//         console.error('Failed to update short link:', response.data);
//       }
//     } catch (error) {
//       console.error('Error updating short link:', error);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Custom Name:
//         <input
//           type="text"
//           value={customName}
//           onChange={(e) => setCustomName(e.target.value)}
//         />
//       </label>
//       <button onClick={handleUpdateLink}>Update Short Link</button>
//       {shortLinkUpdated && <p>Short link updated successfully!</p>}
//     </div>
//   );
// };

// export default UpdateShortLink;

