const Usage = () => {
    return ( 
        <div className="usage">
            <h1 className="shead bhead">
                Welcome to usage documentaion !!
            </h1>
            <div className="useageContainer">
                <div className="useageBlog">
                    <h2 className="xshead bhead">How to create account ?</h2>
                    <img src="/tgsignup.png" alt="tgsignup" />
                    <p className=" dtext mtext">
                        fill out all field then click the sign-up button it will lead you the to verification page and ask for verification code it will send to the email address which you tried to create acount with take a look at the verification page img below 
                    </p>
                </div>
                <div className="useageBlog">

                    <h2 className="xshead bhead">Note :</h2>
                    <p className="note yellowNote" >Notice you can click the cncel button to edit your Info before verify it in case you needed also you use resend button in case you do not recieve a verification</p>
                    <img src="/tgverify1.png" alt="verification" />
                    <p className="mtext dtext">
                        just enter the verification Code which you have recieved from TG-news to verify your account mean "Activate" <span style={{color:'rgb(246, 5, 150)'}}> Please notice the verification code will be expired within an hour if you don't use it</span> if it has expried before using it just try to sign-up again and you will recieve another verification code just simply use the new one to activate you account !!!
                    </p>
                </div>
                <div className="useageBlog">
                    <h2 className="xshead bhead">How to Log In ?</h2>
                    <img src="/tglogin.png" alt="tglogin" />
                    <p className="mtext dtext">you can log in by use you email acount and password just on forgot password link in case you forgot your password it will send you a verification code and automatically lead you to verification page to verify your acount with the code which has just send to your email address !!</p>
                </div>
                <div className="useageBlog">
                    <h2 className="xshead bhead">Can i edit my profile Info ?</h2>
                    <p className="mtext dtext">
                        yes off course you have full freedome to deal with whatever you have created edit ,delete ,create ,also you can like or comment others post and they do the same with yours 
                    </p>
                </div>
                <div className="useageBlog">
                    <h2 className="xshead bhead">What if i don't get the verification code ?</h2>
                    <p className="mtext dtext">
                        just try the resend button to  resend you verification code in case you get it for the second time click the cancel button and retype your info carefully and then click sign-up button <span style={{color:"rgb(246, 5, 150)"}}> "Please check your Email carefully cause you are not getting verification Code if you entered a wrong email" </span>
                    </p>
                </div>
                <div className="useageBlog">
                    <h2 className="xshead bhead">Can everyone see what i publish ?</h2>
                    <p className="mtext dtext">
                        absolutely anyone can anyones post and can likes and comment <span style={{color:"rgb(246, 5, 150)"}}> " but no one can validate someone's post ,comment or like " </span> so no wories about editing or deleting your belonging by anyone else except you !!
                    </p>
                    <p className="mtxt dtext">

                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default Usage;