import React from 'react';
import { RightAside } from '../components/RightAside';
import { NavBar } from '../components/NavBar';
import { MainHome } from '../components/MainHome';

export default function Home() {
  return (
    <>
      <NavBar />
      <MainHome />
      <RightAside />
    </>
  );
}
