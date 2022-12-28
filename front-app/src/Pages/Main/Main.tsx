import './styles.css'
//import { Link } from "react-router-dom";
import imagenMain from "../../../public/images/imagenMain.jpg";
import whatsapp from "../../../public/icons/whatsapp.svg";

export default function Main(){
    return (
        <div className="containt100 d-flex flex-column">
            <div className="boxTitleMain">
                <h1>Main</h1>
            </div>
            <div className="boxTextAndImage">
                <div>
                    <img src={imagenMain} height="100%" width="100%" />
                </div>
                <ul>
                    <li>
                        <p style={{fontSize: "33px" , maxWidth: '80%'}}>Esta programa fue creado por Amaro Cattarozzi.</p>
                        <p style={{fontSize: "20px"}}>En su uso se pide discreción y respeto a los derechos de autor.</p>
                        <p style={{fontSize: "25px"}}>Gracias por tu Confianza!!!</p>
                    </li>
                    <li className="justify-content-end">
                        <p style={{fontSize: "15px"}}>Puede ponerse en contacto con el servicio de atención al cliente a través de:</p>
                        <p style={{fontSize: "15px"}}>
                            <a href="https://web.whatsapp.com" target={'_blank'}>
                                <img src={whatsapp} height="20px" width="20px" /> 
                            </a>
                            al: 54 3482650397
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}