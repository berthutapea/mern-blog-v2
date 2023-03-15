import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Css/ChangePassword.css'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

const ChangePassword = () => {

    const [isRevealPass1, setIsRevealPass1] = useState(false)
    const [isRevealPass2, setIsRevealPass2] = useState(false)
    const [isRevealPass3, setIsRevealPass3] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            const { data } = await axios.put(
                "/user/changePassword",
                {
                    newPassword,
                    oldPassword
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            setSuccess(data.message);
            setTimeout(() => {
                setError("");
            }, 5800);
        }
        catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5800);
        }

    }



    return (
        <div className="Inclusive-changePass-page" >
            <form onSubmit={handleSubmit}>
                {error && <div className="error_msg">{error}</div>}
                {success && <div className="success_msg">{success}<Link to="/profile">Go Profile</Link>  </div>}


                <div className="input-wrapper">

                    <input type={isRevealPass1 ? "text" : "password"}
                        autoComplete='off'
                        id="old_password" placeholder="Old Password  " name='old_password'
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <i onClick={() => (setIsRevealPass1(!isRevealPass1))}>
                        {isRevealPass1 ? <IoEyeOffOutline /> : <IoEyeOutline />
                        }
                    </i>
                    <label htmlFor="old_password">Old Password </label>

                </div>

                <div className="input-wrapper">
                    <input type={isRevealPass2 ? "text" : "password"}
                        id="new_password"
                        autoComplete='off'
                        placeholder="New Password  " name='new_password'
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <i onClick={() => (setIsRevealPass2(!isRevealPass2))}>
                        {isRevealPass2 ? <IoEyeOffOutline /> : <IoEyeOutline />
                        }
                    </i>
                    <label htmlFor="new_password">New Password </label>
                </div>

                <div className="input-wrapper">
                    <input type={isRevealPass3 ? "text" : "password"}
                        id="confirm_password"
                        autoComplete='off'
                        placeholder="Confirm Password  " name='confirm_password'
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <i onClick={() => (setIsRevealPass3(!isRevealPass3))}>
                        {isRevealPass3 ? <IoEyeOffOutline /> : <IoEyeOutline />
                        }
                    </i>
                    <label htmlFor="confirm_password">Confirm Password </label>
                </div>

                <button type='submit' className='updatePass-btn'
                >Update Password </button>

            </form>

        </div>

    )
}

export default ChangePassword;
