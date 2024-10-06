//import { useState } from "react";
import { TwitterFollowCard } from "../TwitterFollowCard";
import "./App.css";

const users = [
  {
    userName: "javierDt1974",
    isFollowing: true,
    name: "Javier Rojas ",
  },
  {
    userName: "batman",
    isFollowing: false,
    name: "Batman",
  },
  {
    userName: "gandalf",
    isFollowing: true,
    name: "Gandalf",
  },
];

export function App() {
  /*   const [name, setName] = useState("Javier Rojas");
  const formatUserName = (userName) => `@${userName}`; */

  return (
    <div className="App">
      {users.map((user) => {
        const { userName, name, isFollowing } = user;
        return (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        );
      })}
    </div>
  );
}
