import { useState } from "react";
import '../styles/css/AddressChange.css';
import CustomRadioButton from "./common/CustomRadioButton";

const AddressCard = ( { destination, isDefaultAdd, receiver, phone, address, selected, onSelect } ) => {

    const handleChange = () => {
        onSelect(destination);
    }

    return (
        <div className="address-card">
            <div className="title">
                <div className="left-group">
                    <CustomRadioButton
                        label={destination}
                        name="addressGroup"
                        value="option1"
                        checked={selected == destination}
                        onChange={handleChange}
                    />
                    {isDefaultAdd && <span className='chip'>기본</span> }
                </div>
                <p className="register-btn">수정</p>
            </div>
            <div className="content-area">
                <p>{receiver}</p>
                <p>{phone}</p>
                <p>{address}</p>
            </div>
        </div>
    )
}


// 배송지변경 바텀시트
const AddressChange = ( { onClose, onSelect, selectedDestination } ) => {
    const [addressList, setAddressList] = useState([
        {
            destination: '집',
            receiver: '홍길동',
            phone: '010-1234-5678',
            address: '서울특별시 중구 퇴계로 265',
            detailAdd: 'B205',
            postalCode: '02000',
            isDefaultAdd: true,
            selectedOption: '',
            customDetailRequest: ''
        },
        {
            destination: '친구네',
            receiver: '김길동',
            phone: '010-1234-5678',
            address: '서울특별시 중구 퇴계로 265',
            detailAdd: 'B205',
            postalCode: '02000',
            isDefaultAdd: false,
            selectedOption: '',
            customDetailRequest: ''
        },
        {
            destination: '본가',
            receiver: '고길동',
            phone: '010-1234-5678',
            address: '서울특별시 중구 퇴계로 265',
            detailAdd: 'B205',
            postalCode: '02000',
            isDefaultAdd: false,
            selectedOption: '',
            customDetailRequest: ''
        },

    ])

    const handleSelect = (destination) => {
        const selectedAdd = addressList.find((addr) => addr.destination === destination);

        if(selectedAdd) {
            onSelect(selectedAdd);
        }
    }

    return (
        <div className="address-change">
            <div className="bottom-sheet-overlay" onClick={onClose}></div>
            <div className="address-bottom-sheet">
                <div className="header">
                    <p>배송지 변경</p>
                    <img src="/assets/button/btn_x2.svg" onClick={onClose} />
                </div>
                <hr />
                {addressList.map((address, index) => (
                        <AddressCard
                            key={index}
                            destination={address.destination}
                            isDefaultAdd={address.isDefaultAdd}
                            receiver={address.receiver}
                            phone={address.phone}
                            address={address.address}
                            selected={selectedDestination}
                            onSelect={handleSelect}
                        />
                    ))}
            </div>
        </div>
    )
}

export default AddressChange;