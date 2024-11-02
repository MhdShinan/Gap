import React from 'react';
import MUthantication from '../MobileAuthentication/Img/verification.png';
import Mobile_image from '../MobileAuthentication/Img/mobileicon.png';


const MobileAuthentication = () => {
    return (
        <>
        <section className=''>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-5 vh-100 custom-bg d-flex align-items-center justify-content-center'>
                            <div class="vh-100 text-center">
                                <img src={MUthantication} alt='Your Image' className='img-fluid custom-image-LI mx-auto d-block' />
                               
                            </div>
                        </div>
                        <div className='col-lg-7 vh-100 '>
                            <img src={Mobile_image} alt='Your Image' className='img-fluid img-fluid custom-image-ULock mx-auto d-block ' />
                            <h1 className='text-center mt-4'>Enter Your Mobile Number</h1>
                            <h4 className='text-center mb-5 '>We will send you the verification code</h4>
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <div class="form-outline">
                                        <div class="input-group mb-4 ">
                                            {/* <select class="form-select form-select-lg" id="countryCode" aria-label="Country Code">
                                                <option value="+1">+1 (United States)</option>
                                                <option value="+44">+44 (United Kingdom)</option>

                                            </select> */}
                                            <input type="tel" id="inputBasicExample" class="form-control form-control-lg" placeholder="Telephone" maxLength="10" />
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn custom-button-reset my-1 my-sm-3" type="submit">Generate OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>       
        </>
    )
}

export default MobileAuthentication;