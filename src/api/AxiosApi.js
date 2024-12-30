import axios from "axios";
import Commons from "../utils/Common";
import AxiosInstance from "./AxiosInstance";
import JwtDecoding from "./jwtDecode";

const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 로그인
  login: async (userid, pwd) => {
    const login = {
      userId: userid,
      password: pwd,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },
  // 가입여부 확인
  regCheck: async (email) => {
    return await axios.get(KH_DOMAIN + `/auth/exists/${email}`);
  },
  // 회원 가입
  signup: async (userid, email, pwd, name) => {
    console.log("아이디 : ", userid);
    console.log("이메일 : ", email);
    console.log("패스워드 : ", pwd);
    console.log("이름 : ", name);
    const member = {
      userId: userid,
      email: email,
      password: pwd,
      nickname: name,
    };
    return await axios.post(KH_DOMAIN + `/user/signup`, member);
  },
  // 전체 회원 조회
  memberList: async () => {
    return await AxiosInstance.get("/user");
  },
  // 개별 회원 조회
  memberInfo: async (id) => {
    console.log("Access Token:", Commons.getAccessToken());
    const sub = JwtDecoding.getField("sub");
    console.log("Sub : ", sub);
    const nickname = JwtDecoding.getField("nickname");
    console.log("Nickname : ", nickname);
    const authorities = JwtDecoding.getField("authorities");
    console.log("Authority : ", authorities);
    return await axios.get(KH_DOMAIN + `/user/${id}`, {
      headers: {
        Authorization: `Bearer ${Commons.getRefreshToken()}`,
      },
    });
  },
  // 채팅방 목록 가져오기
  chatList: async () => {
    return await axios.get(KH_DOMAIN + `/chat/list`);
  },
  // 채팅방 생성하기
  chatCreate: async (email, name) => {
    console.log(email, name);
    const chat = {
      email: email,
      name: name,
    };
    return await axios.post(KH_DOMAIN + `/chat/new`, chat);
  },

  // 채팅방 정보 가져오기
  chatDetail: async (roomId) => {
    return await axios.get(KH_DOMAIN + `/chat/room/${roomId}`);
  },
};

export default AxiosApi;
