import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Keycloak from "keycloak-js";


interface ProtectedProps {
  client: Keycloak | null;
}

const Protected: React.FC<ProtectedProps> = ({ client }) => {
  const isRun = useRef(false);
  const [data, setData] = useState<string[] | null>(null);

  const clientInfo = async () => {
    
    await client?.loadUserProfile().then(function(profile) {
        console.log(profile.id)
    })

    console.log(client?.hasRealmRole("Patient"))

  }

  useEffect(() => {
    clientInfo();
  })

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const config = {
      headers: {
        authorization: `Bearer ${client?.token}`,
      },
    };

    axios
      .get("/documents", config)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [client?.token]); // Added token as a dependency here

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
