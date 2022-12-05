import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login(props){   //使用React Hook Form 會接管input表單項做處理 在handleSubmit拿到值
    const { register, handleSubmit,  formState: { errors }  } = useForm();   //返回一個對象
    const navigate = useNavigate();
    // getUserPost = async() => {   //從服務器取得資料
    //     axios.get('/api/user')
    //         .then((response) => {
    //         const data = response.data;
    //         this.setState({ posts: data });
    //         console.log('Data has been received!!');
    //     })
    //         .catch(() => {
    //         alert('Error retrieving data!');
    //         });
    //     }
    // const state = {     //更新狀態
    //     nickname: '',
    //     email: '',
    //     password: '',
    //     users: []
    // }
    // const componentDidMount = () => {
    //     this.getUserPost();
    // }
    // const getUserPost = async() => {   //從服務器取得資料
    //     console.log('-------------123')
    //     axios.get('/api/user')
    //         .then((response) => {
    //             const data = response.data;
    //             //this.setState({ users: data });
    //             console.log('Data has been received!!');
    //             console.log(data);
    //         })
    //         .catch(() => {
    //             alert('Error retrieving data!');
    //         });
    
    // }
    const onSubmit = async Data => {
        //1.阻止默認事件行為 
        //event.preventDefault();
        //2.獲取表單數據
        //console.log(this.emailRef.current.value);
        /*const formData ={
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value
        }*/
        //console.log(data);
        //3.處理登入邏輯
        
        try {
            const { email, password } = Data;
            //getUserPost()
            const res = await axios.post('/api/user', { email, password }) ;  //post的請求
            // console.log('------------------')
            
            console.log(res);
            const jwToken = res.data;
            //console.log('123', res.data);
            console.log(jwToken);
            global.auth.setToken(jwToken) ;  //保存jwToken在本地瀏覽器的存儲
            toast.success('Login Success');
            //4.跳到首頁
            navigate('/');
            
        } catch (error) {
            console.log('-----------', error)
            const message = error.response.data.message;
            toast.error(message);
        }
        
        //4.跳到首頁
        
        //this.props.history.push("/cart");
    };
    return(
        <div className="login-wrapper">

             <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>{/* */}
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            className={`input $ {errors.email && 'is-danger'}`} 
                            type="text" 
                            placeholder="Email" 
                            name="email" 
                            {...register("email", {
                                required: 'email is required',  
                                pattern: {
                                    value: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/, 
                                    message: 'invalid email'
                                } 
                            })}
                            
                        />
                        {errors.email && (
                            <p className="helper has-text-danger">{errors.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            className={`input ${errors.password && 'is-danger'}`} 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            {...register("password", {
                                required: 'password is required',  
                                minLength: {
                                    value: 6, 
                                    message: 'cannot be less then 6 digits'
                                }
                            })}
                            /*ref={register({ 
                                required: 'password is required',  
                                minLength: {
                                    value: 6, 
                                    message: 'cannot be less then 6 digits'
                                }
                            })} */
                        />
                        {errors.password && (
                            <p className="helper has-text-danger">{errors.password.message}</p>
                        )} 
                    </div>
                </div>
                <div className="control">
                    <button className="button is-fullwidth is-primary">Login</button>
                </div>
            </form>
        </div> 
    )
}