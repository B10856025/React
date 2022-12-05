import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

class AddInventory extends React.Component {
    
    state = {
        name: '',
        price: '',
        tags: '',
        image: '',
        status: 'available'
    }
    formData = new FormData();

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        
        if (name === "image") {
            this.formData.append('image', e.target.files[0])
            this.setState({
                [name]:value
            });
        }
        else {
            this.setState({
                [name]:value
            });
        }
    };
    // getProductPost = async() => {   //從服務器取得資料
    //     axios.get('/api')
    //         .then((response) => {
    //             const data = response.data;
    //             this.setState({ products: data , sourceProducts: data });
    //             console.log('Data has been received!!');
    //             console.log(data);
    //         })
    //         .catch(() => {
    //             alert('Error retrieving data!');
    //         });
    
    // }
    submit = e => {
        e.preventDefault();
        const product = { ...this.state};
        console.log(product);

        // const formData = new FormData()
        // formData.append('image', this.state.image)
        // console.log('formData:', formData)
        // const payload = {   //負載
        //     name: this.state.name,
        //     price: this.state.price,
        //     tags: this.state.tags,
        //     image: this.state.image,
        //     status: this.state.status
        // };
        
        axios.post('/api/image', this.formData).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log('----------error', error)
        })
        axios({
            url: '/api',   //使用該端口與我們的服務器通信 對特定路線 命令他們發回這些數據
            method: 'POST',
            data: product, 
            // image: req.file
          })  //發出post請求 進行http調用 向服務器發送數據
            .then((res, req) => {
                console.log(res.data)
                console.log('Data has been sent to the server.');
                this.props.close(product);
                toast.success('Add Success');
            })
            .catch(() => {
                console.log('Internal server error');
            });
    };
    //showToast = () => {
    //    toast('default');
    //    toast.info('info');
    //    toast.success('success');
    //    toast.warning('warning');
    //    toast.error('error');
    //};

    render() {
        return (
            <div className="inventory">
                <p className="title has-text-centered">Inventory</p>
                <form encType="multipart/form-data" onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                        <label className="label">Name</label>
                            <textarea className="textarea" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <label className="label">Price</label>
                            <input type="number" className="input" name="price" value={this.state.price} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <label className="label">Tags</label>
                            <input type="text" className="input" name="tags" value={this.state.tags} onChange={this.handleChange} />
                        </div>
                    </div>
                    {/*<div className="field">
                        <div className="control">
                        <label className="label">Image</label>
                            <button className="button" type="button" name="image" value={this.state.image} onChange={this.handleChange} >選擇圖片</button>
                        </div>
                    </div>*/}
                    <div className="field">
                        <div className="control">
                        <label className="label">Select Image</label>
                            {/* <img width={100} src={this.state.image === '' ? '' : URL.createObjectURL(this.state.image)} alt={this.state.image}/> */}
                            <input type="file" className="input" name="image" value={this.state.image} onChange={this.handleChange } />
                            {/* <button className="button" type="button" name="image" value={this.state.image} onChange={this.handleChange} >選擇圖片</button> */}
                            
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <label className="label">Status</label>
                            <div className="select is-fullWidth">
                                <select name="status" value={this.state.status} onChange={this.handleChange} >
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link" >Submit</button>
                        </div>
                        <div className="control">
                            <button className="button" type="button" onClick={() => {this.props.close();}}>Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddInventory;