import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Pop from 'components/Pop';
import PopContent from 'components/PopContent';

class HomePage extends React.Component{
    
    
    // state = {
    //     setButtonPop: false
    // };
    // const deleteCart = cart => {
    //     const _carts = carts.filter(c => c.id !== cart.id);
    //     console.log('hello', _carts);
    //     setCarts(_carts);
    // }
    // const close = () => {
    //     this.setButtonPop(false);
    //     this.useState(setButtonPop);
    //     // setButtonPop: false
    //     // return props.setButtonPop(false);
        
    // };
    toPop =() => {
        Pop.open({
            compoenent: PopContent            
        });
    };
    render(){
        const images = [
            "images/partner.jpg",
            "images/protect_0.jpg"
        ];
    return (
        <div className="HomePage">
            <div className="slide-container">
                <Slide>
                    <div className="each-slide-effect" style={{ height: "450px", 'backgroundImage': `url(${images[0]})` }} />
                    <div className="each-slide-effect" style={{ height: "450px", 'backgroundImage': `url(${images[1]})`  }} />
                </Slide>
            </div>
            <button className='block1 is-primary pop-btn' onClick={this.toPop} >
                <div className="block1" > 
                    < img src="images/AboutUs2.png" alt="About us" className="block1-img" />
                </div>   
            </button>
            <a href="https://forms.gle/eC6MYA765eqohFCc6" target="_blank" rel="noreferrer" className='block2' > 
                <div>
                    <img src="images/form.png" alt="衣物寄回" className="block2-img"></img>
                </div>
            </a>
            <Link to="/Products" className='block3' >
                <div>
                    <img src="images/show1.png" alt="商品瀏覽" className="block3-img"></img>
                </div>
            </Link>
        </div>
    )
    }
}
export default HomePage;