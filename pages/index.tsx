import Home from '@/components/Home'
import React from 'react'
import i18n from '@/assets/i18n/home.json'
export default function index(props: { i18n: object }) {
  return <Home i18n={props.i18n} />  
}

export async function getStaticProps() {
  return {
    props: {
      i18n
    }
  }
}