import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineUpload } from 'react-icons/ai'
import Loader from "../GeneralScreens/Loader";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import '../../Css/EditProfile.css'

const EditProfile = () => {
    const { activeUser, config } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [previousPhoto, setPreviousPhoto] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("username", username)
        formdata.append("email", email)
        formdata.append("photo", photo)

        try {
            const { data } = await axios.post("/user/editProfile", formdata, config)

            setSuccess('Edit Profile successfully ')
            setTimeout(() => {
                navigate('/profile')
            }, 1500)
        }
        catch (error) {
            setTimeout(() => {
                setError('')
            }, 7000)
            setError(error.response.data.error)
        }
    }

    useEffect(() => {
        setUsername(activeUser.username)
        setEmail(activeUser.email)
        setPreviousPhoto(activeUser.photo)
        setPhoto(activeUser.photo)
        setTimeout(() => {
            setLoading(false)
        }, 1050)
    }, [navigate, activeUser])

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className="Inclusive-editprofile-page">

                        <form onSubmit={handleSubmit}>
                            {error && <div className="error_msg">{error}</div>}

                            {success && <div className="success_msg">{success}  </div>}

                            <div className="input-wrapper">
                                <input type="text"
                                    id="username" placeholder="Username  " name='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label htmlFor="username">Username</label>

                            </div>

                            <div className="input-wrapper">

                                <input type="email"
                                    id="email" placeholder="Email  " name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="email">E-mail</label>

                            </div>

                            <div className="profile-ımg-upld-wrapper">

                                <div class="ProfilePhotoField">
                                    <FaUserAlt />
                                    <div class="txt">

                                        {photo === previousPhoto ?
                                            <div>
                                                <AiOutlineUpload />
                                                <span>
                                                    Change Profile Photo

                                                </span>
                                            </div>
                                            :
                                            photo.name
                                        }
                                    </div>
                                    <input
                                        name="photo"
                                        type="file"

                                        onChange={(e) => {
                                            setPhoto(e.target.files[0])
                                        }}
                                    />


                                </div>


                                <div class="currentImage">
                                    <div class="absolute">
                                        Currently Image
                                    </div>
                                    <img src={`https://mern-blog-api-v2.vercel.app/userPhotos/${previousPhoto}`} alt="userPhoto" />
                                </div>

                            </div>

                            <button type='submit' className='editprofile-btn'
                            >Edit Profile </button>



                        </form>







                    </div>
            }
        </>

    )
}

export default EditProfile;
