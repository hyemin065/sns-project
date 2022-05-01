import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    console.log(e.target.value, e.currentTarget.value);
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const signupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regExp.test(email.toLocaleLowerCase())) {
      setErrorMessage('이메일 형식이 올바르지 않습니다');
    }
  };

  return (
    <form onSubmit={signupHandler}>
      <div>
        <label htmlFor="">이메일</label>
        <input type="email" value={email} onChange={changeEmail} />
        <span>{errorMessage}</span>
      </div>

      <div>
        <label htmlFor="">닉네임</label>
        <input type="text" value={nickname} onChange={changeNickname} />
      </div>

      <div>
        <label htmlFor="">비밀번호</label>
        <input type="password" value={password} onChange={changePassword} />
      </div>

      <div>
        <label htmlFor="">비밀번호 확인</label>
        <input type="password" value={confirmPassword} onChange={changeConfirmPassword} />
      </div>
      <button type="submit">회원가입하기</button>
    </form>
  );
}

export default App;
