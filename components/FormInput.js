import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { windowHeight, windowWidth } from '../utils/dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign'


const FormInput = ({labelValue,placeholderText,iconType,...rest}) => {
  return (
    <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
            <AntDesign name={iconType} size={20} color="#666" />
        </View>
        <TextInput
            value={labelValue}
            style={styles.input}
            numberoflines={1}
            placeholder={placeholderText}
            placeholderTextColor="#666"
            {...rest}
        />
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
        paddingVertical:0,
      },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:0,
      },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical:0,
      },
})