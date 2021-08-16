import React from 'react';
import { CenterSession } from '../components/CenterSession';
import { MostPopular } from '../components/MostPopular';
import { NavBar } from '../components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <CenterSession />
      <MostPopular />
    </>
  );
}
