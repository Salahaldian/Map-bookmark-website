import '../css/signUp.css'
import logo from '../logos/logo_1.svg'
import person2 from '../images/person2.png'
import React, { useState } from 'react';
import fetcher from '../lib/fetcher';

export default function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); // حالة الخطأ

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setError(true); // ضبط حالة الخطأ على القيمة الحقيقية
      return; // عدم تنفيذ عملية الإرسال إذا كانت البيانات غير صحيحة
    }
    // تنفيذ عملية إنشاء الحساب
    const accountData = { username, email, password };
    try {
      const response = await fetcher('/users/signup', {
        method: 'POST',
        body: JSON.stringify(accountData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        console.log('Account created successfully');
        // تنفيذ أي إجراءات إضافية بعد إنشاء الحساب بنجاح
      } else {
        console.log('Failed to create account');
        // تنفيذ إجراءات إضافية في حالة فشل إنشاء الحساب
      }
    } catch (error) {
      console.log('Error creating account:', error);
      // تنفيذ إجراءات إضافية في حالة حدوث خطأ أثناء إنشاء الحساب
    }

    // توجيه المستخدم إلى الصفحة التالية بعد إنشاء الحساب
    // قم بتعديل الرابط الذي ترغب في توجيه المستخدم إليه
    window.location.href = '/login';
    setError("") ;

  };
  return (
    <div className="signup-page">
      <div className="header">
        <div className="container">
          <div className="nav-left">
            <div className="img-logo">
              <a href="./"><img decoding="async" className="logo" src={logo} alt="" /></a>
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
            <h3>Create Account</h3>
            <p>Fill out the form to join us</p>
            <form action="" className="login-form" onSubmit={handleSubmit} >
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                className="input-name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                className="input-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">passowrd</label>
              <input
                type="password"
                placeholder="Your Password"
                name="password"
                className="input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <span className="error-message">يرجى ملء جميع الحقول</span>} {/* عرض رسالة الخطأ إذا كانت موجودة */}

              <input type="submit" name="submit" value="Sign Up" className="submit" />

            </form>
            <div className="creat-acc">
              <p>Already hacve  account?  <a href="./login">sign in</a> </p>
            </div>
          </div>
          <div className="right-div">
            <img src={person2} alt="" />
          </div>
        </div>
      </div>
      <div className="footer">
        map project &copy; 2023 All Rights Reserved
      </div>
    </div>
  );
}
