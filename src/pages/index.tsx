import React from 'react';
import { RightSide } from '../components/RightSide';
import { NavBar } from '../components/NavBar';
import { MainHome } from '../components/MainHome';

export default function Home() {
  return (
    <>
      <NavBar />
      <MainHome />
      <RightSide />
    </>
  );
}
