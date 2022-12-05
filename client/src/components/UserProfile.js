import React from 'react';

export default function UserProfile(props) {

    const logout = () => {  //登出
        global.auth.logout();
        props.close('logout');
    }

    return (
        <div className="user-profile">
            <p className="title has-text-centered">Profile</p>
            <fieldset disabled>
                <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.nickname} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.email} />
                    </div>
                </div>

                
                <hr class="hr-twill" />
                <div className="field">
                    <label className="label">我的回饋金</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={30} />
                    </div>
                </div>
                <br />
                
                <br />
                <div className="field">
                    <label className="label-line">歷史的訂單</label>
                </div>
                <br />
                <div className="field">
                    <label className="label">Type</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.type === "1" ? 'Manager' : 'General User'} />
                    </div>
                </div>
            </fieldset>

            <br />
            <br />
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        <button className="button is-danger" type="button" onClick={logout}>Logout</button>
                    </div>
                    <div className="control">
                        <button className="button" type="button" onClick={() => {props.close();}}>Cancel</button>   {/*函數式主鍵 props*/ }
                    </div>
                </div>
        </div>
    );
}