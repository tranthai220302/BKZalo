import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>𝔹𝕂 ℤ𝕒𝕝𝕠</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80.5% 10%;
  overflow: hidden;
  background-color: rgba(255,255,255,1);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: 2px solid rgba(1,1,1,0.5);
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    box-shadow: 2px 4px 4px rgba(0, 0,0, 0.3);
    img {
      height: 4.5rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.9rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: ;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: rgba(255,255,255,0.1);
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
  
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: rgba(0,0,0,0.6);
        }
      }
    }
    .selected {
      background-color: rgba(0,0,0,0.2);
    }
  }

  .current-user {
    background-color: rgba(1,1,1,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: rgba(1,1,1, 1);
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
