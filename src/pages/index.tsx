import React from 'react';
import { Hero } from '../components/Hero';
import { RightAside } from '../components/RightAside';
import { NavBar } from '../components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <RightAside />
    </>
  );
}
