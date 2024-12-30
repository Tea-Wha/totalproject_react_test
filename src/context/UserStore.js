import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  // 배경색에 대한 전역 상태 관리, 새로고침 문제를 해결하기 위해 로컬스토리지 사용
  const [color, setColor] = useState(
    localStorage.getItem("bgcolor") || "orange"
  );
  const [name, setName] = useState(
    localStorage.getItem("name") || "이름을 입력해주세요"
  );
  useEffect(() => {
    localStorage.setItem("bgcolor", color);
  }, [color]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  return (
    <UserContext.Provider value={{ color, setColor, name, setName }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
