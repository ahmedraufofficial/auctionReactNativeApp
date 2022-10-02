import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import { Text } from 'react-native-paper';
import Body from '../../../assets/images/bodyBW.png';
import BRDwhite from '../../../assets/images/BRDwhite.png';
import BRDyellow from '../../../assets/images/BRDyellow.png';
import BRDgreen from '../../../assets/images/BRDgreen.png';
import BRDred from '../../../assets/images/BRDred.png';
import BLDred from '../../../assets/images/BLDred.png';
import BLDgreen from '../../../assets/images/BLDgreen.png';  
import BLDyellow from '../../../assets/images/BLDyellow.png';
import BLDwhite from '../../../assets/images/BLDwhite.png';  
import Fred from '../../../assets/images/Fred.png';
import Fgreen from '../../../assets/images/Fgreen.png';
import Fyellow from '../../../assets/images/Fyellow.png';
import Fwhite from '../../../assets/images/Fwhite.png';
import Rred from '../../../assets/images/Rred.png';
import Rgreen from '../../../assets/images/Rgreen.png';
import Ryellow from '../../../assets/images/Ryellow.png';
import Rwhite from '../../../assets/images/Rwhite.png';
import BLred from '../../../assets/images/BLred.png';
import BLgreen from '../../../assets/images/BLgreen.png';
import BLyellow from '../../../assets/images/BLyellow.png';
import BLwhite from '../../../assets/images/BLwhite.png';
import BRred from '../../../assets/images/BRred.png';
import BRgreen from '../../../assets/images/BRgreen.png';
import BRyellow from '../../../assets/images/BRyellow.png';
import BRwhite from '../../../assets/images/BRwhite.png';
import FLDred from '../../../assets/images/FLDred.png';
import FLDgreen from '../../../assets/images/FLDgreen.png';
import FLDyellow from '../../../assets/images/FLDyellow.png';
import FLDwhite from '../../../assets/images/FLDwhite.png';
import FLred from '../../../assets/images/FLred.png';
import FLgreen from '../../../assets/images/FLgreen.png';
import FLyellow from '../../../assets/images/FLyellow.png';
import FLwhite from '../../../assets/images/FLwhite.png';
import FRDred from '../../../assets/images/FRDred.png';
import FRDgreen from '../../../assets/images/FRDgreen.png';
import FRDyellow from '../../../assets/images/FRDyellow.png';
import FRDwhite from '../../../assets/images/FRDwhite.png';
import FRred from '../../../assets/images/FRred.png';
import FRgreen from '../../../assets/images/FRgreen.png';
import FRyellow from '../../../assets/images/FRyellow.png';
import FRwhite from '../../../assets/images/FRwhite.png';
import FBwhite from '../../../assets/images/FBwhite.png';
import FBred from '../../../assets/images/FBred.png';
import FByellow from '../../../assets/images/FByellow.png';
import FBgreen from '../../../assets/images/FBgreen.png';
import RBwhite from '../../../assets/images/RBwhite.png';
import RBred from '../../../assets/images/RBred.png';
import RByellow from '../../../assets/images/RByellow.png';
import RBgreen from '../../../assets/images/RBgreen.png';
import Mwhite from '../../../assets/images/Mwhite.png';
import Mred from '../../../assets/images/Mred.png';
import Myellow from '../../../assets/images/Myellow.png';
import Mgreen from '../../../assets/images/Mgreen.png';


import Theme from '../Theme';
import { useEffect } from 'react';


const CustomBlueprint = ({colors}) => {


  const {height} = useWindowDimensions();

  const [BLD, setBLD] = useState(BLDwhite);
  const [F, setF] = useState(Fwhite);      
  const [R, setR] = useState(Rwhite);      
  const [BL, setBL] = useState(BLwhite);   
  const [BR, setBR] = useState(BRwhite);   
  const [FLD, setFLD] = useState(FLDwhite);
  const [FL, setFL] = useState(FLwhite);   
  const [FRD, setFRD] = useState(FRDwhite);
  const [FR, setFR] = useState(FRwhite);
  const [BRD, setBRD] = useState(BRDwhite);
  const [FB, setFB] = useState(FBwhite);
  const [RB, setRB] = useState(RBwhite);
  const [M, setM] = useState(Mwhite);

  const colorize = () => {
    for (const [key, value] of Object.entries(colors)) {
      if (key === "BLD"){
        if (value === 'green') {
          setBLD(BLDgreen)
        } else if (value === 'yellow'){
          setBLD(BLDyellow)
        } else if (value === 'red') {
          setBLD(BLDred)
        } else {
          setBLD(BLDwhite)
        }
      } else if (key === "F"){
        if (value === 'green') {       
          setF(Fgreen)
        } else if (value === 'yellow'){
          setF(Fyellow)
        } else if (value === 'red') {  
          setF(Fred)
        } else {
          setF(Fwhite)
        }
      } else if (key === "R"){
        if (value === 'green') {
          setR(Rgreen)
        } else if (value === 'yellow'){
          setR(Ryellow)
        } else if (value === 'red') {
          setR(Rred)
        } else {
          setR(Rwhite)
        }
      } else if (key === "BL"){
        if (value === 'green') {
          setBL(BLgreen)
        } else if (value === 'yellow'){
          setBL(BLyellow)
        } else if (value === 'red') {
          setBL(BLred)
        } else {
          setBL(BLwhite)
        }
      } else if (key === "BR"){
        if (value === 'green') {
          setBR(BRgreen)
        } else if (value === 'yellow'){
          setBR(BRyellow)
        } else if (value === 'red') {
          setBR(BRred)
        } else {
          setBR(BRwhite)
        }
      } else if (key === "FLD"){
        if (value === 'green') {
          setFLD(FLDgreen)
        } else if (value === 'yellow'){
          setFLD(FLDyellow)
        } else if (value === 'red') {
          setFLD(FLDred)
        } else {
          setFLD(FLDwhite)
        }
      } else if (key === "FL"){
        if (value === 'green') {
          setFL(FLgreen)
        } else if (value === 'yellow'){
          setFL(FLyellow)
        } else if (value === 'red') {
          setFL(FLred)
        } else {
          setFL(FLwhite)
        }
      } else if (key === "FRD"){
        if (value === 'green') {
          setFRD(FRDgreen)
        } else if (value === 'yellow'){
          setFRD(FRDyellow)
        } else if (value === 'red') {
          setFRD(FRDred)
        } else {
          setFRD(FRDwhite)
        }
      } else if (key === "FR"){
        if (value === 'green') {
          setFR(FRgreen)
        } else if (value === 'yellow'){
          setFR(FRyellow)
        } else if (value === 'red') {
          setFR(FRred)
        } else {
          setFR(FRwhite)
        }
      } else if (key === "BRD"){
        if (value === 'green') {
          setBRD(BRDgreen)
        } else if (value === 'yellow'){        
          setBRD(BRDyellow)
        } else if (value === 'red') {
          setBRD(BRDred)
        } else {
          setBRD(BRDwhite)
        }
      } else if (key === "FB"){
        if (value === 'green') {
          setFB(FBgreen)
        } else if (value === 'yellow'){        
          setFB(FByellow)
        } else if (value === 'red') {
          setFB(FBred)
        } else {
          setFB(FBwhite)
        }
      } else if (key === "RB"){
        if (value === 'green') {
          setRB(RBgreen)
        } else if (value === 'yellow'){        
          setRB(RByellow)
        } else if (value === 'red') {
          setRB(RBred)
        } else {
          setRB(RBwhite)
        }
      } else if (key === "M"){
        if (value === 'green') {
          setM(Mgreen)
        } else if (value === 'yellow'){        
          setM(Myellow)
        } else if (value === 'red') {
          setM(Mred)
        } else {
          setM(Mwhite)
        }
      }
    }

  }

  
  useEffect(()=>{
    colorize();
  }, [])

  return (
    <View style={styles.root}>
        <Image source={Body} style={styles.logo} resizeMode="contain" />
        <Image source={BLD} style={[styles.bld, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={BRD} style={[styles.brd, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={F} style={[styles.f, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={R} style={[styles.r, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={BL} style={[styles.bl, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={BR} style={[styles.br, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={FLD} style={[styles.fld, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={FL} style={[styles.fl, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={FRD} style={[styles.frd, {height: height * 0.3}]} resizeMode="contain" />
        <Image source={FR} style={[styles.fr, {height: height * 0.3}]} resizeMode="contain" /> 
        <Image source={FB} style={[styles.fb, {height: height * 0.3}]} resizeMode="contain" /> 
        <Image source={RB} style={[styles.rb, {height: height * 0.3}]} resizeMode="contain" /> 
        <Image source={M} style={[styles.m, {height: height * 0.3}]} resizeMode="contain" /> 
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    backgroundColor: Theme.colors.primaryShadow
  },
  naming: {
    top: -250
  },
  logo: {
    position: 'relative',
    width: 120,
    top: -120
  },
  bld: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 170,
    left: 50  
  },
  brd: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 170,
    right: 50  
  },
  f: {
    position: 'absolute',
    width: 100,
    height: 'auto',
    top: -45,
  },
  r: {
    position: 'absolute',
    width: 100,
    height: 'auto',
    top: 285,  
  }, 
  bl: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 230,
    left: 50  
  }, 
  br: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 230,
    right: 50  
  }, 
  fld: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 105,
    left: 50  
  }, 
  fl: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 40,
    left: 50  
  },  
  frd: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 122,
    right: 50  
  }, 
  fr: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 40,
    right: 50  
  },
  fb: {
    position: 'absolute',
    width: 85,
    height: 'auto',
    top: 30, 
  },
  rb: {
    position: 'absolute',
    width: 80,
    height: 'auto',
    top: 225, 
  },
  m: {
    position: 'absolute',
    width: 60,
    height: 'auto',
    top: 135, 
  },
  link: {
    color: Theme.colors.primary
  }
})


export default CustomBlueprint