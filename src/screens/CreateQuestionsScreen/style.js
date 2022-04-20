import { Autocomplete } from '@ui-kitten/components';
import { StyleSheet, Dimensions } from 'react-native';
import { EasingNode } from 'react-native-reanimated';
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
    backBtn: {
        //borderRadius: 10,
        //height: width/10,
        //alignItems: "center",
        position: 'absolute',
        flex: 1,
        //justifyContent: "center",
        //marginTop: width/30,
    },
    pageTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    headerCard:{
        paddingTop: 35,
        height: 85,
    },
    select: {
        margin: 2,
        paddingBottom: 20,
    },
    label:{
        fontWeight: 'bold',
        padding: 10,
    },
    submitBtn: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#5E72E4',
    },
    answerLabel:{
        paddingBottom: 10,
        paddingTop: 10,
        fontWeight: 'bold',
    },
    answerTitle:{
        paddingTop: 20,
    },
    plusIcon:{
        flex: 1,
        alignSelf: 'flex-end',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: width/30,
        alignSelf: 'center',
        // animation: "fade"
    },
    submitMsg: {
        color: '#00e600',
        fontSize: width/30,
        alignSelf: 'center',
    }
})