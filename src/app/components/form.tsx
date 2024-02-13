"use client";

import axios from "axios";
import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [content, setcontent] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("/api/users", {
      name,
      content,
    });
  };
  return (
    <div>
      <form>
        <input
          className="text-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          className="text-black"
          type="text"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
        <br />
        <button type="submit" onClick={onSubmit}>
          sub
        </button>
      </form>
    </div>
  );
};

export default Form;
