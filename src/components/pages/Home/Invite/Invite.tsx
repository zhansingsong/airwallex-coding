/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
// import useRequest, { APIs } from '@/components/Hooks/useRequest';
import { APIs } from '@/constant';
import useMountedState from '@/components/Hooks/useMountState';
import { ReactComponent as Spinnersvg } from '@/assets/spinner.svg';
import Alert from '../Alert/Alert';
import validatorForm, { FormValuesType } from './validatorForm';
import './Invite.scss';

const Invite = () => {
  const isMounted = useMountedState();
  const [alertVisibility, setAlertVisibility] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [sendButtonText, setSendButtonText] = useState<'send' | 'sending' | 'sended'>('send');
  const formValuesRef = useRef<FormValuesType>({});
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const confirmEmailInputRef = useRef<HTMLInputElement>(null);
  const clickCallback = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (alertVisibility === false) {
      setAlertVisibility(true);
    }
  };
  const submitCallback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isMounted() && setErrorMsg('');
    // console.log(formValuesRef.current);
    const errorMsg = validatorForm(formValuesRef.current);
    // 验证不通
    if (errorMsg) {
      isMounted() && setErrorMsg(errorMsg);
    } else {
      //
      isMounted() && setSendButtonText('sending');
      axios({
        url: APIs.validate,
        method: 'POST',
        data: {
          name: formValuesRef.current.name?.value,
          email: formValuesRef.current.email?.value,
        },
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          // eslint-disable-next-line no-debugger
          isMounted() && setSendButtonText('sended');
        })
        .catch((err) => {
          // eslint-disable-next-line no-debugger
          if (isMounted()) {
            setErrorMsg(err.response.data.errorMessage);
            setSendButtonText('send');
          }
        });
    }
  };
  const inputCallback = (type: keyof FormValuesType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      formValuesRef.current[type] = e.target;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inputFocusCallback = (type: keyof FormValuesType) => {
    // return (e: React.ChangeEvent<HTMLInputElement>) => {
    return () => {
      Array.from(document.querySelectorAll('.highlight')).forEach((ipt) =>
        ipt.classList.remove('highlight', 'animated', 'wobble')
      );
      isMounted() && setErrorMsg('');
    };
  };
  useEffect(() => {
    formValuesRef.current.name = nameInputRef.current!;
    formValuesRef.current.email = emailInputRef.current!;
    formValuesRef.current.confirmEmail = confirmEmailInputRef.current!;
  }, []);
  useEffect(() => {
    // 重置状态
    if (alertVisibility) {
      // eslint-disable-next-line no-debugger
      setErrorMsg('');
      setSendButtonText('send');
      formValuesRef.current.name && (formValuesRef.current.name.value = '');
      formValuesRef.current.email && (formValuesRef.current.email.value = '');
      formValuesRef.current.confirmEmail && (formValuesRef.current.confirmEmail.value = '');
    }
  }, [alertVisibility]);

  return (
    <div className="invite">
      <p className="invite-r1">A better way</p>
      <p className="invite-r2">to enjoy every day.</p>
      <p className="invite-r3">Be the first to know when we launch.</p>
      <a href="#" onClick={clickCallback} className="invite-btn" role="invite">
        Request an Invite <i className="iconfont icon-plane"></i>
      </a>
      <Alert title="Request an invite" visibility={alertVisibility} onChange={setAlertVisibility}>
        {sendButtonText !== 'sended' && (
          <form className="alert-form" onSubmit={submitCallback} data-testid="alertForm">
            <span className="input alert-form-name">
              <i className="iconfont icon-person"></i>
              <input
                className="ipt"
                type="text"
                onFocus={inputFocusCallback('name')}
                placeholder="name"
                onChange={inputCallback('name')}
                ref={nameInputRef}
              />
            </span>
            <span className="input alert-form-email">
              <i className="iconfont icon-email"></i>
              <input
                className="ipt"
                type="text"
                onFocus={inputFocusCallback('email')}
                placeholder="email"
                onChange={inputCallback('email')}
                ref={emailInputRef}
              />
            </span>
            <span className="input alert-form-confirm">
              <i className="iconfont icon-check"></i>
              <input
                className="ipt"
                type="text"
                placeholder="Confirm email"
                onChange={inputCallback('confirmEmail')}
                onFocus={inputFocusCallback('confirmEmail')}
                ref={confirmEmailInputRef}
              />
            </span>
            {sendButtonText === 'sending' ? (
              <span className="alert-form-submit disabled">
                <span>sending! please wait</span>
                <Spinnersvg className="svg"></Spinnersvg>
              </span>
            ) : (
              <input className="alert-form-submit" type="submit" value={sendButtonText} data-testid="submit" />
            )}
            <p className="alert-form-tip" data-testid="alertTip">
              {errorMsg}
            </p>
          </form>
        )}
      </Alert>
    </div>
  );
};

export default Invite;
