import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    //Top header tab
    mainView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    backBtn: {
        position: 'absolute',
        flex: 1,
    },
    pageTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    headerCard:{
        paddingTop: 35,
        height: 85,
    },

    //Question display
    question: {
        alignSelf: "center",
        fontSize: 20,
        // fontFamily: "PublicSans_500Medium",
    },

    //Answers
    answerCard: {
        marginVertical: 10,
    }
})