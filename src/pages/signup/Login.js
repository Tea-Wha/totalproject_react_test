import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import imgLogo from "../../images/kakaoLion.png";
import Button from "../../components/ButtonComponent";
import Input from "../../components/InputComponent";
import {Container, Items} from "../../components/SignupComponent";
import AxiosApi from "../../api/AxiosApi";
import Modal from "../../utils/Modal";
import Commons from "../../utils/Common";

const Img = styled.img`
  width: 180px;
  object-fit: cover;
`;

const Login = () => {
  // State for inputs
  const [inputUserId, setInputUserId] = useState("");
  const [inputPw, setInputPw] = useState("");
  // 모달창을 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창에 대한 문구
  const [modalContent, setModalContent] = useState("");

  const navigate = useNavigate();

  // State for validation
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  // 모달창 닫는 함수
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달창 confirm 동작 함수
  const confirmModal = () => {
    console.log("Confirm 버튼이 눌러 졌습니다.");
  };

  // Email and Password change handlers
  const handleInputChange = (e, setState, setValidState) => {
    setState(e.target.value);
    setValidState(e.target.value.length >= 5);
  };

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.login(inputUserId, inputPw);
      console.log(rsp.data);

      if (rsp.data.grantType === "Bearer") {
        console.log("액세스 토큰 : ", rsp.data.accessToken);
        console.log("리프레쉬 토큰 : ", rsp.data.refreshToken);
        Commons.setAccessToken(rsp.data.accessToken);
        Commons.setRefreshToken(rsp.data.refreshToken);
        navigate("/home");
      } else {
        setModalOpen(true);
        setModalContent("아이디 또는 패스워드 일치 하지 않습니다.");
      }
    } catch (e) {
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
    }
  };

  return (
    <Container>
      <Items variant="sign">
        <Img src={imgLogo} alt="Logo" />
      </Items>

      <Items margin="10px">
        <Input
          placeholder="아이디"
          value={inputUserId}
          onChange={(e) => handleInputChange(e, setInputUserId, setIsId)}
        />
      </Items>

      <Items margin="10px">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPw}
          onChange={(e) => handleInputChange(e, setInputPw, setIsPw)}
        />
      </Items>

      <Items margin="10px">
        {isId && isPw ? (
          <Button enabled onClick={onClickLogin}>
            SIGN IN
          </Button>
        ) : (
          <Button disabled>SIGN IN</Button>
        )}
      </Items>

      <Items variant="signup">
        <Link to="/Signup" className="link_style">
          <span>Sign Up</span>
        </Link>
      </Items>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="오류"
        type={true}
        confirm={confirmModal}
      >
        {modalContent}
      </Modal>
    </Container>
  );
};

export default Login;
