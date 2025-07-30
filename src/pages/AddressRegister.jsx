import React, { useMemo, useState } from 'react';
import '../styles/css/AddressRegister.css';
import { useNavigate } from "react-router-dom";
import CustomCheckbox from '../components/common/CustomCheckbox';

const AddressRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destination: '',
    receiver: '',
    phone: '',
    address: '',
    detailAdd: '',
    postalCode: '',
    isDefaultAdd: false,
    selectedOption: '',
    customDetailRequest: ''
  });
  // 커스텀 드롭다운 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const isFormValid = useMemo(() => {
    const isVallid = 
      !!form.destination.trim() && 
      !!form.receiver.trim() && 
      !!form.phone.trim() && 
      !!form.address.trim() &&
      !!form.postalCode.trim();

    return isVallid;
  }, [form]);

  const options = [
    '부재 시 경비실에 맡겨주세요',
    '부재 시 문 앞에 놓아주세요',
    '배송 전에 연락주세요',
    '빠른 배송 부탁드려요',
    '보관함에 넣어주세요',
    '무인 택배함에 보관해주세요',
    '직접 입력',
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = (option) => {
    setForm(prev => ({...prev, selectedOption: option}))
    setIsOpen(false);
  };

  const handleAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setForm(prevForm => ({
          ...prevForm,
          address: data.roadAddress,
          postalCode: data.zonecode
        }));
      }
    }).open();
  };

  const handleSubmit = () => {
    navigate('/order', {state: form});    
  }

  return (
    <div className="address-register-page">
      <div className="page-title">
        배송지 등록
        <button className="close-btn" onClick={() => navigate(-1)}>×</button>
      </div>

      <div className="form-group">
        <label>배송지명<span className="required">*</span></label>
        <input type="text" placeholder="ex) 집, 회사 (최대 10자)" value={form.destination}
        onChange={(e) => setForm(prev => ({...prev, destination: e.target.value}))} />
      </div>

      <div className="form-group">
        <label>받는 분<span className="required">*</span></label>
        <input type="text" placeholder="최대 10자로 작성해 주세요" value={form.receiver}
        onChange={(e) => setForm(prev => ({...prev, receiver: e.target.value}))} />
      </div>

      <div className="form-group">
        <label>연락처<span className="required">*</span></label>
        <input type="text" placeholder="010-0000-0000" value={form.phone}
        onChange={(e) => setForm(prev => ({...prev, phone: e.target.value}))} />
      </div>

      <div className="form-group">
        <label>주소<span className="required">*</span></label>
        <div className="address-row">
          <input type="text" placeholder="주소를 검색해 주세요" value={form.address} disabled />
          <button className="search-btn" onClick={handleAddress}>주소 검색</button>
        </div>
        <input 
          type="text" placeholder="상세주소를 입력해 주세요" style={{ marginTop: '16px', marginBottom: '12px' }} 
          value={form.detailAdd}
          onChange={(e) => setForm(prev => ({...prev, detailAdd: e.target.value}))}/>
        <CustomCheckbox
          label="기본 배송지로 설정"
          checked={form.isDefaultAdd}
          onChange={(e) => setForm(prev => ({...prev, isDefaultAdd: e.target.checked}))}
          name="set-default-address"
        />
      </div>

      <div className="form-group">
        <label>요청사항</label>
        <div className={`custom-select ${isOpen ? 'open' : ''}`}>
          <div className={`select-styled ${form.selectedOption ? '' : 'defaultOption'}`} onClick={toggleDropdown}>
            <span>{form.selectedOption || '배송 요청사항 (선택)'}</span>
            <img className='arrow' src={isOpen ? '/assets/button/btn_dropup.svg' : '/assets/button/btn_dropdown.svg'} />
          </div>
          {isOpen && (
            <ul className="select-options">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          {form.selectedOption==='직접 입력' && 
          <input 
            className='input-address-option' type="text" placeholder="배송 기사님에게 전달돼요 (최대 100자)" 
            value={form.customDetailRequest}
            onChange={(e) => setForm(prev => ({...prev, customDetailRequest: e.target.value}))}/>}
        </div>
      </div>

      <div className="info-text">*확인 버튼을 눌러야 배송지 정보가 저장됩니다</div>

      <button className={`submit-btn ${isFormValid ? 'active' : ''}`} disabled={!isFormValid} onClick={handleSubmit}>확인</button>
    </div>
  );
};

export default AddressRegister;