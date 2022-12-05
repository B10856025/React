import React from 'react';
import { render } from 'react-dom';

class Pop extends React.Component{
    state = {
        active:false

    };

    close = () =>{
        this.setState({
            active:false,
            component: null
        })
    }

    open = options =>{
        const { component } = options;
        const _component = React.createElement(component, { close:this.close});
        this.setState({
            active:true,
            component: _component
        });
    };

    render() {
        const _class={
            true:'pop-wrapper active',
            false:'pop-wrapper'
        };
        return(
            <div className={_class[this.state.active]}>
                <div className='over-layer' onClick={this.close}></div>
                <div className='pop'>
                    <div className='head'>
                        <span className='close' onClick={this.close}>X</span></div>
                        <div className='content'>
                            <p className='title'>關於我們</p>
                            <div className='text'>
                                &emsp;近年來，網路購物的興起，使消費者可以在短時間內買到新潮的服飾，但也增加了衣物汰換的速度，為了解決閒置在衣櫃的衣物，本組創立了二拾衣世紀這個網站，提供給有需要的民眾使用，透過線上表單的填寫，物流就會上門收件，也解決了因苦無管道處理閒置衣物所造成的汙染。透過網路平台不僅打破地理環境的交易限制，衣物也能藉由轉賣延續其價值。並依約定比例回饋給使用者及公益團體，將拋棄二手衣物可能造成的汙染，轉換成「正向能量」。
                                <br /></div>
                                < img src="images/word.jpg" alt="About us" className="img" />
                            </div>
                    
                </div>
            </div>
        );
    }
}


const _div = document.createElement('div') 
document.body.appendChild(_div)

const _pop = render(<Pop />, _div)
export default _pop;