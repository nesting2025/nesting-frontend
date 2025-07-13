import React, { useState } from 'react';
import '../styles/css/AddressRegister.css';
import { useNavigate } from "react-router-dom";

const AddressRegister = () => {
  const navigate = useNavigate();

  // 커스텀 드롭다운 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

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
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="address-register-page">
      <div className="page-title">
        배송지 등록
        <button className="close-btn" onClick={() => navigate(-1)}>×</button>
      </div>

      <div className="form-group">
        <label>배송지명<span className="required">*</span></label>
        <input type="text" placeholder="ex) 집, 회사 (최대 10자)" />
      </div>

      <div className="form-group">
        <label>받는 분<span className="required">*</span></label>
        <input type="text" placeholder="최대 10자로 작성해 주세요" />
      </div>

      <div className="form-group">
        <label>연락처<span className="required">*</span></label>
        <input type="text" placeholder="010-0000-0000" />
      </div>

      <div className="form-group">
        <label>주소<span className="required">*</span></label>
        <div className="address-row">
          <input type="text" placeholder="주소를 검색해 주세요" disabled />
          <button className="search-btn">주소 검색</button>
        </div>
        <input type="text" placeholder="상세주소를 입력해 주세요" style={{ marginTop: '16px' }} />
        <div className="checkbox-row" style={{ marginTop: '12px' }}>
          <input type="checkbox" id="defaultAddress" />
          <span htmlFor="defaultAddress">기본 배송지로 설정</span>
        </div>
      </div>

      <div className="form-group">
        <label>요청사항</label>
        <div className={`custom-select ${isOpen ? 'open' : ''}`}>
          <div className={`select-styled ${selectedOption ? '' : 'defaultOption'}`} onClick={toggleDropdown}>
            <span>{selectedOption || '배송 요청사항 (선택)'}</span>
            <i className="arrow"></i>
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
        </div>
      </div>

      <div className="info-text">*확인 버튼을 눌러야 배송지 정보가 저장됩니다</div>

      <button className="submit-btn" disabled>확인</button>
    </div>
  );
};

export default AddressRegister;
