import { StyleSheet, Text, View } from 'react-native'
import React,{useCallback,useMemo,useRef}from 'react'
import BottomSheet from '@gorhom/bottom-sheet'

const BottomSheets = () => {
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(()=>['25','50%'],[])

    const handleSheetChanges = useCallback(index =>{
        console.log(index)
    },[])

  return (
    <View style={styles.container}>
        <BottomSheet
      ref = {bottomSheetRef}
      index ={1}
      snapPoints = {snapPoints}
      enableContentPanningGesture={true}
      enablePanDownToClose={true}
      onChange = {handleSheetChanges}
      >
        <View style={styles.contentContainer}>
            <Text>please work 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default BottomSheets

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:25,
        backgroundColor:"grey"
    },
    contentContainer:{
        flex:1,
        alignItems:"center"
    }
    
})