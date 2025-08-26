import axios from "axios";
import { useEffect, useState } from "react";
import MyInformation from "../../MyInformation";

export interface IAuthUserList {
  _id: string;
  name: string;
  email: string;
  role: string;
}

function AuthHomePage() {
  const [users, setUsers] = useState<IAuthUserList[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/users/list", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});


        setUsers(response.data.users || []);
      } catch (error: any) {
        console.error("Error fetching users => ", error);
        setErrorMessage(
          error?.response?.data?.message ||
            "Failed to load users. Please log in again."
        );
      }
    }

    fetchData();
  }, []);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div>
      {users.map((user) => (
        <MyInformation
          key={user._id}
          id={user._id}
          name={user.name}
          email={user.email}
        />
      ))}
    </div>
  );
}

export default AuthHomePage;
