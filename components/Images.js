import { StyleSheet, Text, View } from 'react-native'

export  const styles = StyleSheet.create ({
    image: {
        width: 100,
        height: 100,
        resizeMode:'contain',
    }
})
export  const images = {
    pics : {
        '1': require('../assets/icons/Navicon.png'),
        '2': require('../assets/QR.png'),
        '3': require('../assets/ASTU.png'),
    },
    profile:{
        '1': require('../assets/ASTU.png')
    },
    icons:{
        '1': require('../assets/icons/Oval.png'),
        '2': require('../assets/icons/destination.png')
    },
}
export const iconevents = require('../assets/icons/event.png')
