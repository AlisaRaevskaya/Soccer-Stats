import React from "react";

export default function Main() {
    return (
        <div>
            <div className="main-background">
                <div className="main-box">
                    <div className="main-logo"></div>

                    <div className="">
                        <form>
                            <div>
                                <label htmlFor="login">Login</label>
                                <input type="text" name="Login" id="login" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="text" name="Password" id="password" />
                            </div>
                            <div>
                                <button>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    );
}
