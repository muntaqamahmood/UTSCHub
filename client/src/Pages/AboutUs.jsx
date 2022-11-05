import React from "react";
import { Card } from 'react-bootstrap';

function AboutUs() {
    return(
        <div className="AboutUs">
            <Card className="center-block">
                <Card.Body>
                    <Card.Title className="title text-center">
                        About Us
                    </Card.Title>
                    <hr/>
                    <Card.Img className="Logo" src={`${process.env.PUBLIC_URL}/logo.png`} />
                    <Card.Text>
                        UTSCHUB a website that targets all UTSC students and faculty members{"\n"}
                        to distribute further convenience within the community and explore the{"\n"} 
                        embedded demands and supplies by offering a UTSC specific ECommerce platform.{"\n"} 
                        Besides that, our website also aims to accomplish more sophisticated{"\n"}
                        community engagement with our distinctive SNS and event planning features.
                    </Card.Text>
                </Card.Body>
              </Card>
        </div>
    )
}

export default AboutUs;