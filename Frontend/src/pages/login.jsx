import '../css/login.css'
import logo from '../logos/logo_1.svg'
import person1 from '../images/person1.png'
import React, { useState } from 'react';
import fetcher from "../lib/fetcher";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // حالة الرسالة خطأ

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetcher("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.success) {
        // يمكنك هنا عرض رسالة خطأ للمستخدم
        setErrorMessage("اسم المستخدم أو كلمة المرور غير صحيحة."); // تعيين رسالة الخطأ
        console.error("حدث خطأ أثناء تسجيل الدخول: اسم المستخدم أو كلمة المرور غير صحيحة.");
      } else {
        // تسجيل الدخول الناجح - انتقال إلى الصفحة التالية
        console.log("تسجيل الدخول الناجح!");
        console.log("معلومات المستخدم:", response);
        setErrorMessage(""); // حذف رسالة الخطأ

        // قم بتوجيه المستخدم إلى الصفحة التالية هنا
        window.location.href = '/map'; // توجيه المستخدم إلى صفحة اللوحة بعد تسجيل الدخول الناجح

        // ستحتاج إلى استخدام مكتبة التوجيه المناسبة لتحقيق ذلك
      }
    } catch (error) {
      // عدم نجاح تسجيل الدخول - عرض رسالة الخطأ
      setErrorMessage("حدث خطأ أثناء تسجيل الدخول."); // تعيين رسالة الخطأ
      console.error("حدث خطأ أثناء تسجيل الدخول:", error);
    }
  };
  return (
    <div className="login-div">
      <div className="header">
        <div className="container">
          <div className="nav-left">
            <div className="img-logo">
              <a href="./">
                <img
                  decoding="async"
                  className="logo"
                  src={logo}
                  alt=""
                />
              </a>
            </div>
            <div className="left-link">
              <a href="">Map</a>
              <a href="">Favorite</a>
            </div>
          </div>
          <div className="nav-right">
            <div className="right-link">
              <a href="./signup">Create account</a>
              <a href="./login">Login</a>
            </div>
          </div>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <div className="left-div">
            <p>Hey You</p>
            <p>LogIn With Us</p>
            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="">Username</label>
              <input
                type="text"
                placeholder="Your Username"
                name="username"
                className="input-email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="">Password</label>
              <input
                type="text"
                placeholder="Your Password"
                name="password"
                className="input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <span className="error-message">{errorMessage}</span>} {/* عرض رسالة الخطأ إذا كانت موجودة */}

              <input
                type="submit"
                name="submit"
                value="sign in"
                className="submit"
              />
            </form>
            <div className="creat-acc">
              <p>
                Don't have an account? <a href="./signup">Create account</a>{" "}
              </p>
            </div>
          </div>
          <div className="right-div">
            <img src={person1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
