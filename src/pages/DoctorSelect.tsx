import { fetchData } from "../api/namedPersonApi";
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ListGroupGeneric from '../components/ListGroupGeneric';
import axios from 'axios';
import { Patient } from "../types/Patient";


const DoctorSelect: React.FC = () => {
    return (
        <div>
          <h1>Welcome: Dr</h1>
        </div>
    );
};

export default DoctorSelect;
