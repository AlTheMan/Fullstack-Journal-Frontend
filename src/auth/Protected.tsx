import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface ProtectedProps {
  token: string | null;
}

const Protected: React.FC<ProtectedProps> = ({ token }) => {
  const isRun = useRef(false);
  const [data, setData] = useState<string[] | null>(null);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("/documents", config)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [token]); // Added token as a dependency here

  return data ? (
    <>
      {data.map((rec: string, i: number) => (
        <h3 key={i}>{rec}</h3>
      ))}
    </>
  ) : (
    <div>Protected</div>
  );
};

export default Protected;
