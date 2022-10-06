import React from 'react';
import './Footer.css';

const Footer = () => {

    return (
        <div class="flex flex-col h-screen justify-between" className="footer">
            <div className="flex justify-evenly flex-wrap">
                <div className="flex flex-col min-w-[22rem]">
                    <p className="text-2xl underline">Our Location</p>
                    <p>Sweden</p>
                    <p>Gothenburg</p>
                    <p>Lilla Bommen 5</p>
                </div>
                <div className="flex flex-col min-w-[22rem]">
                    <p className="text-2xl underline">Some Countries Boxinator Deliver To</p>
                    <p>England</p>
                    <p>Poland</p>
                    <p>Spain</p>
                </div>

                <div className="flex flex-col min-w-[22rem]">
                    <p className="text-2xl underline">Regular Support Questions</p>
                    <p>How long does a delivery take?</p>
                    <p>Can i track my delivery?</p>
                    <p>Can i update my account information?</p>
                </div>
            </div>
            <hr />
            <div className="row">
                <p className="col-sm">
                    &copy;{new Date().getFullYear()} BOXINATOR | All right reserved | Terms Of Service | Privacy
                </p>
            </div>
        </div>
    )
}

export default Footer