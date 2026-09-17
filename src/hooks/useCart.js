import React from 'react'
import { useContext } from 'react'
import {cartContext1} from "../context/CartContext"


export const useCart=()=>useContext(cartContext1)
