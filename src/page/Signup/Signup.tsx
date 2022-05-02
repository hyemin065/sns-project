import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('');

  const regEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const regPassword = /^(?=.*[A-Za-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const navigate = useNavigate();

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    console.log(e.target.value, e.currentTarget.value);
  };

  const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const checkEmail = async () => {
    if (regEmail.test(email.toLocaleLowerCase())) {
      setEmailErrorMessage('');
      const body = { email };
      try {
        const response = await axios.post(
          `https://studyserverjh.herokuapp.com/users/signup/emailCheck`,
          body,
        );
        setEmailErrorMessage(response.data.message);
      } catch (e: any) {
        setEmailErrorMessage(e.response.data.message);
      }
    } else {
      setEmailErrorMessage('이메일 형식이 올바르지 않습니다');
    }
  };

  const checkNickName = async () => {
    const body = { nickName };
    if (nickName.length < 4) {
      setNickNameErrorMessage('4글자 이상 입력해주세요');
    } else {
      try {
        const response = await axios.post(
          `https://studyserverjh.herokuapp.com/users/signup/nickNameCheck`,
          body,
        );
        setNickNameErrorMessage(response.data.message);
      } catch (e: any) {
        setNickNameErrorMessage(e.response?.data.message);
      }
    }
  };

  const checkPassword = () => {
    if (!regPassword.test(password)) {
      setPasswordErrorMessage('영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요');
      return;
    } else {
      setPasswordErrorMessage('');
    }
  };

  const checkConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordErrorMessage('비밀번호가 다릅니다');
      return;
    } else {
      setConfirmPasswordErrorMessage('');
    }
  };

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { email, password, nickName, profile: '' };
    try {
      const response = await axios.post(`https://studyserverjh.herokuapp.com/users/signup`, body);
      console.log(response);
      setEmail('');
      setNickName('');
      setPassword('');
      setConfirmPassword('');
      alert('회원가입이 완료되었습니다');
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={signupHandler}>
      <div>
        <label htmlFor="">이메일</label>
        <input type="email" value={email} onChange={changeEmail} onBlur={checkEmail} />
        <span>{emailErrorMessage}</span>
      </div>

      <div>
        <label htmlFor="">닉네임</label>
        <input type="text" value={nickName} onChange={changeNickName} onBlur={checkNickName} />
        <span>{nickNameErrorMessage}</span>
      </div>

      <div>
        <label htmlFor="">비밀번호</label>
        <input type="password" value={password} onChange={changePassword} onBlur={checkPassword} />
        <span>{passwordErrorMessage}</span>
      </div>

      <div>
        <label htmlFor="">비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={changeConfirmPassword}
          onBlur={checkConfirmPassword}
        />
        <span> {confirmPasswordErrorMessage}</span>
      </div>
      <button type="submit">회원가입하기</button>
    </form>
  );
};

export default Signup;
