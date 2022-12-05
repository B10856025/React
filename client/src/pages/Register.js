import React from 'react';
import { useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register(props){

    const { register, handleSubmit,  formState: { errors }  } = useForm();   //返回一個對象
    const navigate = useNavigate();
    const onSubmit = async data => {
        //1.阻止默認事件行為 
        //event.preventDefault();
        //2.獲取表單數據
        //console.log(this.emailRef.current.value);
        /*const formData ={
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value
        }*/
        //console.log(data);
        //3.處理註冊邏輯
        
        try {
            const { nickname, email, password } = data;
            await axios.post('/api/register', { nickname, email, password, type: 0 });   //post的請求
            // console.log('Safe');
            // console.log(res.status);
            // console.log('res:', res);
            // console.log('res.data:', res.data);
            // const jwToken = res.data;   //註冊成功會獲得一個jwToken

            // global.auth.setToken(jwToken) ;  //保存jwToken在本地瀏覽器的存儲
            // console.log('123',jwToken);
            toast.success('Register Success, and Login Again!');
            // //4.跳到首頁
            navigate('/login');
            
        } catch (error) {
            console.log(error.response.data.message);
            const message = error.response.data.message;
            toast.error(message);
        }
        //4.跳到首頁
        //this.props.history.push("/cart");
    };

    return(
        <div className="login-wrapper">
        
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label-out">註冊</label>
                    <hr class="hr-twill" />
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input 
                            className={`input $ {errors.nickname && 'is-danger'}`} 
                            type="text" 
                            placeholder="Nickname" 
                            name="nickname" 
                            {...register("nickname", {
                                required: 'nickname is required'
                            })}
                        />
                        {errors.nickname && (
                            <p className="helper has-text-danger">{errors.nickname.message}</p>
                        )}
                    </div>
                </div>

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
                                    value: 4, 
                                    message: 'cannot be less then 4 digits'
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
                    <button className="button is-fullwidth is-primary">Submit</button>
                </div>
            </form>
        </div> 
    )
}
