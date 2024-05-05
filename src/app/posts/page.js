"use client";
import Filter from '@/components/Filter';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import PostsInner from '@/components/PostsInner';
import React from 'react';

const Posts = () => {
  return (
    <>
    <Nav/>
    <Filter/>
    <PostsInner/>
    <Footer/>
    </>
  );
}

export default Posts;
